import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AiProjectsSection from "@/components/AiProjectsSection";
import WorkSection from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const DESCRIPTION =
  "Berlin-based Product Designer with 5 years designing 0-to-1 products, design systems and user research for FinTech, B2B SaaS startups. I code and build with AI.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  // Next.js shallow-replaces (not deep-merges) openGraph/twitter when a
  // page defines its own — so this has to restate images/card itself, not
  // just description, or it silently drops layout.tsx's image and
  // "summary_large_image" card (that's exactly what was live: no
  // og:image at all, and twitter:card had fallen back to "summary").
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

export default function Home() {
  return (
    <>
      <Hero />
      <AiProjectsSection />
      <WorkSection />
      <TestimonialsSection />
    </>
  );
}
