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
 * The pill nav track (with the sliding active-page indicator). Rendered
 * twice by Header — once for mobile, once for desktop — each as its own
 * independent instance with its own indicator measurement, since a single
 * shared instance can't correctly track two separate DOM positions at once.
 */
function NavPills({ className }: { className: string }) {
  const pathname = usePathname();
  const activeHref = NAV_LINKS.find((l) => pathname === l.href || pathname.startsWith(`${l.href}/`))?.href ?? null;

  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const link = activeHref ? linkRefs.current.get(activeHref) : null;
    if (!track || !link) {
      setIndicatorStyle(null);
      return;
    }
    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicatorStyle({ left: linkRect.left - trackRect.left, width: linkRect.width });
  }, [activeHref]);

  return (
    <nav className={`${PILL_SURFACE} ${className}`}>
      <div ref={trackRef} className="relative flex items-center gap-0 p-1">
        {indicatorStyle && (
          <div
            className="pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full bg-cta transition-[left,width] duration-[280ms] ease-[cubic-bezier(0.34,1.2,0.64,1)]"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        )}
        {NAV_LINKS.map((link) => {
          const isActive = activeHref === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linkRefs.current.set(link.href, el);
              }}
              className={`relative z-10 inline-flex items-center whitespace-nowrap rounded-full px-[18px] py-1.5 text-sm font-medium text-fg transition-colors duration-[180ms] ${
                isActive ? "" : "hover:bg-bg-alt"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function Header() {
  return (
    <div className="px-shell pt-section md:px-shell-lg">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between gap-3 md:contents">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5 text-fg">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-card-salmon transition-transform duration-300 group-hover:scale-110">
              <Image src="/images/yiting_pixelart.png" alt="" fill sizes="40px" className="object-cover object-top" />
            </span>
            <span className="font-serif text-[20px] font-bold tracking-tight whitespace-nowrap transition-colors duration-[180ms] group-hover:text-fg">
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

        {/* Desktop: its own independently fixed, top-centered instance. */}
        <NavPills className="fixed top-5 left-1/2 z-[100] hidden -translate-x-1/2 items-center px-2 py-1 md:flex" />

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
