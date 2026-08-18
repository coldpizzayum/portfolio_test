import ActivityHeatmap from "@/components/ActivityHeatmap";
import TextRotator from "@/components/TextRotator";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";

const GITHUB_URL = "https://github.com/coldpizzayum";
const ROTATING_WORDS = ["build prototypes", "ship real products", "brainstorm ideas"];

export default function AiProjectsSection() {
  return (
    <section className="px-shell py-section md:px-shell-lg md:py-section-lg">
      <GlassCard>
        <div className="relative z-[1] mx-auto max-w-[720px] text-center">
          <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">
            I work with AI to&hellip;
            <br />
            <TextRotator words={ROTATING_WORDS} />
          </h2>
          <p className="mb-8 text-body-sm text-fg">
            I use AI to build fast, from prototype to real product, with real users. I&apos;m always exploring how AI
            can change how I work. I recently won a prize at the Berlin AI Builders Hackathon.
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="#activity" variant="secondary">
              AI Project
            </Button>
            <Button href={GITHUB_URL} target="_blank" rel="noreferrer" variant="third">
              GitHub
            </Button>
          </div>
        </div>

        <div className="relative z-[1] mt-12">
          <ActivityHeatmap />
        </div>
      </GlassCard>
    </section>
  );
}
