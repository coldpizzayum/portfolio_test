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
    <div className={`relative min-h-[260px] overflow-hidden rounded-[20px] p-6 md:p-10 ${accentBg}`}>
      <div className="relative h-full min-h-[200px] overflow-hidden rounded-[14px] shadow-[0_12px_32px_rgba(16,24,40,0.14)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );

  const contentPanel = (
    <div className="flex flex-col justify-center rounded-[20px] border border-border bg-bg-alt p-8 md:p-12">
      <p className="mb-4 text-xs tracking-[0.08em] text-fg-secondary">{item.year}</p>
      <h3 className="mb-5 text-[26px] leading-[1.1] font-bold tracking-[-0.02em] text-fg md:text-[clamp(26px,3.2vw,40px)]">
        {item.title}
      </h3>
      <p className="mb-8 max-w-[420px] text-[15px] leading-[1.65] text-fg-secondary">{item.description}</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-fg-secondary">
            {tag}
          </span>
        ))}
      </div>
      {href && (
        <span className="mt-auto inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-fg transition-[gap] duration-300 group-hover:gap-3">
          View case study →
        </span>
      )}
    </div>
  );

  const cardClassName = "group grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8";

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
        <Link id={id} href={href} className={cardClassName}>
          {panels}
        </Link>
      ) : (
        <article id={id} className={cardClassName}>
          {panels}
        </article>
      )}
    </RevealItem>
  );
}
