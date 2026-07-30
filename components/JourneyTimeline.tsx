"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const RESUME_URL = "https://drive.google.com/file/d/1KM6TpI6lt9DeF4MrBPkeSC7PpCNzwrxZ/view?usp=sharing";
const EASE = [0.22, 1, 0.36, 1] as const;

interface JourneyEntry {
  dateRange: string;
  title: string;
  description: string;
  bullets?: string[];
}

const JOURNEY: JourneyEntry[] = [
  {
    dateRange: "11/2025 – Present | Berlin, Germany",
    title: "Product Designer & Builder, Freelance",
    description:
      "Working Holiday Visa in Germany,  I spent some time traveling around Europe, along the way, I freelance and built.",
    bullets: [
      "Built an AI inventory management system for a metal manufacturer.",
      'Won "Best Use of AskNews API" at AI Builders Hackathon Berlin.',
    ],
  },
  {
    dateRange: "03/2023 – 03/2025 | Taipei, Taiwan",
    title: "Founding Product Designer, Growing3",
    description:
      "Working as a founding product designer in pre-seed startup, I helped them build their first MVP, building design system, marketing, and constantly building prototype to explore business 機會",
    bullets: ["Design AD targeting platform", "Design Influencer Marketing platfrom"],
  },
  {
    dateRange: "03/2023 – 03/2025 | Taipei, Taiwan",
    title: "UXUI Designer, CoolBitX",
    description:
      "As a UXUI designer in a series B startup, I help them redesign eCom website, localize product experience and create conhensive visual design system across differenct channel.",
    bullets: ["CoolWallet Pro launch branding", "eCommerce redesign"],
  },
  {
    dateRange: "03/2023 – 03/2025 | Taipei, Taiwan",
    title: "B.S. Industrial Design, National Taiwan University of Science and Technology",
    description: "Taiwan's equivalent of a Technical University (TU), top-ranked for technology and design.",
  },
];

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={`h-4 w-4 shrink-0 text-fg-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export default function JourneyTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-5 py-10 md:px-10 md:py-15">
      <Reveal className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:p-14">
        <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:sticky md:top-32 md:max-w-[300px] md:shrink-0 md:self-start">
            <h2 className="mb-5 font-serif text-[40px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:text-h1">
              My journey
            </h2>
            <p className="mb-7 font-serif text-body-sm text-fg-secondary">
              I&apos;m a Product Designer from Taiwan 🇹🇼. Now based in Berlin 🇩🇪.
            </p>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-[#333333]"
            >
              My Resume
            </a>
          </div>

          <RevealGroup className="relative flex-1" stagger={0.12}>
            <div className="flex flex-col gap-2">
              {JOURNEY.map((entry, index) => {
                const isOpen = openIndex === index;
                return (
                  <RevealItem key={entry.title} className="py-3">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="-mx-3 flex w-[calc(100%+24px)] cursor-pointer items-center gap-4 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-bg-alt/60"
                    >
                      <span className="min-w-0 flex-1">
                        <p className="font-mono text-xs text-fg-secondary">{entry.dateRange}</p>
                        <h3 className="font-serif text-h3 text-fg">{entry.title}</h3>
                      </span>

                      <ChevronDownIcon open={isOpen} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pt-2 pb-3 font-serif text-body-sm text-fg">{entry.description}</p>
                          {entry.bullets && entry.bullets.length > 0 && (
                            <ul className="list-disc space-y-1 pb-1 pl-5 font-serif text-body-sm text-fg">
                              {entry.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </RevealItem>
                );
              })}
            </div>
          </RevealGroup>
        </div>
      </Reveal>
    </section>
  );
}
