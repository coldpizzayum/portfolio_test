import { workItems } from "@/data/caseStudies";
import { Reveal, RevealGroup } from "./Reveal";
import WorkCard from "./WorkCard";

export default function WorkSection() {
  return (
    <section id="works" className="bg-bg py-20 md:py-30">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="mb-16 flex flex-wrap items-baseline justify-between gap-8">
          <div>
            <p className="mb-4 text-xs tracking-[0.1em] text-fg-secondary uppercase">Portfolio</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-fg md:text-[clamp(28px,4vw,44px)]">
              Selected Works
            </h2>
          </div>
          <a
            href="#"
            className="text-sm text-fg-secondary underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-fg"
          >
            View all projects
          </a>
        </Reveal>

        <RevealGroup className="flex flex-col gap-4" stagger={0.12}>
          {workItems.map((item, index) => (
            <WorkCard key={item.slug} item={item} reversed={index % 2 === 1} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
