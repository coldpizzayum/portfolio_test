import Image from "next/image";
import type { CaseStudyBlock as CaseStudyBlockType } from "@/data/caseStudies";
import Button from "../Button";
import ImageCollage from "./ImageCollage";
import ToggleBlock from "./ToggleBlock";
import FeedbackStack from "./FeedbackStack";
import { renderInline } from "../renderInline";

export default function CaseStudyBlock({ block }: { block: CaseStudyBlockType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-5 text-body-sm text-fg last:mb-0">
          {renderInline(block.text)}
          {block.href && (
            <>
              {" "}
              <Button
                variant="links"
                href={block.href}
                target={block.href.startsWith("http") ? "_blank" : undefined}
                rel={block.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {block.linkText}
              </Button>
            </>
          )}
        </p>
      );

    case "heading":
      return (
        <h3 id={block.id} className="mt-10 mb-heading-gap-h4 scroll-mt-24 text-h4 tracking-[-0.01em] text-fg">
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
      // bg-white + text-fg label — matches the other white cards elsewhere
      // on case study pages (Overview card, Impact Overview stat cards),
      // both a deliberate choice over the default bg-bg-alt / text-fg-secondary.
      // Only usage sitewide: coolwallet-pro's eCom Redesign section — no
      // other page is affected by changes here.
      return (
        <div className="my-7 flex flex-col gap-4 sm:flex-row">
          {block.stats.map((stat) => (
            <div key={stat.label} className="flex-1 rounded-lg bg-white p-card-compact md:p-card-compact-lg">
              <p className="mb-1.5 text-h5 tracking-[-0.04em] text-fg">
                {stat.value}
              </p>
              <p className="text-caption text-fg">{stat.label}</p>
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
            <figure key={video.youtubeId} className="rounded-2xl bg-white p-card-compact md:p-card-compact-lg">
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
        <figure className="my-8 rounded-2xl bg-white p-card-compact md:p-card-compact-lg">
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
