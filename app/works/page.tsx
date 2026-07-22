import type { Metadata } from "next";
import WorkSection from "@/components/WorkSection";

export const metadata: Metadata = {
  title: "Works",
};

export default function WorksPage() {
  return (
    <div className="pt-10 md:pt-0">
      <WorkSection />
    </div>
  );
}
