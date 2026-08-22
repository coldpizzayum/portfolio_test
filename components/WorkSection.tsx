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
          {/* mb-heading-gap-h2 here now that there's a real subtitle right
              after it — this is the standard "h2 heading → its own content"
              relationship, not the exception it used to be back when this
              margin sat between the h2 and the work cards directly. The
              deliberate "more room before the cards" choice lives on the
              subtitle's own mb-10 below instead. */}
          <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">
            Selected works
          </h2>
          <p className="mb-10 max-w-[640px] text-body-sm text-fg">
            Over the past 5+ years, I&apos;ve worked in various areas of digital design, including front-end
            development, email, marketing, and app UI/UX.
            <br />
            I&apos;m proud to have worn many hats.
          </p>
        </Reveal>

        <div className="md:flex md:items-start md:gap-8">
          <WorkIndexRail items={railItems} />

          <RevealGroup className="flex flex-1 flex-col gap-6 md:gap-20" stagger={0.12}>
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
