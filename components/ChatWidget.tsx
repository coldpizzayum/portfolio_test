"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v7a2.5 2.5 0 0 1-2.5 2.5H9.06l-3.8 3.24a.75.75 0 0 1-1.24-.57V14h-.02A2.5 2.5 0 0 1 2 11.5v-7Z" />
    </svg>
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

  async function handleSend() {
    if (!canSend) return;
    if (turnCount >= MAX_TURNS) {
      setTurnLimitReached(true);
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmedInput }];
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
      <Button
        as="button"
        variant="secondary"
        square
        ariaLabel={isOpen ? "Close chat" : "Chat about Yiting"}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed right-4 bottom-24 z-40 shadow-hover md:right-8 md:bottom-8"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Button>

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
            className="bg-dot-grid fixed right-4 bottom-40 z-40 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 shadow-card backdrop-blur-[12px] md:right-8 md:bottom-24 md:w-[400px]"
          >
            <div className="relative z-[1] flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-body-sm font-semibold text-fg">Ask about Yiting</p>
              <Button as="button" variant="secondary" square ariaLabel="Close chat" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </Button>
            </div>

            <div ref={scrollRef} className="relative z-[1] flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <p className="text-body-sm text-fg-secondary">
                  Hi! Ask me anything about Yiting&apos;s background, case studies, or how to get in touch.
                </p>
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
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void handleSend();
                        }
                      }}
                      placeholder={sessionReady ? "Type a message…" : "Starting chat…"}
                      rows={1}
                      disabled={!sessionReady || isStreaming}
                      className="max-h-24 flex-1 resize-none rounded-lg border border-border bg-white px-3 py-2 text-body-sm text-fg outline-none focus:border-fg disabled:opacity-60"
                    />
                    <Button
                      as="button"
                      variant="primary"
                      square
                      ariaLabel="Send message"
                      // Button has no native `disabled` prop — gate the
                      // action itself here rather than via a real
                      // disabled attribute (see className below for the
                      // matching visual state, using the sanctioned
                      // layout/position className escape hatch, not a
                      // new color).
                      onClick={() => void handleSend()}
                      className={canSend ? "" : "pointer-events-none opacity-50"}
                    >
                      <SendIcon />
                    </Button>
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
