import { createHmac, randomUUID, timingSafeEqual } from "crypto";

/**
 * Stateless, signed session tokens for the chat widget — no server-side
 * session store, just an HMAC (CHAT_SESSION_SECRET) over
 * `sessionId.expiresAt`. /api/chat/session issues one, sets it as an
 * httpOnly cookie; /api/chat verifies it on every request and rejects
 * (401) anything missing or invalid. `sessionId` itself is also the key
 * used by lib/chat/rate-limit.ts's in-memory Map — that's the only
 * server-side "state" this feature keeps (request timestamps/turn counts,
 * not conversation content — see ChatWidget.tsx for why history lives
 * client-side instead).
 */

const SESSION_COOKIE_NAME = "chat_session";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getSecret(): string {
  const secret = process.env.CHAT_SESSION_SECRET;
  if (!secret) {
    // Fails loudly server-side only — this string never reaches a
    // response body or client console, just the server log/process crash.
    throw new Error("CHAT_SESSION_SECRET is not set");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export interface ChatSession {
  sessionId: string;
}

/** Issues a new signed token, valid for SESSION_TTL_MS from now. */
export function createSessionToken(): { token: string; sessionId: string; maxAgeSeconds: number } {
  const sessionId = randomUUID();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${sessionId}.${expiresAt}`;
  const token = `${payload}.${sign(payload)}`;
  return { token, sessionId, maxAgeSeconds: Math.floor(SESSION_TTL_MS / 1000) };
}

/** Verifies signature + expiry. Returns null for anything invalid/expired
 *  — callers treat null the same as "no session" (401), never surfacing
 *  which specific check failed. */
export function verifySessionToken(token: string | undefined | null): ChatSession | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [sessionId, expiresAtStr, signature] = parts;
  const payload = `${sessionId}.${expiresAtStr}`;
  const expected = sign(payload);

  // timingSafeEqual requires equal-length buffers — mismatched lengths
  // (e.g. a tampered/truncated token) would throw rather than just
  // returning false, so check that first.
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return { sessionId };
}

export const CHAT_SESSION_COOKIE = SESSION_COOKIE_NAME;
