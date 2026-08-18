import Image from "next/image";
import Link from "next/link";
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
      <h3 className="mb-heading-gap-h3 text-h3 tracking-[-0.02em] text-fg">
        {renderInline(item.title)}
      </h3>
      <div className="mb-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <TagChip key={tag}>{tag}</TagChip>
        ))}
      </div>
      <p className="mb-8 max-w-[420px] text-body-sm text-fg">{item.description}</p>
      <Button as="span" hoverTrigger="group" className="mt-auto">
        Read case study
      </Button>
    </div>
  );

  const cardClassName = "group grid grid-cols-1 items-stretch gap-2 text-left md:grid-cols-2 md:gap-8";

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
      {href ? (
        <Link href={href} id={id} className={cardClassName}>
          {panels}
        </Link>
      ) : (
        <div id={id} className={cardClassName}>
          {panels}
        </div>
      )}
    </RevealItem>
  );
}
