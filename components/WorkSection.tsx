import { workItems } from "@/data/caseStudies";
import { Reveal, RevealGroup } from "./Reveal";
import WorkCard from "./WorkCard";
import WorkIndexRail from "./WorkIndexRail";

const ACCENT_BACKGROUNDS = ["bg-card-sand", "bg-card-salmon", "bg-card-jade"];

export default function WorkSection() {
  const railItems = workItems.map((item, index) => ({
    id: `work-${item.slug}`,
    label: item.title,
    index,
  }));

  return (
    <section id="works" className="bg-bg py-section md:py-section-lg">
      <div className="mx-auto max-w-[1200px] px-shell md:px-shell-lg">
        <Reveal>
          {/* mb-10 (40px), not --spacing-heading-gap-h2's 12px
              (mb-heading-gap-h2) — a deliberate one-off choice to read
              differently from every other h2 sitewide. Not a bug; don't
              "fix" it back to the shared token. */}
          <h2 className="mb-10 text-h2 tracking-[-0.03em] text-fg">
            Selected works
          </h2>
        </Reveal>

        <div className="md:flex md:items-start md:gap-8">
          <WorkIndexRail items={railItems} />

          <RevealGroup className="flex flex-1 flex-col gap-6 md:gap-28" stagger={0.12}>
            {workItems.map((item, index) => (
              <WorkCard
                key={item.slug}
                item={item}
                reversed={index % 2 === 1}
                accentBg={ACCENT_BACKGROUNDS[index % ACCENT_BACKGROUNDS.length]}
                id={`work-${item.slug}`}
              />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
