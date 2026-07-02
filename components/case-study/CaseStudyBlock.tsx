import Image from "next/image";
import { Fragment } from "react";
import type { CaseStudyBlock as CaseStudyBlockType } from "@/data/caseStudies";

/** Renders `**bold**` segments as <strong>, everything else as plain text. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function CaseStudyBlock({ block }: { block: CaseStudyBlockType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-5 text-base leading-[1.75] text-fg-secondary last:mb-0">
          {renderInline(block.text)}
          {block.href && (
            <>
              {" "}
              <a
                href={block.href}
                target={block.href.startsWith("http") ? "_blank" : undefined}
                rel={block.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-accent underline underline-offset-3 transition-colors duration-300 hover:text-fg"
              >
                {block.linkText}
              </a>
            </>
          )}
        </p>
      );

    case "heading":
      return (
        <h3 className="mt-10 mb-3.5 text-xl font-semibold tracking-[-0.01em] text-fg">{block.text}</h3>
      );

    case "problemCards":
      return (
        <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.cards.map((card) => (
            <div key={card.title} className="rounded-lg bg-bg-alt p-6">
              <p className="mb-2 text-[15px] font-semibold text-fg">{card.title}</p>
              <p className="text-sm leading-[1.6] text-fg-secondary">{card.description}</p>
            </div>
          ))}
        </div>
      );

    case "researchSteps":
      return (
        <div className="my-7 flex flex-col gap-4">
          {block.steps.map((step, index) => (
            <div key={step.title} className="grid grid-cols-[40px_1fr] items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-fg text-sm font-bold text-bg">
                {index + 1}
              </div>
              <div>
                <p className="mb-1 text-[15px] font-semibold text-fg">{step.title}</p>
                <p className="text-sm leading-[1.65] text-fg-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "hmwList":
      return (
        <div className="my-5 flex flex-col gap-2">
          {block.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-white px-5 py-4 text-[15px] leading-[1.5] text-fg"
            >
              <span className="mt-px flex-shrink-0 text-base text-accent">→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      );

    case "statRow":
      return (
        <div className="my-7 flex flex-col gap-4 sm:flex-row">
          {block.stats.map((stat) => (
            <div key={stat.label} className="flex-1 rounded-lg bg-bg-alt p-6">
              <p className="mb-1.5 text-[42px] leading-none font-bold tracking-[-0.04em] text-fg">{stat.value}</p>
              <p className="text-[13px] leading-[1.5] text-fg-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      );

    case "flowList":
      return (
        <div className="my-5 flex flex-col overflow-hidden rounded-lg border border-border">
          {block.items.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-4 border-b border-border px-6 py-[18px] text-[15px] text-fg last:border-b-0"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-bg-alt text-xs font-bold">
                {index + 1}
              </div>
              <div>
                <span className="font-semibold">{item.name}</span>
                <span className="ml-1 text-sm text-fg-secondary"> — {item.description}</span>
              </div>
            </div>
          ))}
        </div>
      );

    case "image":
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-alt">
            <Image src={block.src} alt={block.alt} fill sizes="(min-width: 900px) 900px, 100vw" className="object-cover" />
          </div>
          {block.caption && (
            <figcaption className="mt-2.5 text-center text-xs text-fg-secondary italic">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "outcomeGrid":
      return (
        <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.label} className="rounded-lg bg-bg-alt px-6 py-7">
              <p className="mb-3 text-xl" aria-hidden="true">
                {item.emoji}
              </p>
              <p className="mb-2 text-[36px] leading-none font-bold tracking-[-0.03em] text-fg">{item.stat}</p>
              <p className="text-[13px] leading-[1.5] text-fg-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      );

    case "impactList":
      return (
        <div className="my-5 flex flex-col gap-3">
          {block.items.map((item) => (
            <div
              key={item.text}
              className="flex gap-3 rounded-lg border border-border bg-white px-5 py-[18px] text-[15px] leading-[1.55] text-fg"
            >
              <span className="flex-shrink-0 text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span>
                {renderInline(item.text)}{" "}
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline underline-offset-3 transition-colors duration-300 hover:text-fg"
                  >
                    {item.linkText}
                  </a>
                )}
              </span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
