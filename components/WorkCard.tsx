import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/data/caseStudies";
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
    <div className={`relative h-full min-h-[260px] overflow-hidden rounded-[20px] ${accentBg}`}>
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 768px) 45vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  const contentPanel = (
    <div className="flex flex-col justify-center rounded-[20px] bg-white p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] md:p-12">
      <h3 className="mb-5 font-serif text-[26px] leading-[1.1] font-bold tracking-[-0.02em] text-fg md:text-h2">
        {item.title}
      </h3>
      <div className="mb-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-fg-secondary">
            {tag}
          </span>
        ))}
      </div>
      <p className="mb-8 max-w-[420px] text-body-sm text-fg-secondary">{item.description}</p>
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FF6553] px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 group-hover:opacity-85">
        Read case study
      </span>
    </div>
  );

  const cardClassName = "group grid grid-cols-1 items-stretch gap-6 text-left md:grid-cols-2 md:gap-8";

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
