import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import { renderInline } from "@/components/renderInline";

const GITHUB_URL = "https://github.com/coldpizzayum";

export default function AiProjectsSection() {
  return (
    <section className="px-shell py-section md:px-shell-lg md:py-section-lg">
      <GlassCard>
        <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[480px] shrink-0">
            <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">Build with AI</h2>
            <p className="mb-8 text-body-sm text-fg">
              I&apos;ve been using AI to go beyond prototypes and build working products myself.
              <br />
              {renderInline("Recently, I won **Best Use of AskNews API** at the Berlin AI Builders Hackathon.")}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/case-study" variant="secondary">
                AI Projects
              </Button>
              <Button href={GITHUB_URL} target="_blank" rel="noreferrer" variant="third">
                My GitHub
              </Button>
            </div>
          </div>

          {/* The real, live component directly in this slot (not a static
              teaser) — no max-w-[420px] cap on purpose, this needs real
              room for its own month grid / YEAR select / source toggle.
              min-w-0 is required here — a flex child's default min-width
              is auto, which lets it grow past its flex-basis to fit
              content instead of respecting the row's width; without it,
              ActivityHeatmap's own overflow-x-auto grid never actually
              triggers (nothing forces it narrower than its content), and
              the whole section pushes wider than the viewport instead of
              scrolling internally. */}
          <div className="w-full min-w-0 md:flex-1">
            <ActivityHeatmap background="translucent" />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
