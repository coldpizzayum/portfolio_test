import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ai Projects",
};

export default function AiProjectsPage() {
  return (
    <section className="bg-bg px-8 pt-[140px] pb-32 md:pt-[160px] md:pb-40">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mb-4 font-serif text-caption tracking-[0.1em] text-fg-secondary uppercase">Ai Projects</p>
        <h1 className="mb-6 font-serif text-[32px] font-bold tracking-[-0.03em] text-fg md:text-h1">Coming soon.</h1>
        <p className="mx-auto max-w-[480px] font-serif text-body-sm text-fg-secondary md:text-body">
          I&apos;m putting together a collection of AI-related experiments and case studies. Check back shortly.
        </p>
      </div>
    </section>
  );
}
