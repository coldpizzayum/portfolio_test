"use client";

import { useEffect, useState } from "react";

interface RailItem {
  id: string;
  label: string;
}

// Full year shown in the rail pill, one per work item in order — matches
// the site's case studies chronologically, most recent first. Fixed array,
// not derived from data, and paired with `workItems` in data/caseStudies.ts
// by *position*, not by id — the two arrays must stay in the same order.
// Add an entry here (and to workItems) if a 4th work item is ever added.
const YEAR_LABELS = ["2025", "2024", "2023"];

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
        // filled circle (hover:bg-border) + text color change on hover.
        // hover:bg-border is its own hover-color group, separate from the
        // sitewide hover:bg-bg-alt one used elsewhere.
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-label={item.label}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-source-sans-pro text-xs font-medium transition-colors duration-300 ${
            activeId === item.id ? "text-fg" : "text-fg-secondary hover:bg-border hover:text-fg"
          }`}
        >
          {YEAR_LABELS[index] ?? String(index + 1).padStart(2, "0")}
        </a>
      ))}
    </div>
  );
}
