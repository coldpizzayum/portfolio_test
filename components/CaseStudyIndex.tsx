"use client";

import { useState } from "react";
import type { WorkItem } from "@/data/caseStudies";
import FilterPills from "./FilterPills";
import WorkImageCard from "./WorkImageCard";

/** Fixed taxonomy for the filter row — not derived from `workItems.tags`
 *  (those are free-form, case-study-specific labels shown as chips on each
 *  card, e.g. "Pre-seed", "AB Testing"). This list only grows when a new
 *  category is genuinely needed, same reasoning as WorkIndexRail's
 *  YEAR_LABELS: a fixed array, not something to keep in sync automatically.
 *  A category with no matching case study yet (e.g. "AI", "FinTech") just
 *  shows an empty grid when selected — that's accurate, not a bug. */
const CATEGORIES = ["AI", "B2B", "B2C", "eCommerce", "FinTech", "Data Heavy", "Blockchain & Web3"];

/**
 * Interactive filter + grid for /case-study. Split out from the page
 * itself (a server component) so `page.tsx` can keep its `export const
 * metadata` — that export isn't allowed in a "use client" file.
 */
export default function CaseStudyIndex({ items }: { items: WorkItem[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected ? items.filter((item) => item.tags.includes(selected)) : items;

  return (
    <div className="relative z-[1]">
      <FilterPills tags={CATEGORIES} selected={selected} onSelect={setSelected} />
      {/* gap-8 on mobile too (was gap-6/24px) — with the mobile card's
          content panel now p-0 (flush, no internal padding), 24px between
          stacked cards read as too tight; bumped to match the md:gap-8
          value instead of introducing a third number. */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {filtered.map((item) => (
          <WorkImageCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
