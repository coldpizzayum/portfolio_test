import type { CSSProperties } from "react";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

// Mobile shows a curated 4-card subset instead of the full 9-card deck —
// same ids the design picked out of the desktop fan (2 avatar cards each
// side of the row's midpoint, no photo card, no star cards).
const MOBILE_IDS = ["maxine", "bill", "kei", "james"];

export default function TestimonialsSection() {
  const mobileTestimonials = testimonials.filter((testimonial) => MOBILE_IDS.includes(testimonial.id));

  return (
    <section id="testimonials" className="overflow-hidden bg-bg py-section md:py-section-lg">
      <div className="mx-auto max-w-[1200px] px-shell md:px-shell-lg">
        {/* mb-5 (20px) — deliberately smaller than the sitewide
            --spacing-heading-gap-h2 token would suggest, and not itself a
            shared token. This wrapper's gap is to the *next content region*
            below it (the card collage), not h2-to-its-own-paragraph (that's
            still `mb-heading-gap-h2` on the <h2> itself, unchanged) — no
            other section on the site has the exact same shape (a heading
            block sitting above a scattered/floating card area rather than a
            flat content block), so there's no existing token this could
            reuse outright. The cards themselves start with their own small
            top offset inside the collage box (`position.top`, e.g. 31px for
            maxine), which stacks with this margin — so the *effective*
            visual gap above the first card ends up in the same ballpark as
            AiProjectsSection's `mt-12` (48px) or OutsideWork's `mb-10`
            (40px), even though this literal value (20px) looks smaller in
            isolation. Confirmed against a live DOM edit, not guessed. */}
        <Reveal className="mb-5 text-center">
          <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">What&apos;s it like working with me?</h2>
          <p className="text-body text-fg">I believe that if you work hard and stay kind, amazing things happen. :)</p>
        </Reveal>

        {/* Desktop / tablet: scattered collage, absolute positioning per
            card (`testimonial.position`) within a centered `max-w-[1040px]`
            box — matches the production layout (yiting.space). The
            full-bleed "breaks out to the viewport edge" experiment (and its
            wider ±px scatter) was reverted; this is back to the original
            mechanism, not a variant of it.
            Height was 820px (the production value) — after the latest
            drag-tool pass, every card's `position.top + card height`
            bottoms out well above that (James reaches the lowest, ~634px),
            leaving ~180px of dead space this box was reserving below the
            actual cards, which read as an oversized gap before Footer.
            Trimmed to 700px (James's ~634px + a ~65px buffer) — not a
            literal half (410px), which would clip/overlap James into
            Footer. If cards move again via the layout tool, this needs
            rechecking against whichever card sits lowest. */}
        <Reveal className="relative mx-auto hidden h-[700px] max-w-[1040px] md:block">
          {testimonials.map((testimonial) => {
            const position: CSSProperties = {
              top: testimonial.position.top,
              left: testimonial.position.left,
              right: testimonial.position.right,
            };
            return <TestimonialCard key={testimonial.id} testimonial={testimonial} position={position} />;
          })}
        </Reveal>

        {/* Mobile: curated 4-card stack, top to bottom, no horizontal
            scroll — replaces the old snap-scroll strip. */}
        <RevealGroup className="flex flex-col items-center gap-6 md:hidden" stagger={0.08}>
          {mobileTestimonials.map((testimonial) => (
            <RevealItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
