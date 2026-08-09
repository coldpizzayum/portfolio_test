import type { ReactNode } from "react";

/**
 * Small pill label used for tags — case study topics (CaseStudyView) and
 * work-card categories (WorkCard). Used to be hand-rolled slightly
 * differently in each place (px-3/py-1 vs px-3.5/py-1.5, no font-weight vs
 * font-medium); this is the CaseStudyView spec, picked as canonical since
 * medium weight reads better at this size (text-xs, 12px).
 */
export default function TagChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg-secondary">
      {children}
    </span>
  );
}
