import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

// Wall layout (on request, referenced from an Intercom testimonial-wall
// screenshot) — two upright rows on a solid color band instead of the old
// rotated/absolute-positioned collage. Only the 7 real quote testimonials
// (not the "photo" entry, which was collage-only filler with no quote —
// doesn't fit a customer-feedback wall) get split across the two rows.
// Split is a plain array slice, not curated ids like the collage's
// MOBILE_IDS was — there's no "which 4 look best together" concern here,
// every quote testimonial earns its place in the wall.
const quoteTestimonials = testimonials.filter((t) => t.type === "quote");
const ROW_SPLIT = Math.ceil(quoteTestimonials.length / 2);
const topRow = quoteTestimonials.slice(0, ROW_SPLIT);
const bottomRow = quoteTestimonials.slice(ROW_SPLIT);

export default function TestimonialsSection() {
  return (
    // No background band (on request) — sits on the page's own bg-bg like
    // every other section.
    <section id="testimonials" className="py-section md:py-section-lg">
      <div className="mx-auto max-w-[1200px] px-shell md:px-shell-lg">
        <Reveal className="mb-8 text-center md:mb-10">
          <h2 className="text-h2 tracking-[-0.03em] text-fg">Don&apos;t just take my word for it</h2>
        </Reveal>
      </div>

      {/* Two rows of upright cards (TestimonialCard with no `position` prop
          renders unrotated/relative — the same code path the old mobile
          stack used), each its own horizontal scroller so the row can hold
          more cards than fit one screen without wrapping mid-quote. Rows
          are full-bleed (outside the max-w-[1200px] text column above) so
          a card can sit flush at the viewport edge instead of stopping at
          the shell's own padding.
          py-3 on each row — setting `overflow-x-auto` without an explicit
          overflow-y forces the browser to compute overflow-y as `auto`
          too (a CSS spec quirk, not a bug in this rule), so a card's own
          hover:scale-[1.03] (in TestimonialCard) was clipping top/bottom
          against the row's own box with no vertical breathing room. This
          padding is that breathing room, not a spacing choice. */}
      <div className="flex flex-col gap-6">
        {[topRow, bottomRow].map((row, rowIndex) => (
          <RevealGroup
            key={rowIndex}
            className="scrollbar-hide flex justify-center gap-6 overflow-x-auto px-shell py-3 md:px-shell-lg"
            stagger={0.08}
          >
            {row.map((testimonial) => (
              <RevealItem key={testimonial.id} className="shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </RevealItem>
            ))}
          </RevealGroup>
        ))}
      </div>
    </section>
  );
}
