import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark";
type ButtonSize = "md" | "sm";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Most buttons drive their own hover state. WorkCard's is a purely
   *  decorative element inside an ancestor `<Link className="group">` — the
   *  whole card is what's actually clickable, so it needs to react to the
   *  ancestor's hover instead of its own. */
  hoverTrigger?: "self" | "group";
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

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-cta text-fg",
  secondary: "border border-border text-fg",
  dark: "bg-fg text-bg",
};

const HOVER_CLASSES: Record<ButtonVariant, { self: string; group: string }> = {
  primary: { self: "hover:opacity-85", group: "group-hover:opacity-85" },
  secondary: { self: "hover:border-fg", group: "group-hover:border-fg" },
  dark: { self: "hover:bg-fg-hover", group: "group-hover:bg-fg-hover" },
};

const TRANSITION_CLASSES: Record<ButtonVariant, string> = {
  primary: "transition-opacity duration-200",
  secondary: "transition-colors duration-300",
  dark: "transition-colors duration-300",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-7 py-3.5",
  sm: "px-6 py-2.5",
};

/**
 * Shared pill CTA — three color variants (primary coral / secondary outline
 * / dark) x two sizes (md for standalone section CTAs, sm for card-embedded
 * actions). Consolidated from what used to be hand-rolled per instance
 * across Hero/Footer/JourneyTimeline/AiProjectsSection/WorkCard, each with
 * its own slightly-off padding/font-weight/hover treatment.
 */
export default function Button({
  variant = "primary",
  size = "md",
  hoverTrigger = "self",
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
  const classes = `inline-flex w-fit items-center justify-center gap-2 rounded-full text-sm font-semibold ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${TRANSITION_CLASSES[variant]} ${HOVER_CLASSES[variant][hoverTrigger]} ${className}`;

  if (tag === "span") {
    return (
      <span id={id} className={classes}>
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
        <a id={id} href={href} target={target} rel={rel} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link id={id} href={href ?? "#"} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button id={id} type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
