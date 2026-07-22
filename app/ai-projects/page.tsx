import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ai Projects",
};

export default function AiProjectsPage() {
  return (
    <section className="bg-bg px-8 pt-[140px] pb-32 md:pt-[160px] md:pb-40">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mb-4 text-xs tracking-[0.1em] text-fg-secondary uppercase">Ai Projects</p>
        <h1 className="mb-6 text-[32px] font-bold tracking-[-0.03em] text-fg md:text-[clamp(32px,5vw,56px)]">
          Coming soon.
        </h1>
        <p className="mx-auto max-w-[480px] text-base leading-[1.6] text-fg-secondary">
          I&apos;m putting together a collection of AI-related experiments and case studies. Check back shortly.
        </p>
      </div>
    </section>
  );
}
