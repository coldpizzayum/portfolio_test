"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import type { CSSProperties } from "react";
import type { QuoteTestimonial, Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  /** Absolute collage placement on desktop; omitted for the mobile scroll strip. */
  position?: CSSProperties;
}

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

function QuoteCardContent({ testimonial, sizeClass }: { testimonial: QuoteTestimonial; sizeClass: string }) {
  const isSticky = testimonial.variant === "sticky";

  if (isSticky) {
    return (
      <>
        <p className={`mb-5 font-serif text-fg ${sizeClass}`}>{renderInline(testimonial.quote)}</p>
        <p className="text-[13px] font-semibold text-fg">{testimonial.role}</p>
        <p className="text-xs text-fg-secondary">
          {testimonial.author}
          {testimonial.company ? `@${testimonial.company}` : ""}
        </p>
      </>
    );
  }

  return (
    <>
      <span aria-hidden="true" className="mb-1.5 block text-[28px] leading-[0.8] text-accent">
        &ldquo;
      </span>
      <p className={`mb-4 font-serif text-fg ${sizeClass}`}>{renderInline(testimonial.quote)}</p>
      <div className="flex items-center gap-2.5">
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-border">
          {testimonial.avatar && (
            <Image src={testimonial.avatar} alt={testimonial.author} fill sizes="32px" className="object-cover" />
          )}
        </span>
        <div>
          <p className="text-[13px] font-semibold text-fg">{testimonial.author}</p>
          <p className="text-xs text-fg-secondary">{testimonial.role}</p>
        </div>
      </div>
    </>
  );
}

export default function TestimonialCard({ testimonial, position }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const style: CSSProperties = {
    ...position,
    "--rotate": `${testimonial.rotation}deg`,
  } as CSSProperties;

  const wrapperClassName = position
    ? "collage-piece-rotate absolute"
    : "collage-piece-rotate relative shrink-0 snap-center";

  if (testimonial.type === "photo") {
    return (
      <div
        className={`${wrapperClassName} h-[220px] w-[300px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]`}
        style={{ ...style, zIndex: testimonial.zIndex }}
      >
        <Image src={testimonial.src} alt={testimonial.alt} fill sizes="300px" className="object-cover" />
      </div>
    );
  }

  const isSticky = testimonial.variant === "sticky";
  const cardStyle = isSticky
    ? { ...style, zIndex: testimonial.zIndex }
    : { ...style, zIndex: testimonial.zIndex, borderColor: testimonial.borderColor };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        aria-label={`Expand testimonial from ${testimonial.author}`}
        className={`${wrapperClassName} w-[280px] cursor-pointer rounded-2xl p-7 pb-6 text-left shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-[1.03] ${
          isSticky ? "bg-sticky-blue" : "border-2 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
        }`}
        style={cardStyle}
      >
        <QuoteCardContent testimonial={testimonial} sizeClass="text-caption" />
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
            className={`max-h-[85vh] w-[90vw] max-w-[560px] overflow-y-auto rounded-2xl p-9 text-left shadow-[0_20px_60px_rgba(0,0,0,0.3)] ${
              isSticky ? "bg-sticky-blue" : "border-2 bg-white"
            }`}
            style={isSticky ? undefined : { borderColor: testimonial.borderColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <QuoteCardContent testimonial={testimonial} sizeClass="text-body-sm" />
          </div>
        </div>
      )}
    </>
  );
}
