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
      <span aria-hidden="true" className="mb-1.5 block text-[28px] leading-[0.8] text-[#1A1A1A]">
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
  const [isHovered, setIsHovered] = useState(false);

  // Rotation is only meant for the desktop scattered-collage look; on the
  // mobile snap-scroll strip it made cards' rotated corners poke past the
  // section's `overflow-hidden` bounds and get clipped, so keep cards
  // upright there.
  const style: CSSProperties = {
    ...position,
    "--rotate": position ? `${testimonial.rotation}deg` : "0deg",
  } as CSSProperties;

  const wrapperClassName = position
    ? "collage-piece-rotate absolute"
    : "collage-piece-rotate relative shrink-0 snap-center";

  const zIndex = isHovered ? 100 : testimonial.zIndex;

  if (testimonial.type === "photo") {
    return (
      <div
        className={`${wrapperClassName} h-[220px] w-[300px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]`}
        style={{ ...style, zIndex }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={testimonial.src} alt={testimonial.alt} fill sizes="300px" className="object-cover" />
      </div>
    );
  }

  const isSticky = testimonial.variant === "sticky";
  const cardStyle = isSticky ? { ...style, zIndex } : { ...style, zIndex, borderColor: testimonial.borderColor };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${wrapperClassName} w-[280px] rounded-2xl p-7 pb-6 text-left shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-[1.03] ${
        isSticky ? "bg-sticky-blue" : "border-2 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
      }`}
      style={cardStyle}
    >
      <QuoteCardContent testimonial={testimonial} sizeClass="text-caption" />
    </div>
  );
}
