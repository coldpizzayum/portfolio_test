import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/data/caseStudies";
import { RevealItem } from "./Reveal";

interface WorkCardProps {
  item: WorkItem;
  reversed: boolean;
}

export default function WorkCard({ item, reversed }: WorkCardProps) {
  const href = item.caseStudySlug ? `/case-study/${item.caseStudySlug}` : undefined;

  const info = (
    <div
      className={`flex flex-col justify-center p-8 md:p-16 ${reversed ? "md:order-none md:col-start-1 md:row-start-1" : ""}`}
    >
      <p className="mb-4 text-xs tracking-[0.08em] text-fg-secondary">{item.year}</p>
      <h3 className="mb-4 text-[22px] leading-[1.15] font-bold tracking-[-0.02em] text-fg md:text-[clamp(22px,2.8vw,32px)]">
        {item.title}
      </h3>
      <p className="mb-8 max-w-[400px] text-[15px] leading-[1.65] text-fg-secondary">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-fg-secondary">
            {tag}
          </span>
        ))}
      </div>
      {href ? (
        <span className="mt-8 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-fg transition-[gap] duration-300 group-hover:gap-3">
          View case study →
        </span>
      ) : (
        <span className="mt-8 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-fg">
          View case study →
        </span>
      )}
    </div>
  );

  const image = (
    <div className={`relative min-h-[240px] w-full bg-bg-alt md:min-h-0 ${reversed ? "md:col-start-2 md:row-start-1" : ""}`}>
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  const cardClassName =
    "group grid grid-cols-1 items-stretch overflow-hidden rounded-[4px] border border-border bg-bg transition-transform duration-300 ease-out md:grid-cols-2 md:hover:scale-[1.015]";

  return (
    <RevealItem>
      {href ? (
        <Link href={href} className={cardClassName}>
          {image}
          {info}
        </Link>
      ) : (
        <article className={cardClassName}>
          {image}
          {info}
        </article>
      )}
    </RevealItem>
  );
}
