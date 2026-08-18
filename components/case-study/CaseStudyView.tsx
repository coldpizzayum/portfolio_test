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
      <div className="mx-auto max-w-[1100px] px-shell md:px-shell-lg">
        <header className={`pt-hero-top md:pt-hero-top-lg ${caseStudy.meta ? "pb-8" : "pb-16"}`}>
          <Reveal>
            <div className={`flex flex-col gap-10 md:flex-row md:items-center ${caseStudy.meta ? "mb-10" : ""}`}>
              <div className="md:w-[420px] md:shrink-0">
                <p className="mb-3 text-h5 text-fg-secondary">{renderInline(caseStudy.year)}</p>
                <h1 className="mb-5 text-h2 tracking-[-0.03em] text-fg">
                  {caseStudy.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  {caseStudy.tags.map((tag) => (
                    <TagChip key={tag}>{tag}</TagChip>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-alt">
                <Image
                  src={caseStudy.heroImage}
                  alt={`${caseStudy.title} — hero screenshot`}
                  fill
                  priority
                  sizes="(min-width: 768px) 620px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {caseStudy.meta && (
              <div id="overview" className="scroll-mt-24 rounded-2xl bg-white p-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <div>
                    <p className="mb-2 text-h4 tracking-[-0.01em] text-fg">Overview</p>
                    <p className="text-body-sm text-fg">{caseStudy.subtitle}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-h4 tracking-[-0.01em] text-fg">My role</p>
                    <p className="text-body-sm text-fg">{caseStudy.meta.role}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-h4 tracking-[-0.01em] text-fg">Team</p>
                    <div className="flex flex-col gap-1">
                      {caseStudy.meta.team.map((member) => (
                        <p key={member.initials} className="text-body-sm text-fg">
                          {member.label}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {caseStudy.impactStats && (
                  <div className="mt-8 rounded-xl bg-bg p-6">
                    <p className="mb-5 text-h4 tracking-[-0.01em] text-fg">Impact Overview</p>
                    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {caseStudy.impactStats.map((stat) => (
                        <RevealItem key={stat.label} className="rounded-lg border-2 border-available bg-bg p-5">
                          <p className="mb-3 text-body font-bold text-fg">
                            {stat.label}
                          </p>
                          <p className="text-body-sm text-fg">{renderInline(stat.text)}</p>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>
                )}
              </div>
            )}
          </Reveal>
        </header>
      </div>

      <CaseStudySideNav sections={caseStudy.sections} hasOverview={!!caseStudy.meta} />

      {/* Narrower than the hero above (1100px) so the fixed left-side TOC
          (visible from here down) has clear room and never overlaps the
          reading column, mirroring benshih.design's layout. */}
      <div className="mx-auto max-w-[760px] px-shell pt-10 md:px-shell-lg">
        {/* Marks where the hero ends and section content begins — the side
            nav fades in once this scrolls out of view (see CaseStudySideNav). */}
        <div id="toc-trigger" aria-hidden="true" className="h-px" />
        <article className="min-w-0">
          {caseStudy.sections.map((section, index) => (
            <Reveal
              key={section.id}
              id={section.id}
              className={`scroll-mt-24 ${index === 0 ? "pt-0" : "pt-cs-section-gap md:pt-cs-section-gap-lg"}`}
            >
              <h2 className="mb-heading-gap-h3 text-h3 tracking-[-0.02em] text-fg">
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
