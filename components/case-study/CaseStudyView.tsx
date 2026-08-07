import Image from "next/image";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import CaseStudySideNav from "./CaseStudySideNav";
import CaseStudyBlock, { renderInline } from "./CaseStudyBlock";
import MoreCaseStudies from "./MoreCaseStudies";

export default function CaseStudyView({ caseStudy }: { caseStudy: CaseStudy }) {
  const otherCaseStudies = caseStudies
    .filter((cs) => cs.slug !== caseStudy.slug)
    .map((cs) => ({ slug: cs.slug, title: cs.title, description: cs.subtitle, image: cs.heroImage }));

  return (
    <>
      <div className="mx-auto max-w-[1100px] px-8">
        <header className="pt-[45px] pb-16 md:pt-[50px]">
          <Link
            href="/#works"
            className="group mb-12 inline-flex items-center gap-2 text-links text-fg-secondary transition-colors duration-300 hover:text-fg"
          >
            <span className="transition-[margin] duration-300 group-hover:mr-1" aria-hidden="true">
              ←
            </span>
            Back to Work
          </Link>

          <Reveal>
            <h1 className="mb-4 font-serif text-4xl leading-none font-bold tracking-[-0.03em] text-fg md:text-h1">
              {caseStudy.title}
            </h1>

            <div className="mb-10 flex flex-wrap items-center gap-3">
              <p className="text-caption text-fg-secondary">{caseStudy.year}</p>
              {caseStudy.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg-secondary">
                  {tag}
                </span>
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
                        <RevealItem key={stat.label} className="rounded-lg border-2 border-[#017D18] bg-bg p-5">
                          <p className="mb-3 font-serif text-h3 text-fg">{stat.label}</p>
                          <p className="text-caption text-fg-secondary">{renderInline(stat.text)}</p>
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

      <div className="mx-auto max-w-[1100px] px-8 pt-10">
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
