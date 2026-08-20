import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  /** "default" is the --spacing-card-glass (28px/56px) padding used everywhere except Hero,
   *  which needs its bottom edge padding-free so its fade-out overlay can
   *  bleed flush to the card's own bottom edge. */
  padding?: "default" | "no-bottom";
  /** Escape hatch for the rare one-off addition. tailwind-merge resolves
   *  conflicts deterministically, so a conflicting padding utility here
   *  would reliably win over the `padding` prop's own class — but treat
   *  that as a stopgap for a genuinely new one-off case, not a routine way
   *  to tweak padding. If the same override shows up at a second call
   *  site, promote it to a real `padding` enum value instead of leaving it
   *  scattered across className props. */
  className?: string;
}

const PADDING_CLASSES: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  default: "p-card-glass md:p-card-glass-lg",
  // Top padding stays a literal 36px/56px here — Hero's own variant, and the
  // mobile value (36px) deliberately doesn't match --spacing-card-glass's
  // 28px, so it can't be tokenized the same way as the horizontal padding.
  "no-bottom": "px-card-glass pt-9 md:px-card-glass-lg md:pt-14",
};

/**
 * The site's recurring "glass card" surface — dot-grid texture, soft
 * gradient, hairline ring + ambient shadow, backdrop blur. Used for Hero,
 * Footer, JourneyTimeline, OutsideWork, AiProjectsSection, and the About
 * page's intro block. Doesn't handle scroll-reveal animation itself —
 * compose with `<Reveal>` around it where that's needed (see
 * JourneyTimeline), so styling and animation stay separate concerns.
 */
export default function GlassCard({ children, padding = "default", className = "" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 shadow-card backdrop-blur-[12px] md:rounded-[20px]",
        PADDING_CLASSES[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
