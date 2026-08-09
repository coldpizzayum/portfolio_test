import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import CaseStudySideNav from "./CaseStudySideNav";
import CaseStudyBlock, { renderInline } from "./CaseStudyBlock";
import MoreCaseStudies from "./MoreCaseStudies";
import TagChip from "../TagChip";

export default function CaseStudyView({ caseStudy }: { caseStudy: CaseStudy }) {
  const otherCaseStudies = caseStudies
    .filter((cs) => cs.slug !== caseStudy.slug)
    .map((cs) => ({ slug: cs.slug, title: cs.title, description: cs.subtitle, image: cs.heroImage }));

  return (
    <>
      <div className="mx-auto max-w-[1100px] px-8">
        <header className="pt-[45px] pb-16 md:pt-[50px]">
          <Reveal>
            <h1 className="mb-4 font-serif text-4xl leading-none font-bold tracking-[-0.03em] text-fg md:text-h1">
              {caseStudy.title}
            </h1>

            <div className="mb-10 flex flex-wrap items-center gap-3">
              <p className="text-caption text-fg-secondary">{caseStudy.year}</p>
              {caseStudy.tags.map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </div>

            {caseStudy.meta && (
              <div className="mb-14 rounded-2xl bg-white p-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <div>
                    <p className="mb-2 font-serif text-h3 text-fg">Overview</p>
                    <p className="text-caption text-fg">{caseStudy.subtitle}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-serif text-h3 text-fg">My role</p>
                    <p className="text-caption text-fg">{caseStudy.meta.role}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-serif text-h3 text-fg">Team</p>
                    <div className="flex flex-col gap-1">
                      {caseStudy.meta.team.map((member) => (
                        <p key={member.initials} className="text-caption text-fg">
                          {member.label}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {caseStudy.impactStats && (
                  <div className="mt-8 rounded-xl bg-bg p-6">
                    <p className="mb-5 font-serif text-h3 text-fg">Impact Overview</p>
                    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {caseStudy.impactStats.map((stat) => (
                        <RevealItem key={stat.label} className="rounded-lg border-2 border-success bg-bg p-5">
                          <p className="mb-3 font-serif text-h3 text-fg">{stat.label}</p>
                          <p className="text-caption text-fg">{renderInline(stat.text)}</p>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>
                )}
              </div>
            )}

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-alt">
              <Image
                src={caseStudy.heroImage}
                alt={`${caseStudy.title} — hero screenshot`}
                fill
                priority
                sizes="(min-width: 1100px) 1036px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </header>
      </div>

      <CaseStudySideNav sections={caseStudy.sections} />

      {/* Narrower than the hero above (1100px) so the fixed left-side TOC
          (visible from here down) has clear room and never overlaps the
          reading column, mirroring benshih.design's layout. */}
      <div className="mx-auto max-w-[760px] px-8 pt-10">
        {/* Marks where the hero ends and section content begins — the side
            nav fades in once this scrolls out of view (see CaseStudySideNav). */}
        <div id="toc-trigger" aria-hidden="true" className="h-px" />
        <article className="min-w-0">
          {caseStudy.sections.map((section, index) => (
            <Reveal key={section.id} id={section.id} className={`scroll-mt-24 ${index === 0 ? "pt-0" : "pt-20"}`}>
              <h2 className="mb-5 font-serif text-[26px] leading-[1.1] font-bold tracking-[-0.02em] text-fg md:text-h2">
                {section.heading}
              </h2>
              {section.blocks.map((block, blockIndex) => (
                <CaseStudyBlock key={blockIndex} block={block} />
              ))}
            </Reveal>
          ))}

          <MoreCaseStudies items={otherCaseStudies} />
        </article>
      </div>
    </>
  );
}
