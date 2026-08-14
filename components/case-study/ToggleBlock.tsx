"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { renderInline } from "./CaseStudyBlock";

const EASE = [0.22, 1, 0.36, 1] as const;

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={`h-5 w-5 shrink-0 text-fg-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0 text-fg-secondary"
    >
      <circle cx="10" cy="10" r="7" />
      <path strokeLinecap="round" d="M10 9.25v4.25" />
      <circle cx="10" cy="6.75" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Rounded card disclosure, styled after the reference (benshih.design's
 * "Interested in our research process? Tap to read" toggle) but built from
 * this site's own tokens — bg-white/rounded-2xl match how every other
 * card-like block (videoGrid, feedbackGrid, image) sits on the page, and the
 * chevron/height animation are the accordion already established in
 * JourneyTimeline. No shadow, no hover state — flat by design.
 */
export default function ToggleBlock({
  id,
  summary,
  items,
  text,
}: {
  /** Makes this a jump target — set when the block is also listed as a
   *  sub-item in the side TOC (CaseStudySideNav), so the TOC link can scroll
   *  here directly. */
  id?: string;
  summary: string;
  /** Renders as a bullet list. Provide either this or `text`, not both. */
  items?: string[];
  /** Renders as a plain paragraph — for prose content instead of a list. */
  text?: string;
}) {
  const [open, setOpen] = useState(false);

  // If a TOC sub-item link points here, expand automatically — landing on a
  // collapsed card after clicking "jump to this" would otherwise show nothing.
  useEffect(() => {
    if (!id) return;
    const checkHash = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [id]);

  return (
    <div id={id} className="my-8 scroll-mt-24 overflow-hidden rounded-2xl bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="flex items-center gap-2">
          <InfoIcon />
          <span className="text-body-sm text-fg">{summary}. Tap to read</span>
        </span>
        <ChevronDownIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            {items ? (
              <ul className="list-disc space-y-1.5 px-6 pt-1 pb-5 pl-10 text-body-sm text-fg">
                {items.map((item, index) => (
                  <li key={index}>{renderInline(item)}</li>
                ))}
              </ul>
            ) : (
              <p className="px-6 pt-1 pb-5 text-body-sm text-fg">{renderInline(text ?? "")}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
