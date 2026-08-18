import Image from "next/image";
import type { WorkItem } from "@/data/caseStudies";
import Button from "./Button";
import TagChip from "./TagChip";
import { renderInline } from "./case-study/CaseStudyBlock";
import { RevealItem } from "./Reveal";

interface WorkCardProps {
  item: WorkItem;
  reversed: boolean;
  accentBg: string;
  id: string;
}

export default function WorkCard({ item, reversed, accentBg, id }: WorkCardProps) {
  const href = item.caseStudySlug ? `/case-study/${item.caseStudySlug}` : undefined;

  const imagePanel = (
    <div className={`relative h-full min-h-[260px] overflow-hidden rounded-2xl md:rounded-[20px] ${accentBg}`}>
      <Image
        src={item.image}
        alt={item.title.replace(/\*\*/g, "")}
        fill
        sizes="(min-width: 768px) 45vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  const contentPanel = (
    <div className="flex flex-col justify-center rounded-2xl bg-white p-card-work shadow-none md:rounded-[20px] md:p-card-work-lg md:shadow-card">
      {/* Fixed min-height so the title+description+tags block occupies the
       *  same space across every WorkCard regardless of how much text a
       *  given case study has — otherwise the "Read case study" button
       *  (pinned to the bottom via mt-auto below) would land at a
       *  different height on every card. The 320px estimate is sized off
       *  the longest current content (this card's 4-line description +
       *  4 tags wrapping to 2 rows) with some headroom; re-check by eye
       *  on localhost if a future case study's title/description/tag
       *  count is longer than these three and adjust the number. */}
      <div className="flex min-h-[320px] flex-col">
        <h3 className="mb-heading-gap-h3 text-h3 tracking-[-0.02em] text-fg">
          {renderInline(item.title)}
        </h3>
        <p className="mb-8 max-w-[420px] text-body-sm text-fg">{item.description}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>
      </div>
      {/* The only interactive/link element on the whole card — deliberately
       *  scoped down from "whole card is one giant <Link>" (see below).
       *  Rest of the card (image, title, description, tags) has no hover
       *  or click behavior at all; only this button responds. */}
      {href ? (
        <Button href={href} className="mt-auto">
          Read case study
        </Button>
      ) : (
        <Button as="span" className="mt-auto">
          Read case study
        </Button>
      )}
    </div>
  );

  // Plain grid, not a <Link> — the card itself isn't clickable. Only the
  // "Read case study" button (above) is an actual link; hovering/clicking
  // anywhere else on the card (image, title, description, tags) does
  // nothing on purpose.
  const cardClassName = "grid grid-cols-1 items-stretch gap-2 text-left md:grid-cols-2 md:gap-8";

  const panels = reversed ? (
    <>
      <div className="md:order-2">{imagePanel}</div>
      <div className="md:order-1">{contentPanel}</div>
    </>
  ) : (
    <>
      {imagePanel}
      {contentPanel}
    </>
  );

  return (
    <RevealItem>
      <div id={id} className={cardClassName}>
        {panels}
      </div>
    </RevealItem>
  );
}
