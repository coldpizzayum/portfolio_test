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

export default function CaseStudySideNav({ sections, extraItem }: CaseStudySideNavProps) {
  const items: NavItem[] = extraItem ? [...sections, extraItem] : sections;
  const [activeId, setActiveId] = useState(items[0]?.id);

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

  return (
    <aside className="sticky top-[90px] hidden w-[200px] flex-shrink-0 md:block">
      <p className="mb-4 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">On This Page</p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-md px-2.5 py-1.5 text-[13px] leading-[1.4] transition-colors duration-300 ${
                activeId === item.id ? "bg-bg-alt text-fg" : "text-fg-secondary hover:bg-bg-alt hover:text-fg"
              }`}
            >
              {item.navLabel}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
