"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import Button from "./Button";

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M6.5 4.35v11.3a.9.9 0 0 0 1.36.78l9.4-5.65a.9.9 0 0 0 0-1.56l-9.4-5.65a.9.9 0 0 0-1.36.78Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

/**
 * The fan deck's video card. Modeled on benshih.design's hero video
 * (2026-08-18, went through six revisions — see design-system skill for
 * the full back-and-forth). Current (v7) behavior:
 *
 * - Resting: autoplay/muted/loop, clear, no overlay.
 * - Hover: pauses the video, blurs it (`blur-[4px]`), fades in a centered
 *   play button.
 * - Click the button: opens a lightbox — a *fresh* <video> (always starts
 *   at 0:00, no reset logic needed), dark scrim backdrop (`bg-fg/80`,
 *   matches the rest of the site's overlay color), native controls.
 *
 * The lightbox is rendered via `createPortal` into `document.body` —
 * without this, it inherits a stacking context from its ancestor fan-card
 * wrapper (`fan-card-item`, which sets `position: relative` + an inline
 * `zIndex` for the fan's overlap effect), so `position: fixed` alone
 * doesn't escape it: the lightbox would render *behind* sibling fan cards
 * that have a higher local z-index (e.g. "Recent work", first in the deck)
 * instead of covering the whole viewport like a real modal should. This
 * was a real bug, not a hypothetical — confirmed by screenshot, "Recent
 * work" rendering on top of and clickable through the open lightbox.
 */
export default function HeroVideoCard({ bg, rotation }: { bg: string; rotation: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.pause();
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    void videoRef.current?.play();
  };

  // Lightbox open: block page scroll behind it, let Escape close it —
  // standard modal expectations, not specific to this component.
  useEffect(() => {
    if (!isModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const showOverlay = isHovering && !isModalOpen;

  return (
    <>
      <div
        className={`fan-card-rotate relative h-[286px] w-[256px] overflow-hidden rounded-[20px] shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-hover xl:h-[360px] xl:w-[320px] xl:rounded-[24px] ${bg}`}
        style={{ "--rotate": `${rotation}deg` } as CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src="/videos/self-intro.mp4"
          poster="/images/self-intro-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Yiting Huang — self intro"
          className={`h-full w-full rounded-[20px] object-cover transition-[filter] duration-300 xl:rounded-[24px] ${
            showOverlay ? "blur-[4px]" : "blur-none"
          }`}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showOverlay ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Play video"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-bg text-fg shadow-float transition-transform duration-200 hover:scale-105"
          >
            <PlayIcon />
          </button>
        </div>
      </div>

      {/* No SSR-safety "mounted" gate needed: isModalOpen starts false and
       *  can only flip true from a client-side click, well after hydration
       *  — document.body is never referenced during server rendering. */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-fg/80 p-6 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <Button
                as="button"
                variant="secondary"
                square
                ariaLabel="Close video"
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-14 right-0"
              >
                <CloseIcon />
              </Button>
              {/* Fresh element, not the small card's — mounting it here
               *  means it always starts at 0:00 with no extra state to
               *  reset. */}
              <video
                src="/videos/self-intro.mp4"
                poster="/images/self-intro-poster.png"
                autoPlay
                controls
                playsInline
                aria-label="Yiting Huang — self intro"
                className="w-full rounded-2xl shadow-hover"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
