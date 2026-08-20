"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { QuoteTestimonial, Testimonial } from "@/data/testimonials";
import { renderInline } from "./renderInline";
import Button from "./Button";

interface TestimonialCardProps {
  testimonial: Testimonial;
  /** Absolute scatter placement (desktop) — `{ top, left }` from
   *  `testimonial.position`. Omitted for the mobile stack, which renders
   *  upright and in normal flex-column flow instead. */
  position?: CSSProperties;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

/** The two quote-card variants: "avatar" (quote-mark + avatar circle +
 *  two-line role/company) and "star" (star rating + single-line
 *  "role @company", no avatar) — see `QuoteTestimonial` in `data/testimonials.ts`.
 *  Exported so other components can render a real `Testimonial` entry inline
 *  without hand-rolling their own copy of this markup — see FeedbackStack's
 *  `testimonialId`-linked cards, which reuse this directly. Sibling to
 *  `PressCardContent` in `FeedbackStack.tsx` — the two are the same card
 *  family's named variants, one for testimonial quotes, one for press
 *  mentions. */
export function QuoteCardContent({ testimonial, sizeClass }: { testimonial: QuoteTestimonial; sizeClass: string }) {
  return (
    <>
      {testimonial.variant === "star" ? (
        // #f5a623 is a one-off, not a token — it's rating semantics, not
        // paired with any card color family. Only worth promoting to a
        // token if this pattern ever repeats elsewhere.
        <p className="mb-2 text-[18px] tracking-wider text-[#f5a623]" aria-hidden="true">
          {"★".repeat(testimonial.rating)}
        </p>
      ) : (
        <span aria-hidden="true" className="mb-1.5 block text-[28px] leading-[0.8] text-fg">
          &ldquo;
        </span>
      )}
      <p className={`mb-4 text-fg ${sizeClass}`}>{renderInline(testimonial.quote)}</p>
      {testimonial.variant === "star" ? (
        // text-fg here matches FeedbackStack's PressCardContent date line —
        // both are this card family's "secondary meta text," kept the same
        // color on purpose.
        <p className="text-xs text-fg">
          {testimonial.role} @{testimonial.company}
        </p>
      ) : (
        <div className="flex items-center gap-2.5">
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-border">
            {testimonial.avatar && (
              <Image src={testimonial.avatar} alt={testimonial.role} fill sizes="32px" className="object-cover" />
            )}
          </span>
          <div>
            <p className="text-[13px] font-semibold text-fg">{testimonial.role}</p>
            <p className="text-xs text-fg">{testimonial.company}</p>
          </div>
        </div>
      )}
    </>
  );
}

// Extra tilt added on hover, on top of the card's own resting `rotation` —
// exaggerates whichever way it's already leaning (same sign as the base
// rotation) rather than fighting it, so hover reads as "leans in further,"
// not a jarring flip to the opposite angle.
const HOVER_ROTATE_BOOST = 6;

// This card family's own hand-tuned shadow — a tighter close layer + a
// softer ambient one, combined into one shadow-[...] value (same
// comma-separated-layers pattern as the shared --shadow-card token), not
// one of the shared shadow tokens (see design-system skill's shadow-token
// known exceptions).
const QUOTE_CARD_SHADOW = "shadow-[0_4px_16px_rgba(0,0,0,0.1),0_2px_12px_rgba(0,0,0,0.07)]";

export default function TestimonialCard({ testimonial, position }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Rotation is only meant for the desktop scatter; the mobile stack (a
  // curated subset, stacked top-to-bottom) renders upright. Hover adds a
  // little extra tilt for every card (photo included) — see
  // HOVER_ROTATE_BOOST above.
  const hoverBoost = testimonial.rotation >= 0 ? HOVER_ROTATE_BOOST : -HOVER_ROTATE_BOOST;
  const rotationDeg = isHovered ? testimonial.rotation + hoverBoost : testimonial.rotation;
  const style: CSSProperties = {
    ...position,
    "--rotate": position ? `${rotationDeg}deg` : "0deg",
  } as CSSProperties;

  const wrapperClassName = position
    ? "collage-piece-rotate absolute"
    : "collage-piece-rotate relative shrink-0";

  // Escape closes the lightbox whenever it's open — harmless no-op for the
  // photo card, which never opens one (isModalOpen never flips true there).
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

  if (testimonial.type === "photo") {
    // Plain, non-interactive card: square crop, no click-to-enlarge, stays
    // in the deck's bottom-most layer at all times (see `zIndex: 0` in the
    // data) — unlike the quote cards, hover does NOT bring it to front here,
    // it only adds the extra tilt (`rotationDeg` above); it's Yiting's own
    // photo, not a testimonial competing to be read on top.
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${wrapperClassName} h-[260px] w-[260px] overflow-hidden rounded-2xl hover:scale-[1.03]`}
        style={{ ...style, zIndex: testimonial.zIndex }}
      >
        <Image src={testimonial.src} alt={testimonial.alt} fill sizes="260px" className="object-cover" />
      </div>
    );
  }

  // Every other card DOES jump to front on hover (unlike the photo card above).
  const zIndex = isHovered ? 100 : testimonial.zIndex;

  // Click a quote card to enlarge it — the fan row overlaps/rotates cards
  // enough that some quote text is genuinely hard to read at rest. Mirrors
  // HeroVideoCard's lightbox: portal to <body> (escapes the fan row's own
  // stacking context, same reasoning as that component), dark scrim,
  // Escape/backdrop-click/close-button to dismiss, body scroll locked while open.
  const modal =
    isModalOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-fg/80 p-6 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      >
        <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
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
          <div
            className="rounded-2xl border-2 bg-white p-8 text-left shadow-hover"
            style={{ borderColor: testimonial.borderColor }}
          >
            <QuoteCardContent testimonial={testimonial} sizeClass="text-body-sm" />
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <button
        type="button"
        aria-label={`Expand testimonial — ${testimonial.role} @${testimonial.company}`}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // cursor-zoom-in (magnifying glass) instead of cursor-pointer —
        // signals "click to enlarge" specifically, matching the lightbox
        // this button opens. The photo card above keeps the default cursor;
        // it isn't clickable.
        // p-7 pb-6 is this card family's own hand-tuned padding, deliberately
        // not on the shared card-padding tokens (--spacing-card-work etc.)
        // used by WorkCard/MoreCaseStudies.
        className={`${wrapperClassName} w-[280px] cursor-zoom-in rounded-2xl border-2 bg-white p-7 pb-6 text-left ${QUOTE_CARD_SHADOW} transition-transform duration-300 hover:scale-[1.03]`}
        style={{ ...style, zIndex, borderColor: testimonial.borderColor }}
      >
        <QuoteCardContent testimonial={testimonial} sizeClass="text-caption" />
      </button>
      {modal}
    </>
  );
}
