import GridVideo from "../GridVideo";
import { RevealGroup, RevealItem } from "../Reveal";

export interface FeatureShowcaseItem {
  video: string;
  title: string;
  description: string;
  /** Which --color-card-* this item's colored panel uses. */
  accent: "sky" | "mint" | "salmon";
}

const ACCENT_BG: Record<FeatureShowcaseItem["accent"], string> = {
  sky: "bg-card-sky",
  mint: "bg-card-mint",
  salmon: "bg-card-salmon",
};

/**
 * "Product overview" — referenced from blinq.me's product-overview section:
 * two separate rounded panels side by side (not one card split in half) —
 * a colored panel with the video floating inset inside it, and a plain
 * white panel with eyebrow/heading/description. Alternates which side the
 * video sits on per item (odd index flips) so the row doesn't repeat
 * identically feature to feature.
 *
 * Deliberately not <GlassCard> here — GlassCard's frosted-glass/dot-grid
 * treatment is this site's "major section" surface; these two panels are
 * solid-color blocks sitting directly on the page background instead,
 * closer to WorkCard's colored image panel than to a glass card.
 *
 * Video: reuses GridVideo (autoplay/muted/loop, pauses off-screen via
 * IntersectionObserver) — this is exactly its existing use case (silent
 * looping demo, no controls needed), not a new video-handling convention.
 */
export default function FeatureShowcase({ items }: { items: FeatureShowcaseItem[] }) {
  return (
    <RevealGroup className="my-8 flex flex-col gap-6 md:gap-8" stagger={0.12}>
      {items.map((item, index) => {
        const reversed = index % 2 === 1;
        return (
          <RevealItem key={item.title}>
            <div className={`flex flex-col gap-6 md:gap-8 ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>
              {/* Colored panel — video floats inset with visible margin on
                  every side, not edge-to-edge, matching the reference's
                  "framed screenshot" look. */}
              <div className={`flex items-center justify-center rounded-2xl p-8 md:w-1/2 md:p-10 ${ACCENT_BG[item.accent]}`}>
                <div className="relative aspect-[1170/2532] w-full max-w-[240px] overflow-hidden rounded-2xl shadow-hover">
                  <GridVideo src={item.video} alt={item.title} className="h-full w-full object-cover" />
                </div>
              </div>

              {/* Text panel — no eyebrow (removed on request); heading
                  uses the site's text-h5/tracking-[-0.01em] pairing
                  (same as Footer's column headings — an <h3> tag styled
                  at h5 size, semantic level kept separate from visual
                  size), description in full-contrast text-fg. */}
              <div className="flex flex-col justify-center rounded-2xl bg-white p-8 md:w-1/2 md:p-12">
                <h3 className="mb-3 text-h5 tracking-[-0.01em] text-fg">{item.title}</h3>
                <p className="text-body-sm text-fg">{item.description}</p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
