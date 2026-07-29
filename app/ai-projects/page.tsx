import type { Metadata } from "next";
import AiProjectsSection from "@/components/AiProjectsSection";

export const metadata: Metadata = {
  title: "Ai Projects",
};

export default function AiProjectsPage() {
  return <AiProjectsSection />;
}
