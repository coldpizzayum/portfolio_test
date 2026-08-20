"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "AI Projects", href: "/ai-projects" },
  { label: "About Me", href: "/about" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/yiting1995/";

const PILL_SURFACE =
  "rounded-full bg-[rgba(255,253,250,0.78)] shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-[16px]";

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M3 4a2 2 0 0 0-2 2v.01L10 13l9-6.99V6a2 2 0 0 0-2-2H3Z" />
      <path d="M18 8.118l-8 6.222-8-6.222V16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.001-4.124 2.062 2.062 0 0 1 .001 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

/**
 * The pill nav track, with two independent sliding indicators — mirrors
 * benshih.design's nav, adapted to this site's tokens instead of copying
 * its literal class names:
 *
 * - A persistent `bg-cta` pill always marks the current page, whether or
 *   not anything is hovered.
 * - A separate `bg-bg-alt` pill only shows while hovering, and slides to
 *   follow whichever item the cursor is over (hidden again once the cursor
 *   leaves the nav, or lands back on the active item itself — no point
 *   drawing a second pill on top of the first there).
 *
 * Two pills, not one recolored pill: `bg-bg-alt` is the same hover color
 * this site already uses on Button's third variant / JourneyTimeline's
 * accordion / CaseStudySideNav's TOC links, so hover here should read as
 * that same color, while the active page keeps its own distinct `bg-cta`
 * regardless of what's being hovered. Making the hover color itself the
 * thing that slides (instead of a static background on each `<a>`) also
 * avoids a real stacking conflict: a link's own opaque background would
 * sit above (z-10) and fully hide a differently-styled pill sliding
 * underneath it.
 *
 * Rendered twice by Header — once for mobile, once for desktop — each as
 * its own independent instance with its own indicator measurements, since
 * a single shared instance can't correctly track two separate DOM
 * positions at once.
 */
function NavPills({ className }: { className: string }) {
  const pathname = usePathname();
  const activeHref = NAV_LINKS.find((l) => pathname === l.href || pathname.startsWith(`${l.href}/`))?.href ?? null;

  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [activeIndicator, setActiveIndicator] = useState<{ left: number; width: number } | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [hoverIndicator, setHoverIndicator] = useState<{ left: number; width: number } | null>(null);

  const measure = (href: string | null) => {
    const track = trackRef.current;
    const link = href ? linkRefs.current.get(href) : null;
    if (!track || !link) return null;
    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    return { left: linkRect.left - trackRect.left, width: linkRect.width };
  };

  useEffect(() => {
    setActiveIndicator(measure(activeHref));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref]);

  useEffect(() => {
    setHoverIndicator(hoveredHref && hoveredHref !== activeHref ? measure(hoveredHref) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredHref, activeHref]);

  return (
    <nav className={`${PILL_SURFACE} ${className}`}>
      {/* onMouseLeave lives on the track, not on individual links — moving
          from one link to another inside the nav shouldn't hide the hover
          pill in between; only leaving the nav entirely should. */}
      <div ref={trackRef} onMouseLeave={() => setHoveredHref(null)} className="relative flex items-center gap-0 p-1">
        {activeIndicator && (
          <div
            className="pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full bg-cta transition-[left,width] duration-[280ms] ease-[cubic-bezier(0.34,1.2,0.64,1)]"
            style={{ left: activeIndicator.left, width: activeIndicator.width }}
          />
        )}
        {hoverIndicator && (
          <div
            className="pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full bg-bg-alt transition-[left,width] duration-[280ms] ease-[cubic-bezier(0.34,1.2,0.64,1)]"
            style={{ left: hoverIndicator.left, width: hoverIndicator.width }}
          />
        )}
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linkRefs.current.set(link.href, el);
            }}
            onMouseEnter={() => setHoveredHref(link.href)}
            className="relative z-10 inline-flex items-center whitespace-nowrap rounded-full px-[18px] py-1.5 text-sm font-medium text-fg transition-colors duration-[180ms]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function Header() {
  return (
    // pt-10 (40px) is a deliberate 2x of the shared --spacing-section token
    // (20px, pt-section) — Header has no responsive md: variant for this
    // padding, so the doubled value stays flat across breakpoints too.
    <div className="px-shell pt-10 md:px-shell-lg">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between gap-3 md:contents">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5 text-fg">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-card-salmon transition-transform duration-300 group-hover:scale-110">
              <Image src="/images/yiting_pixelart.png" alt="" fill sizes="40px" className="object-cover object-top" />
            </span>
            {/* group-hover:text-fg-hover on the logo text is its own
                one-off hover color — not part of the bg-bg-alt hover group
                used elsewhere in this file. */}
            <span className="font-serif text-[20px] font-bold tracking-tight whitespace-nowrap transition-colors duration-[180ms] group-hover:text-fg-hover">
              Yiting H.
            </span>
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <Button href={LINKEDIN_URL} target="_blank" rel="noreferrer" variant="secondary" square ariaLabel="LinkedIn">
              <LinkedInIcon />
            </Button>
            <Button href="/#contact" variant="secondary">
              <EnvelopeIcon />
              Say Hello
            </Button>
          </div>
        </div>

        {/* Mobile: its own independently fixed instance, pinned to the bottom
           of the screen (clear of the iOS home-indicator safe area). */}
        <NavPills className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 z-[100] flex -translate-x-1/2 items-center px-2 py-1 md:hidden" />

        {/* Desktop: its own independently fixed, top-centered instance.
            top-10 is doubled the same way pt-section→pt-10 was on the
            wrapper below, so the pill sits proportionally the same
            distance below the page's top padding. */}
        <NavPills className="fixed top-10 left-1/2 z-[100] hidden -translate-x-1/2 items-center px-2 py-1 md:flex" />

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Button href={LINKEDIN_URL} target="_blank" rel="noreferrer" variant="secondary" square ariaLabel="LinkedIn">
            <LinkedInIcon />
          </Button>
          <Button href="/#contact" variant="secondary">
            <EnvelopeIcon />
            Say Hello
          </Button>
        </div>
      </div>
    </div>
  );
}
