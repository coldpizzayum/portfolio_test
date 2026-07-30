import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Ai Projects",
};

export default function AiProjectsPage() {
  return (
    <ComingSoon
      eyebrow="Ai Projects"
      description="I'm putting together a collection of AI-related experiments and case studies. Check back shortly."
    />
  );
}
