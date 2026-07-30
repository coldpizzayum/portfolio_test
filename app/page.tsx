import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutTeaser from "@/components/AboutTeaser";
import AiProjectsSection from "@/components/AiProjectsSection";
import WorkSection from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const DESCRIPTION =
  "Berlin-based Product Designer with 5 years designing 0-to-1 products, design systems and user research for FinTech, B2B SaaS startups. I code and build with AI.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  openGraph: { description: DESCRIPTION },
  twitter: { description: DESCRIPTION },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AiProjectsSection headingAs="h2" />
      <WorkSection />
      <TestimonialsSection />
      <AboutTeaser />
    </>
  );
}
