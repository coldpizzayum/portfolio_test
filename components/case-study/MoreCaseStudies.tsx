import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import TagChip from "../TagChip";

export interface MoreCaseStudyItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

/** How many tags to show — enough to cover a typical 3-4 tag case study
 *  without wrapping to a second row and eating into the card's height. */
const MAX_TAGS = 3;

/**
 * "More case studies" — referenced from antimetal.com's blog "Related
 * posts" footer section (on request): a full-width, dashed-top-border
 * section sitting directly below the case study content, outside the
 * TOC/article two-column layout (rendered as a sibling in CaseStudyView,
 * not nested inside <article> the way the old carousel version was) —
 * plain static grid instead of a scroll-snap carousel, no pagination.
 * Cards mirror WorkImageCard's mobile stacked layout (image on top, plain
 * content block below) at every breakpoint, rather than that component's
 * desktop dark-scrim-overlay treatment — closer to a blog-preview card
 * than a hero card, matching the reference.
 */
export default function MoreCaseStudies({ items }: { items: MoreCaseStudyItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="w-full border-t border-dashed border-border">
      <div className="mx-auto max-w-[1040px] px-shell py-cs-section-gap md:px-shell-lg md:py-cs-section-gap-lg">
        <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
          <h3 className="text-h3 tracking-[-0.02em] text-fg">More case studies</h3>
          <Button href="/case-study" variant="third">
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => (
            <Link key={item.slug} href={`/case-study/${item.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-alt">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, MAX_TAGS).map((tag) => (
                  <TagChip key={tag}>{tag}</TagChip>
                ))}
              </div>
              <div>
                <p className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">{item.title}</p>
                <p className="text-body-sm text-fg">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
