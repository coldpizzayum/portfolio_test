"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { WheelEvent } from "react";
import Button from "../Button";
import TagChip from "../TagChip";

export interface MoreCaseStudyItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

/** How many tags to show — enough to cover a typical 3-4 tag case study
 *  without wrapping to a second row and eating into the card's height. */
const MAX_TAGS = 3;

// Single flat card color (on request, replacing an earlier rotating
// card-* palette) — bg-bg-alt, the site's existing light-gray surface
// token (same one Button's third-variant hover and NavPills' hover pill
// use), not a new color. bg-white was the other option offered but reads
// invisible against this section's own bg-white wrapper.
const CARD_BG = "bg-bg-alt";

const WHEEL_COOLDOWN_MS = 400;

/**
 * "More case studies" carousel — referenced from podia.com's testimonial
 * carousel (on request): colored cards side by side instead of a vertical
 * peek-stack, the next card cut off at the right edge instead of peeking
 * out behind the front one, dot-only pagination instead of Back/Next
 * buttons. Content model unchanged (image/title/description/tags/CTA) —
 * only the carousel mechanics and card chrome changed.
 *
 * Built on native horizontal scroll-snap rather than a measured/animated
 * transform — the browser handles touch/trackpad swipe for free this way,
 * and the active dot is derived from `scrollLeft` (rAF-throttled) instead
 * of tracked in a separate "current index" that could drift out of sync
 * with an actual swipe.
 */
export default function MoreCaseStudies({ items }: { items: MoreCaseStudyItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const lastWheelAt = useRef(0);
  const count = items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = track.children[0] as HTMLElement | undefined;
        if (!card) return;
        const step = card.offsetWidth + 24; // 24 = gap-6
        setIndex(Math.round(track.scrollLeft / step));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (count === 0) return null;

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    if (!track || !card) return;
    const step = card.offsetWidth + 24;
    track.scrollTo({ left: i * step, behavior: "smooth" });
  };

  // Translate vertical wheel/trackpad input into horizontal scroll — most
  // pointing devices don't have an easy horizontal-scroll gesture, and this
  // carousel otherwise only responds to an explicit swipe or dot click.
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || Math.abs(e.deltaY) < 10) return;
    const now = Date.now();
    if (now - lastWheelAt.current < WHEEL_COOLDOWN_MS) return;
    lastWheelAt.current = now;
    e.preventDefault();
    goTo(Math.min(Math.max(index + (e.deltaY > 0 ? 1 : -1), 0), count - 1));
  };

  return (
    <section id="next" className="mt-cs-section-gap mb-cs-section-gap scroll-mt-24 rounded-2xl bg-white p-card-work text-center md:mt-cs-section-gap-lg md:mb-cs-section-gap-lg md:rounded-[20px] md:p-card-work-lg">
      <h3 className="mb-heading-gap-h3 text-left text-h3 tracking-[-0.02em] text-fg">More case studies</h3>

      <div
        ref={trackRef}
        onWheel={handleWheel}
        className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-2"
      >
        {items.map((item) => (
          <div
            key={item.slug}
            className={`flex w-[86%] shrink-0 snap-start flex-col gap-5 overflow-hidden rounded-2xl p-6 text-left sm:w-[560px] sm:flex-row sm:items-center sm:gap-6 sm:p-8 ${CARD_BG}`}
          >
            <div className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-xl bg-white sm:h-[180px] sm:w-[42%]">
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 640px) 240px, 90vw" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <p className="text-h4 leading-tight tracking-[-0.01em] text-fg">{item.title}</p>
              <p className="text-caption text-fg">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, MAX_TAGS).map((tag) => (
                  <TagChip key={tag}>{tag}</TagChip>
                ))}
              </div>
              <Button href={`/case-study/${item.slug}`} className="mt-1 self-start">
                Read case study
              </Button>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Go to case study ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-fg" : "w-2 bg-border hover:bg-fg-hover"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
