import { NextResponse } from "next/server";
import { createSessionToken, CHAT_SESSION_COOKIE } from "@/lib/chat/session";

// Node runtime, not edge — createSessionToken uses the `crypto` module's
// HMAC/randomUUID/timingSafeEqual, which the edge runtime doesn't support.
export const runtime = "nodejs";

/**
 * Issues a short-lived, signed session token (see lib/chat/session.ts) as
 * an httpOnly cookie, the first time the chat widget opens. Every
 * /api/chat request after this must carry that cookie — no token, no
 * reply (401).
 */
export async function POST() {
  const { token, maxAgeSeconds } = createSessionToken();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(CHAT_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
  return res;
}
