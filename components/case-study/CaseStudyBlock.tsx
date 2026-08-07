import Image from "next/image";
import { Fragment } from "react";
import type { CaseStudyBlock as CaseStudyBlockType } from "@/data/caseStudies";
import ImageCollage from "./ImageCollage";

/** Renders `**bold**` segments as <strong>, everything else as plain text. */
export function renderInline(text: string) {
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
        <p className="mb-5 font-serif text-body-sm text-fg last:mb-0">
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
        <h3 className="mt-10 mb-3.5 font-serif text-h3 tracking-[-0.01em] text-fg">{block.text}</h3>
      );

    case "bulletList":
      return (
        <ul className="mb-5 list-disc space-y-1.5 pl-5 font-serif text-body-sm text-fg last:mb-0">
          {block.items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case "problemCards":
      return (
        <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.cards.map((card) => (
            <div key={card.title} className="rounded-lg bg-bg-alt p-6">
              <p className="mb-2 font-serif text-caption font-semibold text-fg">{card.title}</p>
              <p className="font-serif text-caption text-fg-secondary">{card.description}</p>
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
                <p className="mb-1 font-serif text-caption font-semibold text-fg">{step.title}</p>
                <p className="font-serif text-caption text-fg-secondary">{step.description}</p>
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
              className="flex items-start gap-2.5 rounded-lg border border-border bg-white px-5 py-4 font-serif text-caption text-fg"
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
              <p className="mb-1.5 font-serif text-[42px] leading-none font-bold tracking-[-0.04em] text-fg">
                {stat.value}
              </p>
              <p className="font-serif text-caption text-fg-secondary">{stat.label}</p>
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
              className="flex items-center gap-4 border-b border-border px-6 py-[18px] font-serif text-caption text-fg last:border-b-0"
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
            <figcaption className="mt-2.5 text-center font-serif text-caption text-fg-secondary italic">
              {block.caption}
            </figcaption>
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
              <p className="mb-2 font-serif text-[36px] leading-none font-bold tracking-[-0.03em] text-fg">
                {item.stat}
              </p>
              <p className="font-serif text-caption text-fg-secondary">{item.label}</p>
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
              className="flex gap-3 rounded-lg border border-border bg-white px-5 py-[18px] font-serif text-caption text-fg"
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

    case "videoGrid":
      return (
        <div className="my-8 flex flex-col gap-10">
          {block.videos.map((video) => (
            <figure key={video.youtubeId} className="rounded-2xl bg-white p-6 md:p-8">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-alt">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {video.caption && (
                <figcaption className="mt-6 text-center font-serif text-caption text-fg">
                  {renderInline(video.caption)}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );

    case "imageCollage":
      return <ImageCollage items={block.items} />;

    case "feedbackGrid":
      return (
        <div className="my-8 mr-[calc(-50vw+50%)] overflow-x-auto pb-2">
          <div className="flex w-max gap-5 pr-8">
          {block.cards.map((card, index) => {
            const isTestimonial = card.rating !== undefined;
            return (
              <div key={index} className="relative flex h-full w-[280px] shrink-0 flex-col rounded-2xl bg-white p-6">
                {card.photo && (
                  <div className="absolute -top-4 -right-4 h-14 w-14 overflow-hidden rounded-full ring-4 ring-white shadow-md">
                    <Image src={card.photo} alt={card.photoAlt ?? ""} fill className="object-cover" />
                  </div>
                )}
                <span
                  className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 font-serif text-[11px] font-semibold ${
                    isTestimonial ? "bg-card-sand text-[#5c4108]" : "bg-card-sage text-[#7a1f22]"
                  }`}
                >
                  {isTestimonial ? "Customer Review" : "Investment"}
                </span>
                {isTestimonial ? (
                  <p className="mb-3 text-sm tracking-wider text-[#f5a623]" aria-hidden="true">
                    {"★".repeat(card.rating ?? 0)}
                  </p>
                ) : (
                  card.eyebrow && (
                    <p
                      className={`mb-2 font-serif text-[11px] tracking-[0.04em] text-fg-secondary ${card.photo ? "pr-14" : ""}`}
                    >
                      {card.eyebrow}
                    </p>
                  )
                )}
                {card.headline && (
                  <p className={`mb-3 font-serif text-caption font-semibold text-fg ${card.photo ? "pr-10" : ""}`}>
                    {card.headline}
                  </p>
                )}
                {card.quote && (
                  <p className="mb-4 flex-1 font-serif text-caption text-fg">{renderInline(card.quote)}</p>
                )}
                <div className="mt-auto border-t border-dashed border-border pt-4">
                  {isTestimonial ? (
                    <>
                      <p className="font-serif text-caption font-semibold text-fg">{card.name}</p>
                      <p className="font-serif text-xs text-fg-secondary">{card.role}</p>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-xs text-fg-secondary">Date: {card.date}</p>
                      {card.href && (
                        <a
                          href={card.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Read more: ${card.headline ?? card.eyebrow ?? ""}`}
                          className="text-fg-secondary transition-colors duration-300 hover:text-fg"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      );

    default:
      return null;
  }
}
