import Image from "next/image";
import { Fragment } from "react";
import type { CaseStudyBlock as CaseStudyBlockType } from "@/data/caseStudies";
import ImageCollage from "./ImageCollage";
import ToggleBlock from "./ToggleBlock";
import FeedbackStack from "./FeedbackStack";

/** Renders `**bold**` as <strong> and `==highlight==` as coral-colored text
 *  (the one approved exception to "cta color never in body text" — see the
 *  design-system skill's color-token exceptions), everything else as plain text. */
export function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <span key={index} className="text-cta">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function CaseStudyBlock({ block }: { block: CaseStudyBlockType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-5 text-body-sm text-fg last:mb-0">
          {renderInline(block.text)}
          {block.href && (
            <>
              {" "}
              <a
                href={block.href}
                target={block.href.startsWith("http") ? "_blank" : undefined}
                rel={block.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-fg underline decoration-2 underline-offset-3 transition-colors duration-300 hover:text-cta"
              >
                {block.linkText}
              </a>
            </>
          )}
        </p>
      );

    case "heading":
      return (
        <h3 id={block.id} className="mt-10 mb-3.5 scroll-mt-24 font-serif text-h3 tracking-[-0.01em] text-fg">
          {block.text}
        </h3>
      );

    case "bulletList":
      return (
        <ul className="mb-5 list-disc space-y-1.5 pl-5 text-body-sm text-fg last:mb-0">
          {block.items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case "statRow":
      return (
        <div className="my-7 flex flex-col gap-4 sm:flex-row">
          {block.stats.map((stat) => (
            <div key={stat.label} className="flex-1 rounded-lg bg-bg-alt p-6">
              <p className="mb-1.5 font-serif text-[clamp(32px,27.86px+1.10vw,42px)] leading-none font-bold tracking-[-0.04em] text-fg">
                {stat.value}
              </p>
              <p className="text-caption text-fg-secondary">{stat.label}</p>
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
              className="flex items-center gap-4 border-b border-border px-6 py-[18px] text-caption text-fg last:border-b-0"
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
          {block.width && block.height ? (
            <div className="overflow-hidden rounded-xl bg-bg-alt">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(min-width: 900px) 900px, 100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-alt">
              <Image src={block.src} alt={block.alt} fill sizes="(min-width: 900px) 900px, 100vw" className="object-contain" />
            </div>
          )}
          {block.caption && (
            <figcaption className="mt-2.5 text-center text-caption text-fg-secondary italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
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
                <figcaption className="mt-6 text-center text-caption text-fg">
                  {renderInline(video.caption)}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );

    case "embed":
      return (
        <figure className="my-8 rounded-2xl bg-white p-6 md:p-8">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-alt">
            <iframe className="absolute inset-0 h-full w-full" src={block.src} title={block.title} allowFullScreen />
          </div>
          {block.caption && (
            <figcaption className="mt-6 text-center text-caption text-fg">{renderInline(block.caption)}</figcaption>
          )}
        </figure>
      );

    case "imageCollage":
      return <ImageCollage items={block.items} />;

    case "toggle":
      return <ToggleBlock id={block.id} summary={block.summary} items={block.items} text={block.text} />;

    case "feedbackGrid":
      return <FeedbackStack cards={block.cards} />;

    default:
      return null;
  }
}
