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
    dateRange: "11/2025 – Present | Berlin, Germany",
    title: "Product Designer & Builder, Freelance",
    description: "I've been traveling around Europe, and along the way, learning to build products with AI.",
    bullets: [
      "Built an AI inventory management system for a metal manufacturer.",
      'Won "Best Use of AskNews API" at the Berlin AI Builders Hackathon.',
    ],
  },
  {
    dateRange: "03/2023 – 03/2025 | Taipei, Taiwan",
    title: "Founding Product Designer, Growing3",
    description:
      "As the first designer at a pre-seed startup, I established the product design and research foundation from scratch.",
    bullets: [
      "Designed the first MVP of their Web3 marketing product",
      "Built the design system and improved UX consistency",
      "Ran prototypes and user research to uncover new business opportunities",
    ],
  },
  {
    dateRange: "03/2023 – 03/2025 | Taipei, Taiwan",
    title: "UXUI Designer, CoolBitX",
    description:
      "As a UX/UI Designer at a Series B startup, I supported their global expansion into the EU, Japan, Korea, and South America.",
    bullets: [
      "Introduced Hotjar and A/B testing to improve eCommerce performance",
      "Localized the eCommerce and product experience for different markets",
      "Built a comprehensive visual design system across different channels",
      "Grew monthly ecommerce traffic from 20K to 50K and drove 4x revenue growth in the first year after launching",
    ],
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
    <section className="px-shell py-section md:px-shell-lg md:py-section-lg">
      <Reveal>
        <GlassCard>
        <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <div className="md:max-w-[300px] md:shrink-0 md:self-start">
            <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">
              My journey
            </h2>
            <p className="mb-7 text-body-sm text-fg">
              I&apos;m a Product Designer from Taiwan 🇹🇼. Now based in Berlin 🇩🇪.
            </p>
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
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="-mx-3 flex w-[calc(100%+24px)] cursor-pointer items-center gap-4 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-bg-alt"
                    >
                      <span className="min-w-0 flex-1">
                        <p className="text-caption text-fg">{entry.dateRange}</p>
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
