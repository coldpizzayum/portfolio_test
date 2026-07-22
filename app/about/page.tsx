import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="pt-10 md:pt-0">
      <AboutSection />
    </div>
  );
}
