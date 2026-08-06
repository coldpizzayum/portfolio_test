import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import CaseStudySideNav from "./CaseStudySideNav";
import CaseStudyBlock, { renderInline } from "./CaseStudyBlock";

export default function CaseStudyView({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <div className="mx-auto max-w-[1100px] px-8">
        <header className="pt-[140px] pb-16 md:pt-[120px]">
          <Link
            href="/#works"
            className="group mb-12 inline-flex items-center gap-2 font-serif text-links text-fg-secondary transition-colors duration-300 hover:text-fg"
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
              <p className="font-serif text-caption text-fg-secondary">{caseStudy.year}</p>
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
                    <p className="font-serif text-caption text-fg">{caseStudy.subtitle}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-serif text-h3 text-fg">My role</p>
                    <p className="font-serif text-caption text-fg">{caseStudy.meta.role}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-serif text-h3 text-fg">Team</p>
                    <div className="mt-1 flex gap-1">
                      {caseStudy.meta.team.map((member) => (
                        <div
                          key={member.initials}
                          title={member.label}
                          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ background: member.color }}
                        >
                          {member.initials}
                        </div>
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
                          <p className="font-serif text-caption text-fg-secondary">{renderInline(stat.text)}</p>
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

      <CaseStudySideNav sections={caseStudy.sections} extraItem={{ id: "next", navLabel: "Next Up" }} />

      <div className="mx-auto max-w-[1100px] px-8 pt-10">
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

          <div
            id="next"
            className="mt-20 mb-20 scroll-mt-24 flex flex-col items-start gap-8 rounded-[20px] bg-fg p-8 text-bg sm:flex-row sm:items-center sm:justify-between md:p-12"
          >
            <div>
              <p className="mb-2 text-[11px] tracking-[0.1em] text-white/50 uppercase">{caseStudy.nextCaseStudy.label}</p>
              <p className="font-serif text-h3 tracking-[-0.02em] text-white">{caseStudy.nextCaseStudy.title}</p>
            </div>
            <Link
              href={caseStudy.nextCaseStudy.href}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold whitespace-nowrap text-fg transition-opacity duration-200 hover:opacity-85"
            >
              Read Case Study →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
