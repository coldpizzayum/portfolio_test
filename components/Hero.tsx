import Link from "next/link";
import type { CSSProperties } from "react";

interface FanCard {
  key: string;
  bg: string;
  rotation: number;
  href: string;
  title: string;
  description: string;
  cta: string;
  isPhoto?: boolean;
}

const FAN_CARDS: FanCard[] = [
  {
    key: "work",
    bg: "bg-card-sand",
    rotation: 6.5,
    href: "/works",
    title: "Recent work",
    description:
      "My career's mostly in blockchain and Web3. I take complex tech problems and turn them into something people actually understand and like.",
    cta: "Recent case studies",
  },
  {
    key: "photo",
    bg: "bg-card-photo",
    rotation: -5,
    href: "",
    title: "",
    description: "",
    cta: "",
    isPhoto: true,
  },
  {
    key: "ai",
    bg: "bg-card-sage",
    rotation: 5,
    href: "/ai-projects",
    title: "Build with Ai",
    description: "I use AI to build prototypes and full products. Recently won a prize at the Berlin AI Builder Hackathon.",
    cta: "Projects I'm building",
  },
  {
    key: "about",
    bg: "bg-card-slate",
    rotation: -5,
    href: "/about",
    title: "About Me",
    description: "5+ years of industry experience, backed by a design education. Still just as into the craft as day one.",
    cta: "My story",
  },
];

const AUDIENCE_PILLS = ["eCom", "B2B", "FinTech", "MarTech", "Web3", "Blockchain"];

export default function Hero() {
  return (
    <section id="hero" className="px-5 pt-[90px] md:px-10 md:pt-[100px]">
      <div className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 px-7 pt-9 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:px-14 md:pt-14">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-b from-transparent to-bg" />

        <div className="relative z-[1] flex flex-col items-start gap-10">
          {/* Left: headline + sub */}
          <div className="max-w-full pb-12 md:pb-0">
            <h1 className="mb-7 font-serif text-[44px] leading-[0.94] font-bold tracking-[-0.03em] text-fg md:text-display">
              Hi, I&apos;m Yiting.
              <br />
              <span className="text-fg-secondary opacity-[0.72]">Product Designer &amp; Builder.</span>
            </h1>

            <p className="mb-5 font-serif text-base leading-[1.45] font-medium text-fg-secondary md:text-body-sm">
              5+ years in startups, from pre-seed to Series B. I turn complex ideas into lovable design, and help
              drive GTM strategy. I&apos;ve designed for:
            </p>

            <div className="flex flex-wrap gap-2">
              {AUDIENCE_PILLS.map((pill) => (
                <Link
                  key={pill}
                  href="#works"
                  className="inline-flex items-center rounded-full bg-white px-4 py-1.5 font-serif text-[13px] font-medium text-fg-secondary shadow-[0_2px_8px_rgba(0,0,0,0.09),0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.03)] transition-transform duration-200 hover:-translate-y-px"
                >
                  {pill}
                </Link>
              ))}
            </div>
          </div>

          {/* Fanned card deck */}
          <div className="relative hidden h-[340px] w-full items-center md:flex">
            {FAN_CARDS.map((card, index) => (
              <div
                key={card.key}
                className="relative flex h-[310px] w-[280px] flex-shrink-0 items-center justify-center -mr-7 last:mr-0 hover:z-10"
                style={{ zIndex: FAN_CARDS.length - index }}
              >
                {card.isPhoto ? (
                  <div
                    className={`fan-card-rotate relative h-[286px] w-[256px] overflow-hidden rounded-[20px] shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(16,24,40,0.14),0_0_0_1px_rgba(0,0,0,0.05)] ${card.bg}`}
                    style={{ "--rotate": `${card.rotation}deg` } as CSSProperties}
                  >
                    <video
                      src="/videos/self-intro.mp4"
                      poster="/images/self-intro-poster.jpg"
                      controls
                      playsInline
                      preload="none"
                      aria-label="Yiting Huang — self intro"
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                  </div>
                ) : (
                  <Link
                    href={card.href}
                    aria-label={card.title}
                    className={`fan-card-rotate relative flex h-[286px] w-[256px] flex-col justify-between overflow-hidden rounded-[20px] p-6 pt-6 pb-7 shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(16,24,40,0.14),0_0_0_1px_rgba(0,0,0,0.05)] ${card.bg}`}
                    style={{ "--rotate": `${card.rotation}deg` } as CSSProperties}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/24 to-[60%] to-transparent" />
                    <div className="relative space-y-3">
                      <h2 className="text-h3 tracking-[-0.03em] text-fg">{card.title}</h2>
                      <p className="text-caption text-fg">{card.description}</p>
                    </div>
                    <span className="relative inline-flex w-fit items-center gap-1.5 rounded-lg border border-fg bg-fg px-3.5 py-2.5 text-[13px] font-semibold text-white transition-opacity duration-200 hover:opacity-75">
                      {card.cta}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
