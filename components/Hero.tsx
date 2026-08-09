import Link from "next/link";
import type { CSSProperties } from "react";
import Button from "./Button";
import GlassCard from "./GlassCard";

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
    href: "/#works",
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
    bg: "bg-card-sky",
    rotation: 5,
    href: "/ai-projects",
    title: "Build with AI",
    description: "I use AI to build prototypes and full products. Recently won a prize at the Berlin AI Builder Hackathon.",
    cta: "Projects I'm building",
  },
  {
    key: "about",
    bg: "bg-card-mint",
    rotation: -5,
    href: "/about",
    title: "About Me",
    description: "5+ years of industry experience, backed by a design education. Still just as into the craft as day one.",
    cta: "My story",
  },
];

export default function Hero() {
  return (
    <section id="hero" className="px-5 pt-[45px] pb-5 md:px-10 md:pt-[50px] md:pb-[30px]">
      <GlassCard padding="no-bottom">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-b from-transparent to-bg" />

        <div className="relative z-[1] flex flex-col items-start gap-10">
          {/* Left: headline + sub */}
          <div className="max-w-full pb-12 md:pb-0">
            <h1 className="mb-7 font-serif text-[44px] leading-[0.94] font-bold tracking-[-0.03em] text-fg md:text-display">
              Hi, I&apos;m Yiting.
              <br />
              Product Designer &amp; Builder.
            </h1>

            <p className="mb-8 text-body-sm text-fg md:text-[28px] md:leading-[1.4]">
              5+ years in startups, from pre-seed to Series B. I prototype, code, market, and ship ideas.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row md:hidden">
              <Button href="#works">Check out recent work</Button>
              <Button href="/about" variant="secondary">
                Learn more about me
              </Button>
            </div>
          </div>

          {/* Fanned card deck */}
          <div className="fan-card-deck relative hidden h-[340px] w-full items-center md:flex xl:h-[420px]">
            {FAN_CARDS.map((card, index) => (
              <div
                key={card.key}
                className="fan-card-item relative flex h-[310px] w-[280px] flex-shrink-0 items-center justify-center -mr-7 last:mr-0 hover:z-10 xl:h-[386px] xl:w-[350px] xl:-mr-[40px]"
                style={{ zIndex: FAN_CARDS.length - index }}
              >
                {card.isPhoto ? (
                  <div
                    className={`fan-card-rotate relative h-[286px] w-[256px] overflow-hidden rounded-[20px] shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-hover xl:h-[360px] xl:w-[320px] xl:rounded-[24px] ${card.bg}`}
                    style={{ "--rotate": `${card.rotation}deg` } as CSSProperties}
                  >
                    <video
                      src="/videos/self-intro.mp4"
                      poster="/images/self-intro-poster.png"
                      controls
                      playsInline
                      preload="none"
                      aria-label="Yiting Huang — self intro"
                      className="h-full w-full rounded-[20px] object-cover xl:rounded-[24px]"
                    />
                  </div>
                ) : (
                  <Link
                    href={card.href}
                    aria-label={card.title}
                    className={`fan-card-rotate relative flex h-[286px] w-[256px] flex-col justify-between overflow-hidden rounded-[20px] p-6 pt-6 pb-7 shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-hover xl:h-[360px] xl:w-[320px] xl:rounded-[24px] xl:px-8 xl:pt-8 xl:pb-10 ${card.bg}`}
                    style={{ "--rotate": `${card.rotation}deg` } as CSSProperties}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/24 to-[60%] to-transparent" />
                    <div className="relative space-y-3">
                      <h2 className="text-h3 tracking-[-0.03em] text-fg xl:text-[40px] xl:leading-[0.9]">{card.title}</h2>
                      <p className="text-caption text-fg xl:text-[19px] xl:leading-[1.5]">{card.description}</p>
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
      </GlassCard>
    </section>
  );
}
