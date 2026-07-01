import { Reveal } from "./Reveal";

const ABOUT_DETAILS = [
  { label: "Location", value: "Berlin, Germany" },
  { label: "Experience", value: "5+ years" },
  { label: "Domains", value: "Web3 · B2B SaaS · eCommerce" },
  { label: "Tools", value: "Figma · Maze · Notion" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-alt py-20 md:py-30">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="mb-16">
          <p className="mb-4 text-xs tracking-[0.1em] text-fg-secondary uppercase">Background</p>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-fg md:text-[clamp(28px,4vw,44px)]">
            About me
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_1.8fr] md:gap-30">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-border">
              <svg viewBox="0 0 400 533" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
                <rect width="400" height="533" fill="#E2DFDA" />
                <line x1="0" y1="0" x2="400" y2="533" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="80" x2="400" y2="613" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="160" x2="400" y2="693" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="240" x2="400" y2="773" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="320" x2="400" y2="853" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="400" x2="400" y2="933" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="480" x2="400" y2="1013" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="-80" x2="400" y2="453" stroke="#CCC9C4" strokeWidth="1.5" />
                <line x1="0" y1="-160" x2="400" y2="373" stroke="#CCC9C4" strokeWidth="1.5" />
                <text x="200" y="258" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#9A9591">
                  portrait photo
                </text>
                <text x="200" y="276" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#B5B0AC">
                  3:4 ratio
                </text>
              </svg>
              <span className="absolute bottom-4 left-4 rounded-sm bg-[rgba(247,245,242,0.85)] px-2 py-1 font-mono text-[11px] text-fg-secondary">
                portrait photo
              </span>
            </div>
          </Reveal>

          <Reveal className="pt-4" delay={0.1}>
            <p className="mb-6 text-[17px] leading-[1.7] text-fg md:text-[clamp(17px,2vw,20px)]">
              I&apos;m a Product Designer based in Berlin with over five years of experience designing digital
              products that people genuinely enjoy using. My work spans Web3, B2B SaaS, and eCommerce — always
              centred on the intersection of clear thinking, visual craft, and user empathy.
            </p>
            <p className="mb-6 text-[17px] leading-[1.7] text-fg md:text-[clamp(17px,2vw,20px)]">
              I believe great design is quiet. It doesn&apos;t shout — it makes complex things feel obvious, and
              ordinary interactions feel considered. I work closely with engineers and product managers to bring
              ideas from messy ambiguity to shipped reality.
            </p>
            <p className="mb-6 text-base leading-[1.7] text-fg-secondary">
              When I&apos;m not at my desk I&apos;m wandering Berlin&apos;s flea markets, hunting for mid-century
              furniture, or exploring a new country with an embarrassingly full camera roll.
            </p>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {ABOUT_DETAILS.map((detail) => (
                <div key={detail.label}>
                  <p className="mb-1.5 text-[11px] tracking-[0.1em] text-fg-secondary uppercase">{detail.label}</p>
                  <p className="text-[15px] font-medium text-fg">{detail.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
