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
    <section id="works" className="bg-bg py-5 md:py-[30px]">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="mb-10">
          <h2 className="font-serif text-[40px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:text-h1">
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
