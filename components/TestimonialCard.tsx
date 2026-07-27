import Image from "next/image";
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

  if (testimonial.type === "photo") {
    return (
      <div
        className={`${wrapperClassName} h-[300px] w-[260px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]`}
        style={{ ...style, zIndex: testimonial.zIndex }}
      >
        <Image src={testimonial.src} alt={testimonial.alt} fill sizes="260px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${wrapperClassName} w-[280px] rounded-2xl border-2 bg-white p-7 pb-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]`}
      style={{ ...style, zIndex: testimonial.zIndex, borderColor: testimonial.borderColor }}
    >
      <span aria-hidden="true" className="mb-1.5 block text-[28px] leading-[0.8] text-accent">
        &ldquo;
      </span>
      <p className="mb-4 font-serif text-caption text-fg">{testimonial.quote}</p>
      <div className="flex items-center gap-2.5">
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-border">
          <Image src={testimonial.avatar} alt={testimonial.author} fill sizes="32px" className="object-cover" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-fg">{testimonial.author}</p>
          <p className="text-xs text-fg-secondary">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
