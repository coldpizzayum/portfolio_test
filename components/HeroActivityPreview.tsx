"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import ActivityHeatmap from "./ActivityHeatmap";
import Button from "./Button";

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

/**
 * Homepage teaser for the real `<ActivityHeatmap>` — a single flat
 * screenshot (`/images/Githubheatmap.png`, already rotated in the image
 * itself) instead of a hand-built mini mock of the grid/pills, on request.
 * Deliberately sized wider than its own column and pulled right/down with
 * negative margin on `md:` so it bleeds toward — and gets clipped by —
 * GlassCard's own `overflow-hidden` rounded edge, the "breaking the grid"
 * look from the reference. No extra CSS rotation on top of the image (it's
 * already tilted in the source file); hover is a scale bump instead of the
 * fan-card rotate-on-hover pattern, since rotating an already-rotated flat
 * image on top would fight the baked-in angle.
 *
 * Clicking it opens the real, fully interactive `<ActivityHeatmap>` in a
 * lightbox — same createPortal / dark-scrim / Esc-backdrop-close-button
 * pattern as HeroVideoCard's and TestimonialCard's lightboxes.
 */
export default function HeroActivityPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open the GitHub / Claude Code activity heatmap"
        className="relative block w-full cursor-zoom-in transition-transform duration-300 hover:scale-[1.03] md:w-[135%] md:-mr-[35%] md:-mb-10"
      >
        <Image
          src="/images/Githubheatmap.png"
          alt="GitHub and Claude Code contribution activity heatmap, tilted preview"
          width={1087}
          height={451}
          sizes="(min-width: 768px) 560px, 100vw"
          className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
        />
      </button>

      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-fg/80 p-6 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <Button
                as="button"
                variant="secondary"
                square
                ariaLabel="Close"
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-14 right-0"
              >
                <CloseIcon />
              </Button>
              <ActivityHeatmap background="solid" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
