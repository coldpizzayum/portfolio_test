"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { FeedbackCard } from "@/data/caseStudies";
import { testimonials } from "@/data/testimonials";
import { renderInline } from "../renderInline";
import { QuoteCardContent } from "../TestimonialCard";

/** Per-card rotation angles — same "natural fan" idea as Hero's FAN_CARDS,
 *  just a fixed set since these cards don't carry their own rotation value.
 *  The hover push/fade choreography in globals.css (.feedback-card-deck) is
 *  hand-written per nth-child pair for exactly 4 cards, mirroring Hero's
 *  fan-card-deck — it won't extend itself if a 5th card is added later. */
const ROTATIONS = [-4, 3, -3, 4];

function FeedbackCardContent({ card }: { card: FeedbackCard }) {
  const isTestimonial = card.rating !== undefined || card.testimonialId !== undefined;
  const linked = card.testimonialId ? testimonials.find((t) => t.id === card.testimonialId) : undefined;
  // Only a "quote" testimonial has the shape QuoteCardContent expects — if
  // testimonialId ever pointed at a "photo" entry, this silently falls back
  // to PressCardContent below instead of erroring, rendering the wrong card
  // shape with no warning. Keep testimonialId pointed at quote entries only.
  const linkedTestimonial = linked?.type === "quote" ? linked : undefined;

  return (
    <>
      {card.photo && (
        <div className="absolute -top-3 -right-3 h-12 w-12 overflow-hidden rounded-full ring-4 ring-white shadow-md">
          <Image src={card.photo} alt={card.photoAlt ?? ""} fill className="object-cover" />
        </div>
      )}
      <span
        className={`mb-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-caption font-medium text-fg ${
          isTestimonial ? "bg-card-sky" : "bg-card-sand"
        }`}
      >
        {isTestimonial ? "Customer Review" : "Investment"}
      </span>
      {linkedTestimonial ? (
        // Reuses TestimonialsSection's exact card content (stars/quote-mark +
        // quote + attribution line) instead of hand-rolling a near-duplicate
        // — this card's quote *is* the "vincent" testimonial, not a copy of it.
        // flex-1 pushes the attribution toward the bottom, same as the other
        // cards' `mt-auto` (QuoteCardContent doesn't use that pattern itself).
        // No line-clamp — see PressCardContent's note on the same subject.
        <QuoteCardContent testimonial={linkedTestimonial} sizeClass="flex-1 text-caption" />
      ) : (
        <PressCardContent card={card} />
      )}
    </>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 14 14 6M8 6h6v6" />
    </svg>
  );
}

/** External-link icon with a hover tooltip that's portaled to `document.body`
 *  (position: fixed, coordinates from `getBoundingClientRect()` on hover) —
 *  this card sits inside `overflow-hidden` ancestors (needed for the card's
 *  rounded corners / photo positioning), so a normal `absolute` tooltip
 *  risked being clipped. Portaling escapes that entirely, same reasoning as
 *  HeroVideoCard's lightbox. Style follows the reference screenshot: dark
 *  rounded-full pill, bold white label, thin brand-accent gradient glow
 *  along the bottom edge (`--color-cta` → `--color-cta-hover`, not an
 *  invented color). `aria-hidden` on the tooltip — the link's own
 *  `aria-label` already gives it an accessible name, so this is purely a
 *  sighted-user affordance, not something a screen reader should announce twice. */
function PressLinkArrow({ href, ariaLabel }: { href: string; ariaLabel: string }) {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
        }}
        onMouseLeave={() => setCoords(null)}
        className="text-fg transition-opacity duration-300 hover:opacity-60"
      >
        <ExternalLinkIcon />
      </a>
      {coords &&
        createPortal(
          <div
            aria-hidden="true"
            className="pointer-events-none fixed z-[300] -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-full bg-fg px-4 py-2 text-caption font-semibold whitespace-nowrap text-bg shadow-hover"
            style={{ top: coords.top, left: coords.left }}
          >
            Read press news
            <span className="absolute bottom-0 left-1/2 h-[3px] w-2/3 -translate-x-1/2 translate-y-full rounded-full bg-gradient-to-r from-cta/0 via-cta to-cta-hover" />
          </div>,
          document.body
        )}
    </>
  );
}

/** The "Investment" (press-mention) card content — headline
 *  (`==highlight==` keyword) + date + external link only. Exported
 *  alongside `QuoteCardContent` (in `TestimonialCard.tsx`) as this card
 *  family's other named variant, instead of staying anonymous inline JSX
 *  inside `FeedbackCardContent`.
 *  `eyebrow` and `quote` exist on `FeedbackCard` but aren't read here —
 *  some entries still carry them for a possible future variant. */
export function PressCardContent({ card }: { card: FeedbackCard }) {
  return (
    <>
      {card.headline && (
        <p className={`mb-2 text-body-sm font-bold text-fg ${card.photo ? "pr-9" : ""}`}>
          {renderInline(card.headline)}
        </p>
      )}
      <div className="mt-auto pt-3">
        <div className="flex items-center justify-between">
          {/* text-fg — matches TestimonialCard's star-variant role/company
              line, both this card family's "secondary meta text," kept the
              same color on purpose. */}
          <p className="text-caption text-fg">Date: {card.date}</p>
          {card.href && (
            <PressLinkArrow href={card.href} ariaLabel={`Read press news: ${card.headline ?? card.eyebrow ?? ""}`} />
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Feedback & Impact cards, fanned out the same way as Hero's card deck
 * (relative flex row, negative-margin overlap, per-card --rotate, hover
 * pushes the rest apart and brings the hovered card to front) — see
 * `#hero`'s `.fan-card-deck` for the reference implementation this mirrors.
 * Hover has no touch equivalent, so md and up only; mobile falls back to a
 * plain stacked list.
 */
export default function FeedbackStack({ cards }: { cards: FeedbackCard[] }) {
  if (cards.length === 0) return null;

  return (
    <div className="my-8">
      {/* Card paddings here (p-8 mobile list below / p-6 desktop deck
          further down) are this card family's own hand-tuned values,
          deliberately not on the shared card-padding tokens. */}
      {/* Mobile: flat list, no rotation/overlap — nothing here depends on hover. */}
      <div className="flex flex-col gap-5 md:hidden">
        {cards.map((card, index) => (
          <div key={index} className="relative flex flex-col rounded-2xl border-2 border-fg bg-white p-8 shadow-hover">
            <FeedbackCardContent card={card} />
          </div>
        ))}
      </div>

      {/* Desktop: the fanned deck. Breaks out of the narrow article column
          (mirrors the old horizontal-scroll version's full-bleed trick) so
          the wider gaps between cards have room without cramming. */}
      <div className="feedback-card-deck relative mr-[calc(-50vw+50%)] hidden h-[288px] w-full items-center md:flex">
        {cards.map((card, index) => (
          <div
            key={index}
            className="feedback-card-item relative flex h-[248px] w-[280px] flex-shrink-0 items-center justify-center -mr-2 last:mr-0 hover:z-10"
            style={{ zIndex: index + 1 }}
          >
            <div
              className="feedback-card-rotate relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-fg bg-white p-6 shadow-hover"
              style={{ "--rotate": `${ROTATIONS[index % ROTATIONS.length]}deg` } as CSSProperties}
            >
              <FeedbackCardContent card={card} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
