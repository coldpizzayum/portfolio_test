"use client";

import Button from "./Button";
import { trackEvent } from "@/lib/analytics";

/** Client wrapper so the server-rendered WorkCard can fire the
 *  case_study_click event without becoming a client component itself. */
export default function CaseStudyLinkButton({ href, caseStudy, className }: { href: string; caseStudy: string; className?: string }) {
  return (
    <Button href={href} className={className} onClick={() => trackEvent("case_study_click", { case_study: caseStudy })}>
      Read case study
    </Button>
  );
}
