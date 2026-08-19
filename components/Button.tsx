import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

// Prop values stay lowercase (matches the rest of the codebase's convention)
// even though the design system's display names are capitalized —
// primary=Primary, secondary=Secondary, third=Third, links=Links. Mapping
// from the old 3-variant system: old "primary" (cta fill) is unchanged; old
// "dark" (solid fg fill) is now called "secondary"; old "secondary" (outline)
// is now called "third". "links" is new, no old equivalent.
type ButtonVariant = "primary" | "secondary" | "third" | "links";

interface ButtonProps {
  variant?: ButtonVariant;
  /** Most buttons drive their own hover state. WorkCard's is a purely
   *  decorative element inside an ancestor `<Link className="group">` — the
   *  whole card is what's actually clickable, so it needs to react to the
   *  ancestor's hover instead of its own. */
  hoverTrigger?: "self" | "group";
  /** Icon-only square button (h-10 w-10, no horizontal padding, no gap) —
   *  Header's LinkedIn button, the one shape `<Button>` couldn't previously
   *  express. Only meaningful on primary/secondary/third; ignored on
   *  `links` (which has no shape of its own to begin with). Requires
   *  `ariaLabel` since there's no visible text for assistive tech to read. */
  square?: boolean;
  /** Required when `square` is true — otherwise the button has no accessible
   *  name. Passed through as `aria-label` regardless of `square`. */
  ariaLabel?: string;
  /** Only meaningful on `links` — set false to drop the underline (e.g. a
   *  "featured" nav link that should read more like a heading than an
   *  inline text link). Defaults true. Ignored on every other variant. */
  underline?: boolean;
  /** Defaults to "a" when `href` is given, otherwise "button". WorkCard
   *  uses "span" for its decorative case (see `hoverTrigger` above — the
   *  real interactive element is its ancestor `<Link>`, not this one). */
  as?: "a" | "button" | "span";
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler;
  id?: string;
  className?: string;
  children: ReactNode;
}

// All three pill variants (primary/secondary/third) share one fixed compact
// shape — rounded-lg (not a pill), fixed h-10 height + px-4 (or a plain
// w-10 square when `square` is set — see the prop and Header note below),
// the same regardless of context. This used to be a two-tier system (rounded-full +
// a `size` prop choosing between md/sm padding, with primary staying that
// way "to read as the one big important action" while secondary/third had
// already moved to this fixed shape) — but that left primary looking
// mismatched next to its now-compact siblings (e.g. Hero's "Check out
// recent work" primary towering over "Learn more about me" third right next
// to it), so primary was folded into the same COMPACT_SHAPE too
// (2026-08-18). There's no more per-button size variance across the three —
// the `size` prop was removed along with it.
//
// The shape itself (h-10 rounded-lg px-4) is copied byte-for-byte from
// Header.tsx's old hand-rolled DARK_BUTTON constant (2026-08-18, same day)
// — this used to be px-3.5 py-2.5 instead, which was already visually close
// to DARK_BUTTON but not identical (py-2.5 lands a hair shorter than a
// fixed h-10). DARK_BUTTON itself is gone now (2026-08-18, later same day)
// — Header's LinkedIn/Say Hello buttons were migrated onto <Button
// variant="secondary"> directly (LinkedIn uses the new `square` prop, since
// it's an icon-only button with no label text), closing the loop this
// comment used to describe as still-open.
//
// primary briefly carried a `border border-fg` (2026-08-18, same day) as a
// mitigation for --color-cta (#00ffae) only having a 1.21:1 contrast ratio
// against --color-bg — removed again shortly after on request. The
// underlying contrast problem was never actually fixed by the border (it
// only made the button's edge findable, not the fill itself compliant),
// and removing it doesn't make anything newly broken — just reverts to the
// pre-border baseline. Still an open a11y item, see design-system skill.
//
// "links" is the one exception: a plain inline text link, no pill chrome,
// no forced font-size (it needs to inherit whichever paragraph/list it
// sits in: CaseStudyBlock's in-body link inherits text-body-sm from its
// parent <p>, Footer's link columns supply their own text-caption on the
// <ul> ancestor instead). The underline itself is opt-out-able via the
// `underline` prop (2026-08-18) — added for Footer's first Navigation item,
// which wanted to read like a bigger, un-underlined heading-style link
// rather than an inline text link; defaults to true so every existing
// `links` consumer is unaffected.
//
// Split into a shape (height/radius, shared by every non-links button) and
// a padding piece (px-4 + gap-2 for icon+label; swapped for a plain w-10
// square when `square` is set — see the `square` prop and 2026-08-18
// Header consolidation note below) so the two can vary independently.
const COMPACT_SHAPE = "h-10 rounded-lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: `${COMPACT_SHAPE} bg-cta text-fg`,
  secondary: `${COMPACT_SHAPE} bg-fg text-bg`,
  third: `${COMPACT_SHAPE} border border-border text-fg`,
  links: "text-fg",
};

const LINKS_UNDERLINE = "underline decoration-2 underline-offset-3";

const HOVER_CLASSES: Record<ButtonVariant, { self: string; group: string }> = {
  // Real color swap, not opacity fade — kept this way even after the
  // 2026-08-18 border removal below (see VARIANT_CLASSES comment) because
  // opacity would fade bg-cta toward the page background, which is already
  // the accessibility problem primary has, not a fix for it.
  primary: { self: "hover:bg-cta-hover", group: "group-hover:bg-cta-hover" },
  secondary: { self: "hover:bg-fg-hover", group: "group-hover:bg-fg-hover" },
  // Border darkens AND gets a solid fill. History: started as a translucent
  // cta-tinted fill (bg-cta/15) → changed to flat #E2DFDA (bg-border) on
  // request → corrected same day to flat #efede9 (bg-bg-alt), which is what
  // Header's NavPills hover also uses — the two are meant to read as the
  // same hover color sitewide, see NavPills in Header.tsx.
  third: { self: "hover:border-fg hover:bg-bg-alt", group: "group-hover:border-fg group-hover:bg-bg-alt" },
  // --color-cta-text (#2bb98c), not --color-cta — this is text, and
  // --color-cta itself is tuned for button backgrounds, not legible as
  // text (2026-08-18).
  links: { self: "hover:text-cta-text", group: "group-hover:text-cta-text" },
};

const TRANSITION_CLASSES: Record<ButtonVariant, string> = {
  primary: "transition-colors duration-200",
  secondary: "transition-colors duration-300",
  third: "transition-colors duration-300",
  links: "transition-colors duration-300",
};

/**
 * Shared CTA button — four variants (primary cta-green fill / secondary dark
 * fill / third outline / links plain text). primary/secondary/third all
 * share one fixed h-10 rounded-lg shape (COMPACT_SHAPE above, copied from
 * Header's DARK_BUTTON) with either px-4 + gap-2 padding (the normal case)
 * or a plain w-10 square (`square`, for icon-only buttons like Header's
 * LinkedIn link); links doesn't use that shape at all, relying on inherited
 * font-size instead. There's no `size` prop — every pill button is the same
 * size now.
 */
export default function Button({
  variant = "primary",
  hoverTrigger = "self",
  square = false,
  ariaLabel,
  underline = true,
  as,
  href,
  target,
  rel,
  type = "button",
  onClick,
  id,
  className = "",
  children,
}: ButtonProps) {
  const tag = as ?? (href ? "a" : "button");
  const isLinks = variant === "links";
  const isSquare = square && !isLinks;
  const classes = isLinks
    ? `${VARIANT_CLASSES.links} ${underline ? LINKS_UNDERLINE : ""} ${TRANSITION_CLASSES.links} ${HOVER_CLASSES.links[hoverTrigger]} ${className}`
    : `inline-flex items-center justify-center text-sm font-semibold ${isSquare ? "w-10" : "w-fit gap-2 px-4"} ${VARIANT_CLASSES[variant]} ${TRANSITION_CLASSES[variant]} ${HOVER_CLASSES[variant][hoverTrigger]} ${className}`;

  if (tag === "span") {
    return (
      <span id={id} aria-label={ariaLabel} className={classes}>
        {children}
      </span>
    );
  }

  if (tag === "a") {
    // Same convention already used in Footer's link columns: only genuinely
    // external URLs need a plain <a> (for target/rel); same-page hash
    // anchors and internal routes go through next/link.
    if (href?.startsWith("http")) {
      return (
        <a id={id} href={href} target={target} rel={rel} onClick={onClick} aria-label={ariaLabel} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link id={id} href={href ?? "#"} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button id={id} type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
