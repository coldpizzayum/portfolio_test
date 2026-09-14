"use client";

import { useEffect, useState } from "react";
import type { CaseStudySection } from "@/data/caseStudies";

interface CaseStudySideNavProps {
  sections: CaseStudySection[];
  /** Whether to prepend a static "Overview" entry pointing at the
   *  Overview/My role/Team/Impact card in the header (only present when the
   *  case study has `meta`). */
  hasOverview?: boolean;
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

/** A section's h3 headings and toggle blocks that carry an `id` become
 *  clickable sub-items nested under it — mirrors benshih.design's TOC having
 *  sub-headings under top-level items. Derived from the section's own
 *  content instead of a separate data field, so a heading/toggle only needs
 *  its `id` set once to show up here automatically. */
function getSubItems(section: CaseStudySection) {
  return section.blocks.flatMap((block) => {
    if (block.type === "heading" && block.id) return [{ id: block.id, label: block.text }];
    if (block.type === "toggle" && block.id) return [{ id: block.id, label: block.summary }];
    return [];
  });
}

/**
 * Left-column TOC (on request, replacing an earlier fixed/floating-overlay
 * version) — a sticky sidebar, part of the page's normal two-column layout
 * (see CaseStudyView) instead of `position: fixed` chrome pinned over the
 * content. Still collapsible (on request) — closed state shrinks to a
 * small icon button instead of the full list, and since the aside's own
 * width shrinks with it, the article column next to it (flex-1) grows to
 * fill the freed space rather than leaving a blank gap. No more
 * hero-scroll-triggered fade-in though — a sidebar that's already sitting
 * in its own column doesn't need to hide itself on load the way the old
 * floating overlay did. Desktop-only (`hidden md:flex`/`hidden md:block`
 * below) — mobile has no room for a second column, and CaseStudyView
 * doesn't reserve this column's flex track below `md` either.
 */
export default function CaseStudySideNav({ sections, hasOverview }: CaseStudySideNavProps) {
  // What actually renders in the TOC: sections marked `hideFromToc` keep
  // their content/heading on the page but are left out here, and an
  // "Overview" entry (no sub-items — it isn't a CaseStudySection) is
  // prepended when there's a meta card to point it at.
  const tocItems: { id: string; navLabel: string; subItems: ReturnType<typeof getSubItems> }[] = [
    ...(hasOverview ? [{ id: "overview", navLabel: "Overview", subItems: [] }] : []),
    ...sections.filter((s) => !s.hideFromToc).map((s) => ({ id: s.id, navLabel: s.navLabel, subItems: getSubItems(s) })),
  ];

  const [activeId, setActiveId] = useState(tocItems[0]?.id);
  // Collapses to a small icon button (on request) — the aside's own width
  // shrinks with it, so the article column next to it (flex-1 in
  // CaseStudyView) grows to fill the freed space instead of leaving a
  // blank gap.
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const elements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A thin trigger line just below the fixed nav, rather than a large
    // area threshold — sections in a long-form case study are often taller
    // than the viewport, so an area-based threshold could never be crossed.
    // Only watching the elements actually listed in the TOC means a
    // `hideFromToc` section scrolling by just leaves the previous entry
    // highlighted, instead of highlighting nothing.
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
  }, [sections, hasOverview]);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Show on-this-page navigation"
        className="sticky top-24 hidden h-10 w-10 shrink-0 items-center justify-center self-start rounded-full border border-border text-fg transition-colors duration-300 hover:bg-bg-alt md:flex"
      >
        <ListIcon />
      </button>
    );
  }

  return (
    // top-24 — clears the fixed header nav the same way scroll-mt-24
    // elsewhere on this page does; self-start so it doesn't stretch to the
    // article column's full height in the parent grid.
    <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-[220px] shrink-0 self-start overflow-y-auto md:block">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-fg-secondary uppercase">On This Page</p>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Hide on-this-page navigation"
          className="shrink-0 text-fg-secondary transition-colors duration-300 hover:text-fg"
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="flex flex-col gap-2 text-sm">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          const subItems = item.subItems;
          return (
            <div key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group flex items-center gap-2 rounded-[10px] px-2 py-1.5 text-[15px] font-semibold transition-colors duration-300 ${
                  isActive ? "bg-available/10 text-available" : "text-fg hover:bg-bg-alt"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-available" : "bg-transparent"
                  }`}
                />
                {item.navLabel}
              </a>
              {subItems.length > 0 && (
                <div className="mt-1 ml-[22px] flex flex-col gap-1 border-l border-border pl-3">
                  {subItems.map((sub) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      className="rounded-[8px] px-2 py-1 text-caption text-fg transition-colors duration-300 hover:bg-bg-alt"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
