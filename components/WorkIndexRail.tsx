"use client";

import { useEffect, useState } from "react";

interface RailItem {
  id: string;
  label: string;
}

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
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-label={item.label}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-colors duration-300 ${
            activeId === item.id ? "bg-fg text-bg" : "text-fg-secondary hover:text-fg"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </a>
      ))}
    </div>
  );
}
