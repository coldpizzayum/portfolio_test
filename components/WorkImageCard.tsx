import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/data/caseStudies";
import { renderInline } from "./renderInline";

/**
 * Image-first case study card for the /case-study grid — tags, title, and
 * description cluster together over the upper portion of the product
 * screenshot, instead of WorkCard's image/content-split layout. A
 * deliberately different card style (not WorkCard reused).
 *
 * Dark scrim + white text (on request, matches benshih.design's card
 * treatment) — same `--color-fg` base other dark overlays on this site
 * already use (HeroVideoCard's lightbox backdrop, TestimonialCard's modal
 * backdrop are both `bg-fg/80`), not an invented color.
 *
 * Tags here are NOT `<TagChip>` — TagChip's `text-fg` is hardcoded (its
 * locked spec, see TagChip.tsx), which would be illegible on this card's
 * dark scrim. This is a genuine exception, not a casual re-style: same
 * shape/border/weight as TagChip, just light-on-dark instead of
 * dark-on-light, because reusing TagChip here would make it unreadable.
 */
export default function WorkImageCard({ item }: { item: WorkItem }) {
  const href = item.caseStudySlug ? `/case-study/${item.caseStudySlug}` : undefined;

  const card = (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-alt">
      <Image
        src={item.image}
        alt={item.title.replace(/\*\*/g, "")}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
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
    </div>
  );

  if (!href) return card;

  return (
    <Link href={href} aria-label={item.title.replace(/\*\*/g, "")}>
      {card}
    </Link>
  );
}
