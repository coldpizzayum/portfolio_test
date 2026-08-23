import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/data/caseStudies";
import { renderInline } from "./renderInline";
import Button from "./Button";
import TagChip from "./TagChip";

/**
 * Image-first case study card for the /case-study grid — deliberately
 * different treatment per breakpoint, not one shared markup tree:
 *
 * - md+: tags/title/description cluster over the upper portion of the
 *   product screenshot, on a dark scrim, whole card is one link. Matches
 *   benshih.design's card treatment; scrim color is the same `--color-fg`
 *   base other dark overlays on this site already use (HeroVideoCard's
 *   lightbox backdrop, TestimonialCard's modal backdrop are both
 *   `bg-fg/80`), not invented. Tags here are NOT `<TagChip>` — TagChip's
 *   text-fg would be illegible on this dark scrim, so this is
 *   light-on-dark instead of dark-on-light, same shape/border/weight
 *   otherwise.
 * - mobile: that overlay reads low-contrast at card width, so it's
 *   WorkCard's stacked layout instead (on request, "mobile should match
 *   #work-web3-wallet-defi-dashboard") — image on top, then a separate
 *   white content card below (same `p-card-work`/`gap-3`/TagChip/Button
 *   shape as WorkCard's contentPanel), and only the "Read case study"
 *   button is a link — the image itself isn't clickable, matching
 *   WorkCard's "only the button responds" behavior. This means two
 *   `<Image>` instances (one per breakpoint, not one shared/repositioned
 *   element) since the mobile image sits in its own box instead of behind
 *   an absolute-positioned overlay; the hidden one doesn't fetch since
 *   native lazy-loading never triggers for a `display:none` element.
 */
export default function WorkImageCard({ item }: { item: WorkItem }) {
  const href = item.caseStudySlug ? `/case-study/${item.caseStudySlug}` : undefined;
  const title = item.title.replace(/\*\*/g, "");

  return (
    <div>
      {/* Mobile */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-alt">
          <Image src={item.image} alt={title} fill sizes="100vw" className="object-cover" />
        </div>
        {/* p-0, not p-card-work — that token is WorkCard's own padding
            (32px), matched everywhere else this mobile layout borrows from
            WorkCard's shape; this specific card's content block is flush
            against its own edges instead, on request. */}
        <div className="flex flex-col gap-3 rounded-2xl bg-white p-0">
          <h3 className="text-h3 tracking-[-0.02em] text-fg">{renderInline(item.title)}</h3>
          <p className="text-body-sm text-fg">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
          {href ? (
            <Button href={href}>Read case study</Button>
          ) : (
            <Button as="span">Read case study</Button>
          )}
        </div>
      </div>

      {/* md+ */}
      <div className="group relative hidden aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-alt md:block">
        <Image
          src={item.image}
          alt={title}
          fill
          sizes="50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-fg via-fg/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-bg/40 px-3.5 py-1.5 text-xs font-medium text-bg">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-h3 tracking-[-0.02em] text-bg">{renderInline(item.title)}</h3>
          <p className="mt-1 text-body-sm text-bg">{item.description}</p>
        </div>
        {href && <Link href={href} aria-label={title} className="absolute inset-0" />}
      </div>
    </div>
  );
}
