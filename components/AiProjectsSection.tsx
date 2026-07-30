import ActivityHeatmap from "@/components/ActivityHeatmap";

const GITHUB_URL = "#";

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
        <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[560px]">
            <Heading className="mb-6 font-serif text-[40px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:text-h1">
              I work with AI to&hellip;
              <br />
              build prototype
            </Heading>
            <p className="mb-5 font-serif text-body-sm text-fg-secondary">
              I use AI to build fast, from prototype to real product, with real users. I&apos;m always exploring how
              AI can change how I work.
            </p>
            <p className="font-serif text-body-sm text-fg-secondary italic">
              What I&apos;ve been shipping lately - pulled from GitHub and Claude Code.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-6 md:items-end">
            <div className="flex flex-wrap gap-3">
              <a
                href="#activity"
                className="inline-flex items-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-[#333333]"
              >
                Ai Project
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-[#333333]"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-[1] mt-12">
          <ActivityHeatmap />
        </div>
      </div>
    </section>
  );
}
