import type { CSSProperties } from "react";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="overflow-hidden bg-bg py-20 md:py-30">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="mb-18 text-center">
          <h2 className="mb-3 text-[32px] font-bold tracking-[-0.03em] text-fg md:text-[clamp(32px,5vw,56px)]">
            What&apos;s it like working with me?
          </h2>
          <p className="text-lg text-fg-secondary italic">
            By working hard and being kind — amazing things happen.
          </p>
        </Reveal>

        {/* Desktop / tablet: scattered collage, positioned absolutely */}
        <Reveal className="relative mx-auto hidden h-[560px] max-w-[1000px] md:block">
          {testimonials.map((testimonial) => {
            const position: CSSProperties = {
              top: testimonial.position.top,
              left: testimonial.position.left,
              right: testimonial.position.right,
            };
            return <TestimonialCard key={testimonial.id} testimonial={testimonial} position={position} />;
          })}
        </Reveal>

        {/* Mobile: horizontal snap-scroll strip */}
        <RevealGroup
          className="-mx-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pb-4 md:hidden"
          stagger={0.08}
        >
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.id} className="shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
