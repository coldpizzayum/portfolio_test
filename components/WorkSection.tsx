import { workItems } from "@/data/caseStudies";
import { Reveal, RevealGroup } from "./Reveal";
import WorkCard from "./WorkCard";

const ACCENT_BACKGROUNDS = ["bg-card-sand", "bg-card-salmon", "bg-card-jade"];

export default function WorkSection() {
  return (
    <section id="works" className="bg-bg py-section md:py-section-lg">
      <div className="mx-auto max-w-[1200px] px-shell md:px-shell-lg">
        <Reveal>
          {/* mb-10 directly on the h2 again — the subtitle that used to sit
              here was dropped from the latest copy pass, so this reverts to
              the documented "more room before the cards" exception (see
              design-system skill) instead of the h2→subtitle relationship
              that briefly lived here. */}
          <h2 className="mb-10 text-h2 tracking-[-0.03em] text-fg">
            Selected work
          </h2>
        </Reveal>

        {/* No wrapping flex row here anymore — that was to sit WorkIndexRail
            (removed on request) alongside this column. */}
        <RevealGroup className="flex flex-col gap-6 md:gap-20" stagger={0.12}>
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
    </section>
  );
}
