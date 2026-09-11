import type { LucideIcon } from "lucide-react";
import { Paperclip } from "lucide-react";

export interface HeroTagCardProps {
  label: string;
  icon: LucideIcon;
  /** One of the existing --color-card-* tokens (see design-system skill) —
   *  the badge's own background, the only place color varies between the
   *  three cards; the card body itself is one shared neutral tone. */
  badgeBg: "bg-card-sand" | "bg-card-jade" | "bg-card-salmon";
  /** Degrees — applied via inline style since it's a continuous per-card
   *  value, same as Hero's own fan-card-rotate custom property elsewhere
   *  in this file. */
  rotate: number;
  /** Tailwind position classes (e.g. "top-4 left-8" or "top-[-12px]
   *  right-10") — literal per-instance placement, same pattern as
   *  SKETCH_NOTES/PREVIEW_TILES above. Coordinates are a first guess;
   *  nudge by eye once this renders. */
  position: string;
}

/**
 * A small rotated "sticky note" tag, floating over the Hero headline —
 * referenced from creatiie.framer.website's hero. Three layers: the note
 * itself (neutral bg-bg-alt, border, rounded corners, a folded top-right
 * corner via clip-path — no image), a circular icon badge overlapping its
 * top-left corner (color varies per card), and a tilted paperclip
 * (lucide-react, purely decorative) pinned beside the badge.
 *
 * Purely decorative: pointer-events-none, no text alternative needed
 * (aria-hidden) — the real headline text underneath already says
 * everything a screen reader needs.
 */
export default function HeroTagCard({ label, icon: Icon, badgeBg, rotate, position }: HeroTagCardProps) {
  return (
    <div
      aria-hidden="true"
      // Desktop-only — the headline is already tight on mobile widths,
      // and every other decorative flourish in Hero.tsx (fan-card-deck,
      // sketch notes) is also md+-only.
      className={`pointer-events-none absolute z-10 hidden md:block ${position}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Note body */}
      <div className="relative w-[104px] rounded-xl border border-border bg-bg-alt px-3 pt-5 pb-3 text-center shadow-float">
        {/* Folded corner — a plain triangle via clip-path, not an image.
         *  Sized off the card's own p-3/pt-5 scale (16px), not an
         *  arbitrary one-off number. */}
        <div className="absolute top-0 right-0 h-4 w-4 rounded-tr-xl bg-fg-secondary [clip-path:polygon(100%_0,0_0,100%_100%)]" />
        <p className="text-caption font-semibold text-fg">{label}</p>
      </div>

      {/* Icon badge, overlapping the note's top-left corner */}
      <span className={`absolute -top-4 -left-4 flex h-9 w-9 items-center justify-center rounded-full shadow-float ${badgeBg}`}>
        <Icon className="h-4 w-4 text-bg" strokeWidth={2} />
      </span>

      {/* Paperclip, tilted, pinned beside the badge */}
      <Paperclip className="absolute -top-5 left-3 h-5 w-5 rotate-45 text-fg-secondary" strokeWidth={1.75} />
    </div>
  );
}
