import type { CSSProperties } from "react";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="overflow-hidden bg-bg py-section md:py-section-lg">
      <div className="mx-auto max-w-[1200px] px-shell md:px-shell-lg">
        <Reveal className="mb-18 text-center">
          <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">What&apos;s it like working with me?</h2>
          <p className="text-body text-fg">I believe that if you work hard and stay kind, amazing things happen. :)</p>
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

        {/* Mobile: horizontal snap-scroll strip. Setting overflow-x here
            implicitly computes overflow-y to "auto" too (a card can't stay
            "visible" on one axis while the other clips) — so without top
            padding to match pb-4, each card's own box-shadow (which extends
            ~12px above its own top edge) got clipped by this container's
            now-active vertical clipping. pt-4 gives it the same breathing
            room pb-4 already gave the bottom. */}
        <RevealGroup
          className="-mx-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pt-4 pb-4 md:hidden"
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
