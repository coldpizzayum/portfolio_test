"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";

// Keep these two in sync by hand with their server-side counterparts —
// deliberately not a shared import, since lib/chat/rate-limit.ts holds a
// live in-memory Map that has no business existing in a client bundle,
// and the server is the actual source of truth for both limits regardless
// of what these say (see app/api/chat/route.ts / lib/chat/rate-limit.ts).
// These only drive the frontend's own hints/early cutoffs.
const MAX_INPUT_LENGTH = 500; // matches route.ts's MAX_USER_MESSAGE_LENGTH
const MAX_TURNS = 20; // matches rate-limit.ts's MAX_TURNS_PER_SESSION

const CONTACT_EMAIL = "yitinghuang.design@gmail.com"; // same address Footer.tsx uses
const STREAM_ERROR_MARKER = " CHAT_ERROR "; // must match app/api/chat/route.ts
const EASE = [0.22, 1, 0.36, 1] as const; // same easing Reveal.tsx uses sitewide

// Entry point hidden on request while the widget's redesign is in
// progress (elsewhere, not yet merged here) — this is the only way to
// open the widget, so hiding it takes the whole feature off the live site
// without pulling the component itself. Flip back to true to bring it
// back, same one-line-revert convention as Hero's HERO_TAGS_VISIBLE.
const CHAT_ENTRY_VISIBLE = false;

// Empty-state quick-start prompts (on request, referenced from
// benshih.design's chat widget) — shown once, before the first message.
const SUGGESTED_PROMPTS = [
  "What kind of roles are you open to?",
  "I'd love to hire you",
  "Which case study should I start with?",
  "How did you build this portfolio?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Same avatar image as the browser tab favicon (app/icon.png) — and same
// rounded-full/object-cover/object-top treatment Header.tsx already uses
// for this exact image, not a new avatar-shape convention.
function AvatarIcon() {
  return (
    <span className="relative block h-full w-full overflow-hidden rounded-full">
      <Image src="/images/yiting_pixelart.png" alt="" fill sizes="40px" className="object-cover object-top" />
    </span>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M17.65 2.35a.75.75 0 0 0-.78-.18L2.37 7.2a.75.75 0 0 0-.02 1.4l6.02 2.36 2.36 6.02a.75.75 0 0 0 1.4-.02l5.03-14.5a.75.75 0 0 0-.51-.61Z" />
    </svg>
  );
}

/** Three dots, staggered opacity pulse — the only "loading" affordance in
 *  the chat panel, built from existing tokens (bg-fg-secondary), not a
 *  new color. */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-fg-secondary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnLimitReached, setTurnLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const turnCount = messages.filter((m) => m.role === "user").length;

  // Establishes the httpOnly session cookie (see app/api/chat/session/route.ts)
  // the first time the widget opens — not on page load, no point spending
  // that round trip on visitors who never open it.
  useEffect(() => {
    if (!isOpen || sessionReady || sessionError) return;
    let cancelled = false;
    fetch("/api/chat/session", { method: "POST" })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) setSessionReady(true);
        else setSessionError(true);
      })
      .catch(() => {
        if (!cancelled) setSessionError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, sessionReady, sessionError]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  const trimmedInput = input.trim();
  const canSend = sessionReady && !isStreaming && !turnLimitReached && trimmedInput.length > 0 && input.length <= MAX_INPUT_LENGTH;

  /** `overrideText` lets the suggested-prompt buttons send directly
   *  without round-tripping through the input field's own state. */
  async function handleSend(overrideText?: string) {
    const text = overrideText ?? trimmedInput;
    if (!overrideText && !canSend) return;
    if (overrideText && (!sessionReady || isStreaming || turnLimitReached)) return;
    if (turnCount >= MAX_TURNS) {
      setTurnLimitReached(true);
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (res.status === 401) {
        // Session cookie expired mid-conversation — drop the pending
        // placeholder and let the visitor try again (re-opening/re-sending
        // will re-establish a session via the effect above).
        setSessionReady(false);
        setMessages((prev) => prev.slice(0, -1));
        setError("Your session expired — please try sending that again.");
        return;
      }

      if (res.status === 429) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setMessages((prev) => prev.slice(0, -1));
        if (data?.error === "turn_limit") setTurnLimitReached(true);
        else setError("Too many messages — please wait a moment and try again.");
        return;
      }

      if (!res.ok || !res.body) throw new Error("request_failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      let errorChecked = false;
      let isErrorStream = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });

        if (!errorChecked && full.length >= STREAM_ERROR_MARKER.length) {
          errorChecked = true;
          isErrorStream = full.startsWith(STREAM_ERROR_MARKER);
        }
        if (isErrorStream) continue; // keep draining silently, don't render the marker/partial text

        const streamedSoFar = full;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: streamedSoFar };
          return updated;
        });
      }

      if (isErrorStream) {
        setMessages((prev) => prev.slice(0, -1));
        setError(full.slice(STREAM_ERROR_MARKER.length) || "Something went wrong. Please try again.");
      }
    } catch {
      setMessages((prev) => prev.slice(0, -1));
      setError("Something went wrong. Please try again, or email Yiting directly.");
    } finally {
      setIsStreaming(false);
    }
  }

  const isLastAssistantEmpty =
    isStreaming && messages.length > 0 && messages[messages.length - 1].role === "assistant" && messages[messages.length - 1].content === "";

  return (
    <>
      {/* Disappears once the panel is open, rather than swapping to a
       *  close icon (on request, referenced from benshih.design) — the
       *  panel has its own close button in its header. */}
      {CHAT_ENTRY_VISIBLE && !isOpen && (
        // Custom circular button, not <Button>'s locked rounded-lg/40px
        // square shape (same reasoning as the panel's close/send buttons
        // below) — 56px, rounded-full, shadow-float (this site's
        // "floating fixed UI chrome" token, not shadow-hover's card-lift
        // one), plus a faint border-border outline.
        <button
          type="button"
          aria-label="Chat about Yiting"
          onClick={() => setIsOpen(true)}
          className="fixed right-4 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-fg shadow-float md:right-8 md:bottom-8"
        >
          <AvatarIcon />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
            role="dialog"
            aria-label="Chat about Yiting"
            // Not <GlassCard> here — GlassCard's locked shape is
            // mx-auto/max-w-[1200px] with 28-56px padding, built for
            // full-width page sections; forcing that onto a ~380px fixed
            // widget would leave almost no room for the actual chat UI.
            // Same visual surface (bg-dot-grid texture, gradient,
            // shadow-card, backdrop-blur, rounded-2xl) recomposed at a
            // padding scale that fits a compact panel instead — no new
            // colors/shadows, just different existing spacing values.
            // Anchored at the same right/bottom offsets as the trigger
            // button above (bottom-24/md:bottom-8, not further up at
            // bottom-40/md:bottom-24) — now that the button disappears
            // while open, the panel can sit flush in that same corner
            // instead of leaving empty space below it for a button
            // that's no longer there.
            className="bg-dot-grid fixed right-4 bottom-24 z-40 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[560px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 shadow-card backdrop-blur-[12px] md:right-8 md:bottom-8 md:w-[560px]"
          >
            <div className="relative z-[1] flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-h4 tracking-[-0.01em] text-fg">Yiting AI</p>
                <p className="text-caption text-fg-secondary">Ask anything about Yiting</p>
              </div>
              {/* Round, not Button's locked rounded-lg square — on request,
                  referenced from the same benshih.design widget. Existing
                  neutral tokens (bg-bg-alt/text-fg-secondary, same pairing
                  as Button's "third" hover state), just a different shape
                  than the shared component offers. */}
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-alt text-fg-secondary transition-colors duration-200 hover:bg-border hover:text-fg"
              >
                <CloseIcon />
              </button>
            </div>

            <div ref={scrollRef} className="relative z-[1] flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-card-sand">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src="/images/yiting_pixelart.png"
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <p className="text-h4 tracking-[-0.01em] text-fg">What would you like to know about Yiting?</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void handleSend(prompt)}
                        disabled={!sessionReady || isStreaming}
                        className="rounded-full border border-border bg-bg-alt px-4 py-2.5 text-left text-body-sm text-fg transition-colors duration-200 hover:border-fg disabled:opacity-60"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && i === messages.length - 1 && isLastAssistantEmpty ? (
                    <div className="max-w-[85%] rounded-xl bg-white px-3.5 py-2.5 shadow-card">
                      <TypingIndicator />
                    </div>
                  ) : (
                    m.content && (
                      <div
                        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-body-sm whitespace-pre-line ${
                          m.role === "user" ? "bg-fg text-bg" : "bg-white text-fg shadow-card"
                        }`}
                      >
                        {m.content}
                      </div>
                    )
                  )}
                </div>
              ))}
              {sessionError && (
                <p className="text-body-sm text-fg-secondary">
                  ⚠️ Couldn&apos;t start the chat. Please refresh and try again, or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
              {error && <p className="text-body-sm text-fg-secondary">⚠️ {error}</p>}
            </div>

            <div className="relative z-[1] border-t border-border p-3">
              {turnLimitReached ? (
                <div className="flex flex-col items-start gap-2">
                  <p className="text-body-sm text-fg">
                    That&apos;s the end of this chat — for anything more, email Yiting directly.
                  </p>
                  <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                    Email Yiting
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-end gap-2">
                    {/* rounded-full pill, not Button/textarea's usual
                        rounded-lg — on request, matching the reference's
                        pill-shaped input row. */}
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void handleSend();
                        }
                      }}
                      placeholder={sessionReady ? "Ask anything about Yiting…" : "Starting chat…"}
                      rows={1}
                      disabled={!sessionReady || isStreaming}
                      className="max-h-24 flex-1 resize-none rounded-full border border-border bg-white px-4 py-2.5 text-body-sm text-fg outline-none focus:border-fg disabled:opacity-60"
                    />
                    {/* Round send button — --color-available (the site's
                        existing muted sage-green token) reused here for
                        its color, not the low-key-status-indicator role it
                        normally plays elsewhere; still no new color. */}
                    <button
                      type="button"
                      aria-label="Send message"
                      onClick={() => void handleSend()}
                      disabled={!canSend}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-available text-bg transition-opacity duration-200 disabled:opacity-50"
                    >
                      <SendIcon />
                    </button>
                  </div>
                  <p className="mt-1.5 text-caption text-fg-secondary">
                    {input.length}/{MAX_INPUT_LENGTH}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
