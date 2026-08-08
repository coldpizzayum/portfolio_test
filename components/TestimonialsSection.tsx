import type { CSSProperties } from "react";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="overflow-hidden bg-bg py-5 md:py-[30px]">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="mb-18 text-center">
          <h2 className="mb-3 font-serif text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:text-h1">
            What&apos;s it like working with me?
          </h2>
          <p className="text-body-sm text-fg md:text-body">
            I believe that if you work hard and stay kind, amazing things happen. :)
          </p>
        </Reveal>

        {/* Desktop / tablet: scattered collage, positioned absolutely */}
        <Reveal className="relative mx-auto hidden h-[820px] max-w-[1040px] md:block">
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
