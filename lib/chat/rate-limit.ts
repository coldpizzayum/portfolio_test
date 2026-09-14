/**
 * In-memory rate limiting for the chat API — a single `Map`, good enough
 * for a single Vercel instance at this traffic level (per the brief: swap
 * for Upstash Redis later if it ever needs to work across instances).
 * Keyed by sessionId (see lib/chat/session.ts), not IP — the session
 * token is already required on every request, so it's the natural key,
 * and doesn't misfire for visitors behind a shared/corporate IP.
 *
 * Two independent limits:
 * - REQUESTS_PER_WINDOW per ONE_MINUTE_MS — short-window abuse throttle.
 * - MAX_TURNS_PER_SESSION — a hard lifetime cap per session, so one
 *   session can't just wait out the per-minute window and keep going
 *   forever.
 */

const ONE_MINUTE_MS = 60_000;
const REQUESTS_PER_WINDOW = 5;
const MAX_TURNS_PER_SESSION = 20;

// Sessions idle longer than this are swept out on the next check —
// without this the Map only ever grows for the life of the server
// process. Sweeping is opportunistic (see maybeSweep below), not a timer,
// so it costs nothing on the common path.
const STALE_AFTER_MS = 60 * 60 * 1000; // 1 hour
const SWEEP_PROBABILITY = 1 / 50;

interface SessionUsage {
  /** Request timestamps within the current rate-limit window. */
  timestamps: number[];
  turnCount: number;
  lastSeen: number;
}

const usage = new Map<string, SessionUsage>();

function maybeSweep() {
  if (Math.random() > SWEEP_PROBABILITY) return;
  const now = Date.now();
  for (const [sessionId, entry] of usage) {
    if (now - entry.lastSeen > STALE_AFTER_MS) usage.delete(sessionId);
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: "rate_limited"; retryAfterSeconds: number }
  | { allowed: false; reason: "turn_limit" };

/** Call once per incoming request, before doing any real work. Does NOT
 *  record the request by itself — call `recordTurn` only after the
 *  request is actually accepted and about to be fulfilled, so a request
 *  that gets rejected for some other reason (e.g. bad input) doesn't
 *  still burn a turn. */
export function checkRateLimit(sessionId: string): RateLimitResult {
  maybeSweep();
  const now = Date.now();
  const entry = usage.get(sessionId);
  if (!entry) return { allowed: true };

  if (entry.turnCount >= MAX_TURNS_PER_SESSION) {
    return { allowed: false, reason: "turn_limit" };
  }

  const recentTimestamps = entry.timestamps.filter((t) => now - t < ONE_MINUTE_MS);
  if (recentTimestamps.length >= REQUESTS_PER_WINDOW) {
    const oldestInWindow = Math.min(...recentTimestamps);
    const retryAfterSeconds = Math.ceil((ONE_MINUTE_MS - (now - oldestInWindow)) / 1000);
    return { allowed: false, reason: "rate_limited", retryAfterSeconds };
  }

  return { allowed: true };
}

/** Records one accepted request/turn against the session. */
export function recordTurn(sessionId: string): void {
  const now = Date.now();
  const entry = usage.get(sessionId) ?? { timestamps: [], turnCount: 0, lastSeen: now };
  entry.timestamps = [...entry.timestamps.filter((t) => now - t < ONE_MINUTE_MS), now];
  entry.turnCount += 1;
  entry.lastSeen = now;
  usage.set(sessionId, entry);
}

export const RATE_LIMIT_CONFIG = { REQUESTS_PER_WINDOW, ONE_MINUTE_MS, MAX_TURNS_PER_SESSION };
