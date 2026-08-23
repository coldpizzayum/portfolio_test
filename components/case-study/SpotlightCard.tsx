"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "../Button";
import { renderInline } from "../renderInline";

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

// Referenced seanhalpin.xyz/work/ai's pixel-art "?" icon — fill="currentColor"
// here (was a hardcoded #02594D on his site) so it takes this site's own
// text-fg color instead of his.
function QuestionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 5H5V8H8V5ZM8 28H5V31H8V28ZM15.4551 24.0908H20.546V29.1817H15.4551V24.0908ZM31 28H28V31H31V28ZM28 5H31V8H28V5ZM18.0014 17.9995H15.456V21.8176H20.5469V17.9995H25.6378V16.7267V11.6358H21.8196V9.09038H12.9105V11.6358H9.09233V16.7267H12.9105V11.6358H20.5469V16.7267H18.0014V17.9995Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface SpotlightImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Referenced seanhalpin.xyz/work/ai's "more" card (click a label row →
 * opens a large framed panel with a heading, body, and content, closed via
 * an X in the corner) — that's a lightbox, not an inline accordion, so it's
 * built on this site's own `createPortal` lightbox pattern (same as
 * HeroVideoCard/TestimonialCard: fixed inset-0 scrim, Esc/backdrop/close-
 * button dismiss, body-scroll lock) rather than reusing ToggleBlock.
 *
 * Deliberately kept separate from ToggleBlock — this is the one place on
 * case study pages that wants a visibly bigger, more prominent reveal than
 * the standard inline accordion every other toggle uses. No icon on the
 * collapsed row, unlike ToggleBlock's info icon — an explicit choice for
 * this instance, not an oversight.
 */
export default function SpotlightCard({
  summary,
  heading,
  text,
  images,
}: {
  summary: string;
  heading: string;
  text: string;
  images: SpotlightImage[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="my-8 flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 text-left"
      >
        <span className="text-body-sm text-fg">{summary}. Tap to read</span>
        {/* hover-shine needs overflow-hidden on this same element — the
            sweep bar is a ::after positioned/sized relative to it. */}
        <span className="hover-shine flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-fg text-fg">
          <QuestionIcon />
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-fg/80 p-6 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-bg p-8 shadow-hover md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                as="button"
                variant="secondary"
                square
                ariaLabel="Close"
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 bg-bg"
              >
                <CloseIcon />
              </Button>
              <h3 className="mb-heading-gap-h3 max-w-[calc(100%-56px)] text-h3 tracking-[-0.02em] text-fg">
                {heading}
              </h3>
              <p className="mb-8 text-body-sm text-fg">{renderInline(text)}</p>
              <div className="flex flex-col gap-6">
                {images.map((image) => (
                  <div key={image.src} className="overflow-hidden rounded-xl bg-bg-alt">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 620px, 100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
