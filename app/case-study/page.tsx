import type { Metadata } from "next";
import { workItems } from "@/data/caseStudies";
import GlassCard from "@/components/GlassCard";
import CaseStudyIndex from "@/components/CaseStudyIndex";

const DESCRIPTION = "I'm passionate about crafting experiences that are engaging, accessible, and user-centric.";

export const metadata: Metadata = {
  title: "Case Study",
  description: DESCRIPTION,
  // openGraph/twitter here shallow-replace layout.tsx's (not deep-merge),
  // so image/card have to be restated per page — see app/page.tsx's
  // comment on the same pattern.
  openGraph: {
    description: DESCRIPTION,
    images: [{ url: "/images/summary_large_image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    images: ["/images/summary_large_image.png"],
  },
};

export default function CaseStudyIndexPage() {
  return (
    <section className="px-shell pt-hero-top pb-section md:px-shell-lg md:pt-hero-top-lg md:pb-section-lg">
      <GlassCard>
        <h1 className="mb-3 text-h2 tracking-[-0.03em] text-fg">Case Study</h1>
        <p className="mb-8 max-w-[560px] text-body-sm text-fg">{DESCRIPTION}</p>
        <CaseStudyIndex items={workItems} />
      </GlassCard>
    </section>
  );
}
