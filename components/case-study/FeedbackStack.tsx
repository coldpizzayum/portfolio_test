import Image from "next/image";
import type { CSSProperties } from "react";
import type { FeedbackCard } from "@/data/caseStudies";
import { renderInline } from "./CaseStudyBlock";

/** Per-card rotation angles — same "natural fan" idea as Hero's FAN_CARDS,
 *  just a fixed set since these cards don't carry their own rotation value.
 *  The hover push/fade choreography in globals.css (.feedback-card-deck) is
 *  hand-written per nth-child pair for exactly 4 cards, mirroring Hero's
 *  fan-card-deck — it won't extend itself if a 5th card is added later. */
const ROTATIONS = [-4, 3, -3, 4];

function FeedbackCardContent({ card }: { card: FeedbackCard }) {
  const isTestimonial = card.rating !== undefined;
  return (
    <>
      {card.photo && (
        <div className="absolute -top-4 -right-4 h-14 w-14 overflow-hidden rounded-full ring-4 ring-white shadow-md">
          <Image src={card.photo} alt={card.photoAlt ?? ""} fill className="object-cover" />
        </div>
      )}
      <span
        className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 font-serif text-[11px] font-semibold ${
          isTestimonial ? "bg-card-sand text-card-sand-text" : "bg-card-salmon text-card-salmon-text"
        }`}
      >
        {isTestimonial ? "Customer Review" : "Investment"}
      </span>
      {isTestimonial ? (
        <p className="mb-3 text-sm tracking-wider text-[#f5a623]" aria-hidden="true">
          {"★".repeat(card.rating ?? 0)}
        </p>
      ) : (
        card.eyebrow && (
          <p className={`mb-2 text-caption text-fg-secondary ${card.photo ? "pr-14" : ""}`}>{card.eyebrow}</p>
        )
      )}
      {card.headline && (
        <p className={`mb-3 font-source-sans-pro text-[20px] leading-[1.1] font-bold text-fg ${card.photo ? "pr-10" : ""}`}>
          {renderInline(card.headline)}
        </p>
      )}
      {/* Investment (press-mention) cards drop the quote in this design — only
          Customer Review cards show one. */}
      {card.quote && isTestimonial && <p className="mb-4 line-clamp-6 flex-1 text-caption text-fg">{renderInline(card.quote)}</p>}
      <div className="mt-auto pt-4">
        {isTestimonial ? (
          <>
            <p className="text-caption font-semibold text-fg">{card.name}</p>
            <p className="text-caption text-fg-secondary">{card.role}</p>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-caption text-fg-secondary">Date: {card.date}</p>
            {card.href && (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Read more: ${card.headline ?? card.eyebrow ?? ""}`}
                className="text-fg transition-opacity duration-300 hover:opacity-60"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 14 14 6M8 6h6v6" />
                </svg>
              </a>
            )}
          </div>
        )}
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
      {/* Mobile: flat list, no rotation/overlap — nothing here depends on hover. */}
      <div className="flex flex-col gap-5 md:hidden">
        {cards.map((card, index) => (
          <div key={index} className="relative flex flex-col rounded-2xl bg-white p-8 shadow-hover">
            <FeedbackCardContent card={card} />
          </div>
        ))}
      </div>

      {/* Desktop: the fanned deck. Breaks out of the narrow article column
          (mirrors the old horizontal-scroll version's full-bleed trick) so
          the wider gaps between cards have room without cramming. */}
      <div className="feedback-card-deck relative mr-[calc(-50vw+50%)] hidden h-[320px] w-full items-center md:flex">
        {cards.map((card, index) => (
          <div
            key={index}
            className="feedback-card-item relative flex h-[280px] w-[320px] flex-shrink-0 items-center justify-center -mr-2 last:mr-0 hover:z-10"
            style={{ zIndex: index + 1 }}
          >
            <div
              className="feedback-card-rotate relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-hover"
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
