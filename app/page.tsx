import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <hr className="border-t border-border" />
      <WorkSection />
      <hr className="border-t border-border" />
      <AboutSection />
      <hr className="border-t border-border" />
      <TestimonialsSection />
      <hr className="border-t border-border" />
      <ContactSection />
    </>
  );
}
