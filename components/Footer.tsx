"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import GlassCard from "./GlassCard";

const CONTACT_EMAIL = "yitinghuang.design@gmail.com";
const CAL_URL = "https://cal.com/yiting-huang";
const LINKEDIN_URL = "https://www.linkedin.com/in/yiting1995/";
const RESUME_URL = "https://drive.google.com/file/d/1KM6TpI6lt9DeF4MrBPkeSC7PpCNzwrxZ/view?usp=sharing";
const GITHUB_URL = "https://github.com/coldpizzayum";

const LINK_COLUMNS = [
  {
    heading: "Navigation",
    items: [
      { label: "AI Projects", href: "/ai-projects" },
      { label: "About Me", href: "/about" },
    ],
  },
  {
    heading: "Links",
    items: [
      { label: "Resume", href: RESUME_URL },
      { label: "LinkedIn", href: LINKEDIN_URL },
      { label: "GitHub", href: GITHUB_URL },
    ],
  },
];

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path strokeLinecap="round" d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3h-7A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H7" />
    </svg>
  );
}

function BerlinClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      const offset = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        timeZoneName: "shortOffset",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value;
      setTime(offset ? `${timeStr} ${offset}` : timeStr);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return <>{time}</>;
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="px-shell py-section md:px-shell-lg md:py-section-lg">
      <GlassCard>
        <div className="relative z-[1] flex flex-col gap-14 md:flex-row md:justify-between">
          <div>
            <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">
              Let&apos;s connect!
            </h2>
            <p className="mb-8 max-w-[480px] text-body-sm text-fg">
              I enjoy wearing different hats to ship the best product. I don&apos;t like to be limited by the label
              &quot;Designer.&quot; :) I&apos;m a bit shy, but I&apos;m always excited to learn about new ideas.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href={CAL_URL} target="_blank" rel="noreferrer">
                Schedule a chat
              </Button>
              <Button as="button" variant="third" onClick={handleCopyEmail}>
                <CopyIcon />
                {copied ? "Copied!" : "Copy my email"}
              </Button>
              <p className="text-caption font-semibold text-fg">
                Berlin <BerlinClock />
              </p>
            </div>
          </div>

          <div className="flex gap-16 md:gap-20">
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading} className="md:min-w-[140px]">
                {/* mb-4 is a deliberate local override, not the shared
                 *  --spacing-heading-gap-h4 token (mb-heading-gap-h4, 8px) —
                 *  this heading renders at text-h5 size, noticeably bigger
                 *  than a typical h4, so the h4 gap token reads as too tight
                 *  underneath it. Local override so the shared token (used
                 *  by many other h4 headings sitewide) isn't affected. */}
                <h3 className="mb-4 text-h5 tracking-[-0.01em] text-fg">{column.heading}</h3>
                <ul className="flex flex-col gap-5 text-caption">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Button
                        variant="links"
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {item.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </footer>
  );
}
