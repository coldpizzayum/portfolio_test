"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { WorkItem } from "@/data/caseStudies";
import { RevealItem } from "./Reveal";

interface WorkCardProps {
  item: WorkItem;
  reversed: boolean;
  accentBg: string;
  id: string;
}

export default function WorkCard({ item, reversed, accentBg, id }: WorkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const href = item.caseStudySlug ? `/case-study/${item.caseStudySlug}` : undefined;

  const imagePanel = (
    <div className={`relative h-full min-h-[260px] overflow-hidden rounded-[20px] p-6 md:p-10 ${accentBg}`}>
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
      <p className="mb-4 font-serif text-caption tracking-[0.08em] text-fg-secondary">{item.year}</p>
      <h3 className="mb-5 font-serif text-[26px] leading-[1.1] font-bold tracking-[-0.02em] text-fg md:text-h2">
        {item.title}
      </h3>
      <p className="mb-8 max-w-[420px] font-serif text-body-sm text-fg-secondary">{item.description}</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-fg-secondary">
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 font-serif text-links font-medium text-fg transition-[gap] duration-300 group-hover:gap-3">
        View case study →
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
      <button type="button" id={id} onClick={() => setIsExpanded(true)} className={`${cardClassName} w-full`}>
        {panels}
      </button>

      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setIsExpanded(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>
          <div
            className="max-h-[85vh] w-[90vw] max-w-[720px] overflow-y-auto rounded-2xl bg-white p-9 text-left shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 font-serif text-body-sm text-fg-secondary italic">
              {item.company} | {item.year}
            </p>
            <h3 className="mb-5 font-serif text-h3 tracking-[-0.02em] text-fg">{item.title}</h3>

            <div className="mb-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-bg-alt px-3.5 py-1.5 font-serif text-caption text-fg-secondary">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mb-8 font-serif text-body-sm whitespace-pre-line text-fg">{item.description}</p>

            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {item.features.map((feature) => (
                <div key={feature.title}>
                  <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-bg-alt">
                    <Image
                      src={feature.src}
                      alt={feature.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-serif text-body-sm font-semibold text-fg">{feature.title}</p>
                  <p className="font-serif text-caption text-fg-secondary">Feature</p>
                </div>
              ))}
            </div>

            {href && (
              <Link
                href={href}
                className="inline-flex w-fit items-center gap-1.5 font-serif text-links font-medium text-fg transition-[gap] duration-300 hover:gap-3"
              >
                View full case study →
              </Link>
            )}
          </div>
        </div>
      )}
    </RevealItem>
  );
}
