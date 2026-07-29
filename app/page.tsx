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
      <hr className="border-t-0 border-border" />
      <TestimonialsSection />
      <hr className="border-t-0 border-border" />
      <AboutTeaser />
      <hr className="border-t-0 border-border" />
    </>
  );
}
