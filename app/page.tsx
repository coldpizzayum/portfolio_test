import Hero from "@/components/Hero";
import AboutTeaser from "@/components/AboutTeaser";
import AiProjectsSection from "@/components/AiProjectsSection";
import WorkSection from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";

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
