"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONTACT_EMAIL = "yitinghuang.design@gmail.com";
const CAL_URL = "https://cal.com/yiting-huang";
const LINKEDIN_URL = "https://www.linkedin.com/in/yiting1995/";
const RESUME_URL = "https://drive.google.com/file/d/1KM6TpI6lt9DeF4MrBPkeSC7PpCNzwrxZ/view?usp=sharing";
const GITHUB_URL = "https://github.com/coldpizzayum";

const LINK_COLUMNS = [
  {
    heading: "Links",
    items: [
      { label: "Resume", href: RESUME_URL },
      { label: "LinkedIn", href: LINKEDIN_URL },
      { label: "GitHub", href: GITHUB_URL },
    ],
  },
  {
    heading: "Nav.",
    items: [
      { label: "Works", href: "/#works" },
      { label: "AI Projects", href: "/ai-projects" },
      { label: "About Me", href: "/about" },
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
    <footer id="contact" className="bg-bg py-16 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-14 px-8 md:flex-row">
        <div>
          <h2 className="mb-5 font-serif text-h1 text-fg">Let&apos;s connect!</h2>
          <p className="mb-5 max-w-[480px] text-body-sm text-fg">
            I enjoy building cool products with cool humans, and wearing different hats to ship the best product. I
            don&apos;t like to be limited by the label &quot;Designer.&quot; :)
          </p>
          <p className="mb-8 max-w-[480px] text-body-sm text-fg">
            I&apos;m a bit shy, but I&apos;m always excited to learn about new ideas.
          </p>

          <div className="mb-6 flex flex-wrap gap-3">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] bg-fg px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-[#333333]"
            >
              Schedule a chat
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-[4px] border border-border px-7 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg"
            >
              <CopyIcon />
              {copied ? "Copied!" : "Copy my email"}
            </button>
          </div>

          <p className="text-[13px] font-semibold text-fg-secondary">
            Berlin <BerlinClock />
          </p>
        </div>

        <div className="flex gap-16">
          {LINK_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-4 font-serif text-h3 text-fg">{column.heading}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("http") ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] text-fg-secondary underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-fg"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[13px] text-fg-secondary underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-[1200px] px-8 text-[13px] text-fg-secondary">
        © 2026 Yiting Huang. All rights reserved.
      </p>
    </footer>
  );
}
