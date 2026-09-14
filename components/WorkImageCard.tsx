import Image from "next/image";
import type { WorkItem } from "@/data/caseStudies";
import { renderInline } from "./renderInline";
import Button from "./Button";
import TagChip from "./TagChip";

/**
 * Image-first case study card for the /case-study grid — one shared layout
 * at every breakpoint now (on request, referenced from antimetal.com/blog):
 * image on top, plain content block below (tags, title, description,
 * button), nothing overlaid on the image. Used to be two different
 * markup trees — md+ clustered tags/title/description over the image on a
 * dark scrim, whole card as one link; mobile already used this stacked
 * shape instead, since the overlay read low-contrast at card width. That
 * overlap is what moved here — same content, same tokens
 * (p-card-work/gap-3/TagChip/Button), just one layout instead of two, and
 * only the "Read case study" button is a link (matches WorkCard's
 * "only the button responds" behavior, not a new interaction).
 */
export default function WorkImageCard({ item }: { item: WorkItem }) {
  const href = item.caseStudySlug ? `/case-study/${item.caseStudySlug}` : undefined;
  const title = item.title.replace(/\*\*/g, "");

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-alt">
        <Image src={item.image} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-card-work">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>
        <h3 className="text-h3 tracking-[-0.02em] text-fg">{renderInline(item.title)}</h3>
        <p className="text-body-sm text-fg">{item.description}</p>
        {href ? (
          <Button href={href}>Read case study</Button>
        ) : (
          <Button as="span">Read case study</Button>
        )}
      </div>
    </div>
  );
}
