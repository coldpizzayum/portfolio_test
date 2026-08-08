import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

const DESCRIPTION =
  "A look at what I've built with AI, from rapid prototypes to shipped products, including a win at the Berlin AI Builder Hackathon.";

export const metadata: Metadata = {
  title: "AI Projects",
  description: DESCRIPTION,
  openGraph: { description: DESCRIPTION },
  twitter: { description: DESCRIPTION },
};

export default function AiProjectsPage() {
  return (
    <ComingSoon description="I'm putting together a collection of AI-related experiments and case studies. Check back shortly." />
  );
}
