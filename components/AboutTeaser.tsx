import Button from "./Button";
import { Reveal } from "./Reveal";

export default function AboutTeaser() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <Reveal className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 px-7 py-9 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:px-14 md:py-14">
        <p className="relative mb-4 text-xs tracking-[0.1em] text-fg-secondary uppercase">A bit about me</p>

        <h2 className="relative mb-10 text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-accent md:mb-14 md:text-[clamp(32px,4.5vw,60px)]">
          Design is how I think.
          <br />
          I build with AI to prove it.
        </h2>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-border md:w-[320px] md:shrink-0">
            <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
              <rect width="320" height="240" fill="#E2DFDA" />
              <line x1="0" y1="0" x2="320" y2="240" stroke="#CCC9C4" strokeWidth="1.5" />
              <line x1="0" y1="60" x2="320" y2="300" stroke="#CCC9C4" strokeWidth="1.5" />
              <line x1="0" y1="120" x2="320" y2="360" stroke="#CCC9C4" strokeWidth="1.5" />
              <line x1="0" y1="-60" x2="320" y2="180" stroke="#CCC9C4" strokeWidth="1.5" />
              <line x1="0" y1="-120" x2="320" y2="120" stroke="#CCC9C4" strokeWidth="1.5" />
              <text x="160" y="115" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#9A9591">
                photo
              </text>
              <text x="160" y="132" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#B5B0AC">
                speaking / building
              </text>
            </svg>
          </div>

          <div>
            <p className="mb-7 max-w-[560px] text-[17px] leading-[1.6] text-fg md:text-[clamp(17px,1.6vw,20px)]">
              9 years shaped by design — 4 years studying industrial design, 5 years building products in the
              industry. I love figuring out what users need and making it lovable.
            </p>
            <Button href="/about" variant="primary">
              Learn More About Yiting
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
