"use client";

import { useEffect, useState } from "react";
import type { CaseStudySection } from "@/data/caseStudies";

interface NavItem {
  id: string;
  navLabel: string;
}

interface CaseStudySideNavProps {
  sections: CaseStudySection[];
  /** Trailing nav entry for content outside the section list, e.g. the "Next Up" CTA. */
  extraItem?: NavItem;
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <path strokeLinecap="round" d="M4 6h12M4 10h12M4 14h8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <path strokeLinecap="round" d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

export default function CaseStudySideNav({ sections, extraItem }: CaseStudySideNavProps) {
  const items: NavItem[] = extraItem ? [...sections, extraItem] : sections;
  const [activeId, setActiveId] = useState(items[0]?.id);
  // Always shown by default, even where it overlaps narrow content — the
  // user can collapse it to a small tab instead of it being hidden outright.
  const [isOpen, setIsOpen] = useState(true);
  // Mirrors benshih.design: hidden while still in the hero, fades in once
  // the reader scrolls past the "#toc-trigger" marker into the content.
  const [hasReachedContent, setHasReachedContent] = useState(false);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A thin trigger line just below the fixed nav, rather than a large
    // area threshold — sections in a long-form case study are often taller
    // than the viewport, so an area-based threshold could never be crossed.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-90px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, extraItem]);

  useEffect(() => {
    const trigger = document.getElementById("toc-trigger");
    if (!trigger) return;

    // Same "sentinel scrolls past the fixed nav's own offset" trick used
    // for sticky sub-navs: visible once the marker scrolls above that line,
    // hidden again if the reader scrolls back up past it.
    const observer = new IntersectionObserver(([entry]) => setHasReachedContent(!entry.isIntersecting), {
      rootMargin: "-100px 0px 0px 0px",
      threshold: 0,
    });

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  const visibilityClass = hasReachedContent
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "pointer-events-none -translate-y-2 opacity-0";

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Show on-this-page navigation"
        aria-hidden={!hasReachedContent}
        className={`fixed top-[100px] left-[48px] z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/75 text-fg shadow-[0_12px_30px_rgba(16,24,40,0.12)] backdrop-blur-sm transition-all duration-300 hover:bg-white ${visibilityClass}`}
      >
        <ListIcon />
      </button>
    );
  }

  return (
    // Pinned to the screen's left edge like benshih.design's TOC. On
    // narrower viewports this can overlap the article — that's accepted
    // here, with the toggle button above as the escape hatch.
    <aside
      aria-hidden={!hasReachedContent}
      className={`fixed top-[100px] left-[48px] z-40 w-[252px] rounded-2xl border border-border bg-white/75 p-5 shadow-[0_12px_30px_rgba(16,24,40,0.12)] backdrop-blur-sm transition-all duration-300 ${visibilityClass}`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-fg uppercase">On This Page</p>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Hide on-this-page navigation"
          className="shrink-0 text-fg-secondary transition-colors duration-300 hover:text-fg"
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="mt-3 flex flex-col gap-2 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex items-center gap-2 rounded-[10px] px-2 py-1.5 text-[15px] font-semibold transition-colors duration-300 ${
                isActive ? "bg-available/10 text-available" : "text-fg hover:bg-bg-alt hover:text-available"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-available" : "bg-transparent group-hover:bg-available/40"
                }`}
              />
              {item.navLabel}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
