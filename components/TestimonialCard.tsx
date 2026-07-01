import type { CSSProperties } from "react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  /** Absolute collage placement on desktop; omitted for the mobile scroll strip. */
  position?: CSSProperties;
}

export default function TestimonialCard({ testimonial, position }: TestimonialCardProps) {
  const style: CSSProperties = {
    ...position,
    "--rotate": `${testimonial.rotation}deg`,
  } as CSSProperties;

  const wrapperClassName = position
    ? "collage-piece-rotate absolute"
    : "collage-piece-rotate relative shrink-0 snap-center";

  if (testimonial.type === "quote") {
    return (
      <div
        className={`${wrapperClassName} w-[280px] rounded-2xl bg-white p-7 pb-6 shadow-[0_2px_12px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.04)]`}
        style={{ ...style, zIndex: testimonial.zIndex }}
      >
        <span aria-hidden="true" className="mb-1.5 block text-[28px] leading-[0.8] text-accent">
          &ldquo;
        </span>
        <p className="mb-4 text-sm leading-[1.75] text-fg">{testimonial.quote}</p>
        <p className="text-[13px] font-semibold text-fg">{testimonial.author}</p>
        <p className="mt-0.5 text-xs text-fg-secondary">{testimonial.role}</p>
      </div>
    );
  }

  if (testimonial.type === "sticky") {
    const bg = testimonial.color === "yellow" ? "bg-sticky-yellow" : "bg-sticky-green";
    return (
      <div
        className={`${wrapperClassName} rounded-[4px] px-5 pt-5 pb-7 text-sm leading-[1.6] font-medium text-fg shadow-[2px_4px_12px_rgba(0,0,0,0.1)] ${bg}`}
        style={{ ...style, width: testimonial.width ?? 200, zIndex: testimonial.zIndex }}
      >
        {testimonial.text}
      </div>
    );
  }

  return (
    <div
      className={`${wrapperClassName} w-[180px] rounded-lg bg-white p-2.5 pb-9 shadow-[0_4px_16px_rgba(0,0,0,0.09),0_0_0_1px_rgba(0,0,0,0.04)]`}
      style={{ ...style, zIndex: testimonial.zIndex }}
    >
      <span className="absolute -top-2.5 left-1/2 z-10 h-[18px] w-12 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-[rgba(201,169,110,0.38)]" />
      <div className="aspect-square overflow-hidden rounded-[4px] bg-bg-alt">
        <svg viewBox="0 0 160 160" className="h-full w-full">
          <rect width="160" height="160" fill="#DDD8D0" />
          <line x1="0" y1="0" x2="160" y2="160" stroke="#C8C3BB" strokeWidth="1.2" />
          <line x1="0" y1="40" x2="160" y2="200" stroke="#C8C3BB" strokeWidth="1.2" />
          <line x1="0" y1="80" x2="160" y2="240" stroke="#C8C3BB" strokeWidth="1.2" />
          <line x1="0" y1="120" x2="160" y2="280" stroke="#C8C3BB" strokeWidth="1.2" />
          <line x1="0" y1="-40" x2="160" y2="120" stroke="#C8C3BB" strokeWidth="1.2" />
          <text x="80" y="78" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#9A9590">
            {testimonial.placeholderLabel}
          </text>
        </svg>
      </div>
      <p className="mt-2.5 text-center font-mono text-[11px] text-fg-secondary">{testimonial.caption}</p>
    </div>
  );
}
