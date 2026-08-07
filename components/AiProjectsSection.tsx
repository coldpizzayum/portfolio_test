import ActivityHeatmap from "@/components/ActivityHeatmap";

const GITHUB_URL = "https://github.com/coldpizzayum";

interface AiProjectsSectionProps {
  /** Heading tag to render — pages should only have one h1, so callers embedding
   *  this section below their own h1 (e.g. the homepage) should pass "h2". */
  headingAs?: "h1" | "h2";
}

export default function AiProjectsSection({ headingAs = "h1" }: AiProjectsSectionProps) {
  const Heading = headingAs;

  return (
    <section className="px-5 py-10 md:px-10 md:py-15">
      <div className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:p-14">
        <div className="relative z-[1] mx-auto max-w-[720px] text-center">
          <Heading className="mb-6 font-serif text-[40px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:text-h1">
            I work with AI to&hellip;
            <br />
            build prototype
          </Heading>
          <p className="mb-8 text-body-sm text-fg">
            I use AI to build fast, from prototype to real product, with real users. I&apos;m always exploring how AI
            can change how I work. I recently won a prize at the Berlin AI Builders Hackathon.
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#activity"
              className="inline-flex items-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-[#333333]"
            >
              AI Project
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="relative z-[1] mt-12">
          <ActivityHeatmap />
        </div>
      </div>
    </section>
  );
}
