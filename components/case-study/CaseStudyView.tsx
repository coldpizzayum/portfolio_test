import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";
import CaseStudySideNav from "./CaseStudySideNav";
import CaseStudyBlock from "./CaseStudyBlock";

export default function CaseStudyView({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <div className="mx-auto max-w-[1100px] px-8">
        <header className="pt-[100px] pb-16 md:pt-[120px]">
          <Link
            href="/#works"
            className="group mb-12 inline-flex items-center gap-2 text-[13px] font-medium text-fg-secondary transition-colors duration-300 hover:text-fg"
          >
            <span className="transition-[margin] duration-300 group-hover:mr-1" aria-hidden="true">
              ←
            </span>
            Back to Work
          </Link>

          <Reveal>
            <p className="mb-4 text-xs tracking-[0.1em] text-fg-secondary uppercase">{caseStudy.year}</p>
            <h1 className="mb-6 text-4xl leading-none font-bold tracking-[-0.03em] text-fg md:text-[clamp(36px,5.5vw,68px)]">
              {caseStudy.title}
            </h1>
            <p className="mb-8 max-w-[600px] text-lg leading-[1.55] text-fg-secondary md:text-[clamp(17px,2vw,22px)]">
              {caseStudy.subtitle}
            </p>

            <div className="mb-14 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg-secondary">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-14 grid w-fit grid-cols-2 overflow-hidden rounded-lg border border-border sm:grid-cols-4">
              <div className="border-r border-b border-border p-5 sm:border-b-0">
                <p className="mb-2 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">My Role</p>
                <p className="text-sm leading-[1.4] font-semibold text-fg">{caseStudy.meta.role}</p>
              </div>
              <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
                <p className="mb-2 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">Team</p>
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
              <div className="border-r border-border p-5">
                <p className="mb-2 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">Timeline</p>
                <p className="text-sm leading-[1.4] font-semibold text-fg">{caseStudy.meta.timeline}</p>
              </div>
              <div className="p-5">
                <p className="mb-2 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">Tools</p>
                <p className="text-sm leading-[1.4] font-semibold text-fg">{caseStudy.meta.tools}</p>
              </div>
            </div>

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

        <RevealGroup className="my-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
          {caseStudy.impactStats.map((stat) => (
            <RevealItem key={stat.label} className="bg-bg px-8 py-9">
              <p className="mb-3 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">{stat.label}</p>
              <p className="mb-2 text-[52px] leading-none font-bold tracking-[-0.04em] text-fg">{stat.value}</p>
              <p className="text-sm leading-[1.55] text-fg-secondary">{stat.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <hr className="border-t border-border" />

      <div className="mx-auto max-w-[1100px] px-8 pt-16">
        <div className="grid grid-cols-1 items-start gap-20 md:grid-cols-[200px_1fr]">
          <CaseStudySideNav sections={caseStudy.sections} extraItem={{ id: "next", navLabel: "Next Up" }} />

          <article className="min-w-0">
            {caseStudy.sections.map((section, index) => (
              <Reveal
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 ${index === 0 ? "pt-0" : "pt-20"}`}
              >
                <h2 className="mb-5 text-[26px] leading-[1.1] font-bold tracking-[-0.02em] text-fg md:text-[clamp(26px,3.5vw,38px)]">
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
                <p className="text-2xl font-bold tracking-[-0.02em] text-white">{caseStudy.nextCaseStudy.title}</p>
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
      </div>
    </>
  );
}
