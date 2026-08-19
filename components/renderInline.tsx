import { Fragment } from "react";

/** Renders `**bold**` as <strong> and `==highlight==` as accent-colored text
 *  via `--color-cta-text` (the cta family's text-context variant, not
 *  `--color-cta` itself — see the design-system skill's color-token
 *  exceptions), everything else as plain text.
 *
 *  Lives in its own module (not on `CaseStudyBlock.tsx`, where it used to
 *  live) so components outside `case-study/` (`TestimonialCard`, `WorkCard`)
 *  can use it without creating an import cycle: `CaseStudyBlock` renders
 *  `FeedbackStack`, and `FeedbackStack` renders `TestimonialCard`'s shared
 *  `QuoteCardContent` — if `renderInline` still lived on `CaseStudyBlock`,
 *  that would loop back through it. */
export function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <span key={index} className="text-cta-text">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
