import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import CaseStudySideNav from "./CaseStudySideNav";
import CaseStudyBlock from "./CaseStudyBlock";
import MoreCaseStudies from "./MoreCaseStudies";
import TagChip from "../TagChip";
import { renderInline } from "../renderInline";

/** Shared by all 3 case study pages (web3-marketing-dashboard /
 *  influencer-marketing-tool / coolwallet-pro) — token/style changes here
 *  apply to all three automatically. coolwallet-pro doesn't render the
 *  Overview/My role/Team/Impact card block below because its data has no
 *  `meta`/`impactStats`, not because of a style difference. */
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
              {/* md:w-3/5 / md:w-2/5 below — proportional split, not a fixed
                  px width, so the 60/40 ratio holds at any viewport width
                  instead of "fixed left column, right side eats whatever's
                  left." */}
              <div className="md:w-3/5 md:shrink-0">
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

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-alt md:w-2/5">
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
                    {/* mb-heading-gap-h4 — was a hardcoded mb-2 that happened
                        to equal the same 8px, now actually using the token
                        since this is a text-h4 heading. */}
                    <p className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">Overview</p>
                    <p className="text-body-sm text-fg">{caseStudy.subtitle}</p>
                  </div>
                  <div>
                    <p className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">My role</p>
                    <p className="text-body-sm text-fg">{caseStudy.meta.role}</p>
                  </div>
                  <div>
                    <p className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">Team</p>
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
                    {/* mb-heading-gap-h4 — was mb-5 (20px, the h3 tier's gap),
                        mismatched against this being a text-h4 heading like
                        its Overview/My role/Team siblings above. */}
                    <p className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">Impact Overview</p>
                    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {caseStudy.impactStats.map((stat) => (
                        <RevealItem key={stat.label} className="rounded-lg border-2 border-fg bg-bg p-5">
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
