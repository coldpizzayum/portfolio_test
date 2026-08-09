"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CSSProperties, WheelEvent } from "react";
import Button from "../Button";

export interface MoreCaseStudyItem {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const CARD_HEIGHT = { base: 210, sm: 248 };
/** Vertical rise and shrink per layer behind the front card. */
const PEEK_STEP = 16;
const SCALE_STEP = 0.04;
const WHEEL_COOLDOWN_MS = 400;

/**
 * Stacked-card "More case studies" carousel, styled after benshih.design's
 * case study page (peeking card stack), with our own Back/Next pagination
 * instead of their shuffle button. Also pages via mouse-wheel scroll.
 *
 * The "stage" height is computed from the actual number of visible layers
 * (not a fixed constant) so there's no dead space above the stack when
 * there are fewer than 3 other case studies to show.
 */
export default function MoreCaseStudies({ items }: { items: MoreCaseStudyItem[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const lastWheelAt = useRef(0);

  if (count === 0) return null;

  const goBack = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (count <= 1) return;
    const now = Date.now();
    if (now - lastWheelAt.current < WHEEL_COOLDOWN_MS) return;
    if (Math.abs(e.deltaY) < 10) return;
    lastWheelAt.current = now;
    if (e.deltaY > 0) goNext();
    else goBack();
  };

  // Reorder so the current selection is always the front card; the stack
  // behind cycles along with it as the user pages through.
  const ordered = items.map((_, i) => items[(index + i) % count]);
  const visible = ordered.slice(0, Math.min(3, count));
  const maxDepth = visible.length - 1;
  const backScale = 1 - maxDepth * SCALE_STEP;
  const stageHeightBase = Math.round(maxDepth * PEEK_STEP + CARD_HEIGHT.base * backScale);
  const stageHeightSm = Math.round(maxDepth * PEEK_STEP + CARD_HEIGHT.sm * backScale);

  return (
    <section id="next" className="mt-20 mb-20 scroll-mt-24 rounded-2xl bg-white p-8 text-center md:rounded-[20px] md:p-12">
      <h3 className="mb-8 font-serif text-h2 tracking-[-0.02em] text-fg">More case studies</h3>

      <div
        onWheel={handleWheel}
        className="relative mx-auto h-[var(--stage-h-base)] w-full max-w-[720px] sm:h-[var(--stage-h-sm)]"
        style={
          {
            "--stage-h-base": `${stageHeightBase}px`,
            "--stage-h-sm": `${stageHeightSm}px`,
          } as CSSProperties
        }
      >
        {visible.map((item, i) => {
          const isFront = i === 0;
          const y = -i * PEEK_STEP;
          const scale = 1 - i * SCALE_STEP;
          return (
            <div
              key={item.slug}
              aria-hidden={!isFront}
              className="absolute inset-x-0 bottom-0 flex h-[210px] origin-bottom overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-[0_-2px_24px_rgba(16,24,40,0.07)] transition-transform duration-300 sm:h-[248px] sm:p-5"
              style={{
                zIndex: visible.length - i,
                transform: `translateY(${y}px) scale(${scale})`,
              }}
            >
              <div className="relative hidden w-[38%] shrink-0 overflow-hidden rounded-xl bg-bg-alt sm:block">
                <Image src={item.image} alt={item.title} fill sizes="320px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 text-left sm:pl-5">
                <div className="flex-1 space-y-2">
                  <p className="font-serif text-h3 leading-tight tracking-[-0.02em] text-fg">{item.title}</p>
                  <p className="line-clamp-2 text-caption text-fg">{item.description}</p>
                </div>
                {isFront && (
                  <Button href={`/case-study/${item.slug}`} size="sm">
                    Read case study
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="relative z-10 mt-6 flex items-center justify-center gap-3">
          <Button as="button" variant="secondary" size="sm" onClick={goBack}>
            Back
          </Button>
          <Button as="button" variant="dark" size="sm" onClick={goNext}>
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
