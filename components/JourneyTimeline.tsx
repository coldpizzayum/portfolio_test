"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import Button from "./Button";
import GlassCard from "./GlassCard";

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
    dateRange: "2025 – Present · Berlin, Germany",
    title: "Product Designer & Builder · Freelance",
    description:
      'Recently, I\'ve been exploring how AI can be used in real products. I\'m currently designing and building an AI-powered inventory management system for a metal manufacturer. I also joined the AI Builders Hackathon in Berlin, where our team won "Best Use of AskNews API."',
  },
  {
    // 2023 – 2025 (was 03/2023 – 03/2025, copy-pasted from the CoolBitX
    // entry below it — a real bug, not a deliberate match).
    dateRange: "2023 – 2025 · Taipei, Taiwan",
    title: "Founding Product Designer · Growing3",
    description:
      "I joined Growing3 as its first designer when the company was still pre-seed. A lot of things started from scratch, from figuring out the first MVP and talking to users, to setting up the design system as the product grew. It was also where I got to work closely with the founders and turn early ideas into something we could test with real users.",
  },
  {
    // 2019 – 2022 (was 03/2023 – 03/2025, the same copy-paste bug as
    // above — this entry had Growing3's dates, not its own).
    dateRange: "2019 – 2022 · Taipei, Taiwan",
    title: "UX/UI Designer · CoolBitX",
    description:
      "CoolBitX was my first job in tech and where I learned a lot about designing for a global product. I worked across product, eCommerce, and brand as the company expanded into Europe, Japan, and Korea. I also got quite involved in the eCommerce side, introducing tools like Hotjar and A/B testing and learning how design decisions showed up in actual numbers.",
  },
  {
    // 2014 – 2018 (was 03/2023 – 03/2025, same copy-paste bug).
    dateRange: "2014 – 2018 · Taipei, Taiwan",
    title: "B.S. Industrial Design · National Taiwan University of Science and Technology",
    description:
      "I studied Industrial Design at NTUST, Taiwan's equivalent of a Technical University (TU). I was always curious about why people behave the way they do, so I also took quite a few psychology courses alongside design. That interest eventually became part of what drew me toward UX.",
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
    <section className="px-shell py-section md:px-shell-lg md:py-section-lg">
      <Reveal>
        <GlassCard>
        <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <div className="md:max-w-[300px] md:shrink-0 md:self-start">
            <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">
              My journey
            </h2>
            <Button href={RESUME_URL} target="_blank" rel="noreferrer" variant="secondary">
              My Resume
            </Button>
          </div>

          <RevealGroup className="relative flex-1" stagger={0.12}>
            <div className="flex flex-col gap-2">
              {JOURNEY.map((entry, index) => {
                const isOpen = openIndex === index;
                return (
                  <RevealItem key={entry.title} className="py-3">
                    {/* hover:bg-bg-alt — same hover-color group as NavPills /
                        Button's third variant / CaseStudySideNav's TOC links /
                        WorkIndexRail's rail items (see Button.tsx for the
                        group's reasoning); keep this shared color. */}
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="-mx-3 flex w-[calc(100%+24px)] cursor-pointer items-center gap-4 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-bg-alt"
                    >
                      <span className="min-w-0 flex-1">
                        <p className="text-caption text-fg">{entry.dateRange}</p>
                        {/* No mb-heading-gap-h4 here on purpose — this h3 is
                            the *last* element in this <span> (date text
                            comes first), not something with content stacked
                            below it, so the "heading → its own content"
                            spacing rule doesn't apply. */}
                        <h3 className="text-h4 tracking-[-0.01em] text-fg">{entry.title}</h3>
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
                          <p className="pt-2 pb-3 text-body-sm text-fg">{entry.description}</p>
                          {entry.bullets && entry.bullets.length > 0 && (
                            <ul className="list-disc space-y-1 pb-1 pl-5 text-body-sm text-fg">
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
        </GlassCard>
      </Reveal>
    </section>
  );
}
