import Link from "next/link";
import type { CSSProperties } from "react";

interface FanCard {
  key: string;
  bg: string;
  rotation: number;
  href: string;
  title: [string, string];
  description: string;
  cta: string;
  isPhoto?: boolean;
}

const FAN_CARDS: FanCard[] = [
  {
    key: "work",
    bg: "bg-card-sand",
    rotation: 6.5,
    href: "#works",
    title: ["Selected", "Work"],
    description: "Case studies across Web3, SaaS, and commerce.",
    cta: "Read Case Studies",
  },
  {
    key: "photo",
    bg: "bg-card-photo",
    rotation: -5,
    href: "#hero",
    title: ["", ""],
    description: "",
    cta: "",
    isPhoto: true,
  },
  {
    key: "about",
    bg: "bg-card-sage",
    rotation: 5,
    href: "#about",
    title: ["About", "Me"],
    description: "Designer who thinks in systems and speaks in stories.",
    cta: "Learn More",
  },
  {
    key: "contact",
    bg: "bg-card-slate",
    rotation: -5,
    href: "#contact",
    title: ["Get In", "Touch"],
    description: "Open to roles and freelance collaborations in 2025.",
    cta: "Say Hello",
  },
];

const AUDIENCE_PILLS = [
  { label: "Web3", dot: "#6B9E85" },
  { label: "B2B SaaS", dot: "#7A8FB5" },
  { label: "eCommerce", dot: "#C97B5A" },
];

export default function Hero() {
  return (
    <section id="hero" className="px-5 pt-[90px] md:px-10 md:pt-[100px]">
      <div className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 px-7 pt-9 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:px-14 md:pt-14">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-b from-transparent to-bg" />

        <div className="relative z-[1] flex flex-col items-start gap-10">
          {/* Left: headline + sub */}
          <div className="max-w-full pb-12 md:max-w-[560px] md:pb-0">
            <h1 className="mb-7 text-[44px] leading-[0.94] font-bold tracking-[-0.03em] text-fg md:text-[clamp(44px,6.5vw,88px)]">
              Hi, I&apos;m Yiting.
              <br />
              <span className="text-fg-secondary opacity-[0.72]">Product Designer</span>
              <br />
              <span className="text-fg-secondary opacity-[0.72]">&amp; Maker.</span>
            </h1>

            <p className="mb-9 text-base leading-[1.45] font-medium text-fg-secondary md:text-[clamp(16px,1.8vw,22px)]">
              5+ years shaping digital products across{" "}
              {AUDIENCE_PILLS.map((pill) => (
                <Link
                  key={pill.label}
                  href="#works"
                  className="mr-1 mb-1 inline-flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-3 pl-2 align-middle text-[13px] font-medium text-fg-secondary shadow-[0_2px_8px_rgba(0,0,0,0.09),0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.03)] transition-transform duration-200 hover:-translate-y-px"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: pill.dot }} />
                  {pill.label}
                </Link>
              ))}
            </p>
          </div>

          {/* Fanned card deck */}
          <div className="hidden h-[380px] items-end pb-14 md:flex">
            <div className="relative flex items-center">
              {FAN_CARDS.map((card, index) => (
                <div
                  key={card.key}
                  className="relative -mr-8 h-[340px] w-[240px] flex-shrink-0 cursor-pointer last:mr-0 hover:z-10"
                  style={{ zIndex: FAN_CARDS.length - index }}
                >
                  <Link
                    href={card.href}
                    aria-label={card.isPhoto ? "Yiting Huang" : `${card.title[0]} ${card.title[1]}`}
                    className={`fan-card-rotate absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[20px] p-7 pb-8 shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(16,24,40,0.14),0_0_0_1px_rgba(0,0,0,0.05)] ${card.bg}`}
                    style={{ "--rotate": `${card.rotation}deg` } as CSSProperties}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/24 to-[60%] to-transparent" />

                    {card.isPhoto ? (
                      <svg viewBox="0 0 240 340" className="absolute inset-0 h-full w-full rounded-[20px]">
                        <rect width="240" height="340" fill="#D8D4CF" />
                        <line x1="0" y1="0" x2="240" y2="340" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="60" x2="240" y2="400" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="120" x2="240" y2="460" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="180" x2="240" y2="520" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="240" x2="240" y2="580" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="300" x2="240" y2="640" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="-60" x2="240" y2="280" stroke="#C8C4BF" strokeWidth="1.2" />
                        <line x1="0" y1="-120" x2="240" y2="220" stroke="#C8C4BF" strokeWidth="1.2" />
                        <text x="120" y="165" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#9A9591">
                          portrait photo
                        </text>
                        <text x="120" y="182" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#B0ABA7">
                          Yiting Huang
                        </text>
                      </svg>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-[28px] leading-[0.96] font-bold tracking-[-0.03em] text-fg">
                            {card.title[0]}
                            <br />
                            {card.title[1]}
                          </h2>
                          <p className="mt-2.5 text-sm leading-[1.5] font-medium text-fg-secondary">{card.description}</p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-fg bg-fg px-3.5 py-2.5 text-[13px] font-semibold text-white transition-opacity duration-200 hover:opacity-75">
                          {card.cta}
                        </span>
                      </>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
