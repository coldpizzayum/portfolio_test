"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Works", href: "/works" },
  { label: "Ai Projects", href: "/ai-projects" },
  { label: "About", href: "/about" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/yiting1995/";
const RESUME_URL = "https://drive.google.com/file/d/1XynSSZhJOwGmKKukWlngmdwRWqP6Z-9l/view";

const PILL_SURFACE =
  "rounded-full bg-[rgba(255,253,250,0.78)] shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-[16px]";

const DARK_BUTTON =
  "flex h-10 items-center justify-center rounded-lg bg-fg text-bg transition-colors duration-300 hover:bg-[#333333]";

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

function ResumeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm4.75 6a.75.75 0 0 0-1.5 0v4.19L6.03 10.47a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.5 12.19V8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Header() {
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
    <div className="fixed inset-x-0 top-5 z-[100] px-5 md:px-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between gap-3 md:contents">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 text-fg transition-colors duration-[180ms] hover:text-fg-secondary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card-sage text-[13px] font-semibold text-fg">
              YH
            </span>
            <span className="text-base font-bold tracking-tight whitespace-nowrap">Yiting Huang</span>
          </Link>

          <Link href="/#contact" className={`${DARK_BUTTON} gap-2 px-4 text-sm font-medium md:hidden`}>
            <EnvelopeIcon />
            Say Hello
          </Link>
        </div>

        <nav className={`${PILL_SURFACE} flex items-center px-2 py-1`}>
          <div ref={trackRef} className="relative flex items-center gap-0 p-1">
            {indicatorStyle && (
              <div
                className="pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full bg-fg transition-[left,width] duration-[280ms] ease-[cubic-bezier(0.34,1.2,0.64,1)]"
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
                  className={`relative z-10 inline-flex items-center whitespace-nowrap rounded-full px-[18px] py-1.5 text-sm font-medium transition-colors duration-[180ms] ${
                    isActive ? "text-bg" : "text-fg-secondary hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <a href={RESUME_URL} target="_blank" rel="noreferrer" aria-label="Resume" className={`${DARK_BUTTON} w-10`}>
            <ResumeIcon />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={`${DARK_BUTTON} w-10`}
          >
            <LinkedInIcon />
          </a>
          <Link href="/#contact" className={`${DARK_BUTTON} gap-2 px-4 text-sm font-medium`}>
            <EnvelopeIcon />
            Say Hello
          </Link>
        </div>
      </div>
    </div>
  );
}
