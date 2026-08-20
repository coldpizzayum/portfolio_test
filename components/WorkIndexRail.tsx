"use client";

import { useEffect, useState } from "react";

interface RailItem {
  id: string;
  label: string;
}

// Plain sequence number shown in the rail pill, one per work item in order
// (not a year). Fixed array, not derived from data, and paired with
// `workItems` in data/caseStudies.ts by *position*, not by id — the two
// arrays must stay in the same order. Add an entry here (and to workItems)
// if a 4th work item is ever added.
const RAIL_LABELS = ["1", "2", "3"];

export default function WorkIndexRail({ items }: { items: RailItem[] }) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-32 hidden self-start md:flex md:w-14 md:flex-col md:items-center md:gap-2">
      {items.map((item, index) => (
        // Asymmetric on purpose: selected (current section) only changes
        // text color, no circle fill; only the *unselected* items get a
        // filled circle + text color change on hover. hover:bg-bg-alt —
        // same sitewide hover-color group as Button's third variant /
        // JourneyTimeline's accordion rows / CaseStudySideNav's TOC links /
        // Header's NavPills (see Button.tsx for the group's reasoning).
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-label={item.label}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-source-sans-pro text-xs font-medium transition-colors duration-300 ${
            activeId === item.id ? "text-fg" : "text-fg-secondary hover:bg-bg-alt hover:text-fg"
          }`}
        >
          {RAIL_LABELS[index] ?? String(index + 1)}
        </a>
      ))}
    </div>
  );
}
