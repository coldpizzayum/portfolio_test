import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Palette, Hammer, Megaphone } from "lucide-react";
import Button from "./Button";
import GlassCard from "./GlassCard";
import HeroVideoCard from "./HeroVideoCard";
import HeroTagCard, { type HeroTagCardProps } from "./HeroTagCard";

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

// Peeking photo stack, keyed by fan card — originally built for "work"
// only (on request, referenced from a "Recent work" hero card with 3
// overlapping product screenshots above it that fan out on hover), then
// reused as-is for "about" with 3 personal photos instead of case study
// covers. Rest state: hidden (opacity-0). Hover (driven by the card
// Link's own `group` class, same mechanism as its CTA button below): each
// tile fades in and slides further up/apart with a per-tile
// transition-delay, so they cascade out one after another instead of
// snapping together. Any card key not listed here just renders without a
// preview stack.
const PREVIEW_TILES: Record<string, { src: string; alt: string }[]> = {
  work: [
    { src: "/images/Web3/Web3 Console.png", alt: "" },
    { src: "/images/CoolWallet.png", alt: "" },
    { src: "/images/Influencer Marketing/Influencer Matcher.png", alt: "" },
  ],
  about: [
    { src: "/images/outside-work/kayaking.jpg", alt: "" },
    { src: "/images/outside-work/col4-top.jpg", alt: "" },
    { src: "/images/outside-work/mount-fuji.jpg", alt: "" },
  ],
};

// Hand-drawn arrow + note pointing at a specific fan card (on request,
// referenced from a screenshot: "In case you are tired of reading" with a
// sketchy curved arrow into a video-play card). Same opacity-0/
// group-hover:opacity-100 reveal as PREVIEW_TILES (see SketchNote below).
// className is the position knob — negative top lifts the note above the
// card's own rounded top edge (positive/small values sit right on/inside
// it and overlap the card face, a real bug we hit once already); but the
// intro text block right above the deck has zero gap under it at md+
// (`pb-12 md:pb-0` on the intro div, `gap-0` on their shared flex parent),
// so going too far negative reaches past the card and onto that
// paragraph instead. Nudge these by eye in the browser if a card's size
// changes.
const SKETCH_NOTES: Record<string, { text: string; className: string }> = {
  photo: { text: "In case you are tired of reading", className: "-top-6 -left-2 -rotate-2 xl:-top-8" },
  ai: { text: "Coming soon", className: "-top-6 left-4 rotate-1 xl:-top-8" },
};

function SketchNote({ text, className }: { text: string; className: string }) {
  return (
    // flex row, not stacked — the arrow continues right after the text on
    // the same line instead of wrapping onto its own line below it (which
    // is also what let the text block grow tall enough to reach the
    // paragraph above). whitespace-nowrap keeps the phrase from wrapping
    // onto 2 lines within its own width, which was also compounding the
    // height/overlap problem.
    // Hidden at rest, fades in on hover — same opacity-0/group-hover:opacity-100
    // pattern as PREVIEW_TILES above. Needs `group` on the ancestor
    // fan-card-item (not the card Link itself, since the "photo" card has
    // no Link/group wrapper at all — see fan-card-item's className).
    <div
      className={`pointer-events-none absolute z-20 flex items-start gap-1 text-available opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
    >
      <p className="font-caveat text-2xl leading-none whitespace-nowrap xl:text-3xl">{text}</p>
      {/* Open chevron arrowhead (two strokes meeting at the tip), not a
       *  filled triangle — reads as sketchier/less "clip-art", matching
       *  the reference. Curves down-right, continuing the line of the
       *  text into the card below/beside it. */}
      <svg
        viewBox="0 0 60 50"
        className="mt-1 h-8 w-10 shrink-0 xl:h-9 xl:w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4 C 20 8, 34 22, 48 40" />
        <path d="M36 33 L50 40 L42 24" />
      </svg>
    </div>
  );
}

// Referenced from creatiie.framer.website's hero — 3 rotated "sticky note"
// tags scattered around the headline (see HeroTagCard, which is
// desktop-only — see its own comment). Positions are a first guess (px
// offsets from the headline wrapper's own corners), not tuned against the
// real render yet — nudge these once there's a screenshot to check
// against.
// Hidden for now, on request — code/positions kept as-is so this is a
// one-line flip to bring them back, not a redo.
const HERO_TAGS_VISIBLE = false;

const HERO_TAGS: HeroTagCardProps[] = [
  { label: "Design", icon: Palette, badgeBg: "bg-card-sand", rotate: -10, position: "top-[-32px] left-[-16px]" },
  // Sits in the gap beside the shorter first line ("Hi, I'm Yiting.") —
  // vertically aligned with that line's own row (not poking above it),
  // since Header's fixed top-10 nav pill floats just above this whole
  // block and there isn't enough clearance to sit above the headline on
  // this side the way Design does on the left.
  { label: "Build", icon: Hammer, badgeBg: "bg-card-jade", rotate: 7, position: "top-[16px] right-[220px]" },
  // Below-left of the block, in the same left margin Design pokes into
  // above — clear of both lines' text instead of sitting mid-word.
  { label: "Market", icon: Megaphone, badgeBg: "bg-card-salmon", rotate: -6, position: "top-[145px] left-[-28px]" },
];

// Fanned/rotated deck superseded by a flat 3-up row (on request) — flip
// back to true for a one-line revert instead of redoing the deck.
const FAN_DECK_VISIBLE = false;

const FAN_CARDS: FanCard[] = [
  {
    key: "work",
    bg: "bg-card-sand",
    rotation: 6.5,
    href: "/#works",
    title: "Recent work",
    description: "I've designed B2B and B2C products, with a focus on FinTech and complex digital products.",
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
    href: "/case-study",
    title: "Build with AI",
    description: "I've been using AI to prototype, code, and build my own products.",
    cta: "Projects I'm building",
  },
  {
    key: "about",
    bg: "bg-card-mint",
    rotation: -5,
    href: "/about",
    title: "About me",
    description: "From Taiwan, now based in Berlin. Designer, builder, and dancer outside of work.",
    cta: "My story",
  },
];

// Flat 3-up row's cards — same 3 non-photo entries as FAN_CARDS (the
// "photo" self-intro video now lives as the avatar next to the headline
// instead), filtered rather than duplicated so copy stays single-sourced.
const FLAT_CARDS = FAN_CARDS.filter((card) => !card.isPhoto);

export default function Hero() {
  return (
    <section id="hero" className="px-shell pt-hero-top pb-section md:px-shell-lg md:pt-hero-top-lg md:pb-section-lg">
      <GlassCard padding="no-bottom">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-b from-transparent to-bg" />

        <div className="relative z-[1] flex flex-col items-start gap-0">
          {/* Mobile (Ben's does this too): plain stacked block, in normal
              flow above the headline, not floating.
              md+: switches to a floating badge pulled out of flow, top-right
              of the hero content, right-8 (not flush to the edge).
              hover-tilt (globals.css) needs real pointer events to fire, so
              no pointer-events-none here — same rotate-on-hover family as
              CaseStudyView's hero image. */}
          <Image
            src="/images/Based in Berlin.png"
            alt="Now based in Berlin"
            width={514}
            height={134}
            className="hover-tilt mb-4 w-[160px] md:absolute md:top-0 md:right-8 md:mb-0 md:w-[180px] lg:w-[220px]"
          />

          {/* Avatar + headline row (on request, reusing the fan deck's
              self-intro video as a circular avatar next to the headline
              instead of adding a new static photo — see HeroVideoCard's
              shape="avatar"). Stacked on mobile, side by side from md+;
              left-aligned at every size, no centering. */}
          <div className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-8">
            <HeroVideoCard bg="bg-card-photo" rotation={0} shape="avatar" />

            <div className="max-w-full pb-12 md:pb-0">
              {/* relative wrapper around the h1 itself (not a separate empty
                  sibling) — its size comes entirely from the h1's own
                  normal-flow content, so the absolutely-positioned tags
                  below resolve their top/left/right against the headline's
                  real rendered box, not a collapsed zero-size container. */}
              <div className="relative mb-7">
                <h1 className="text-h1 tracking-[-0.05em] text-fg">
                  Hi, I&apos;m Yiting.
                  <br />
                  Product Designer &amp; Builder.
                </h1>
                {HERO_TAGS_VISIBLE && HERO_TAGS.map((tag) => <HeroTagCard key={tag.label} {...tag} />)}
              </div>

              <p className="mb-8 font-source-sans-pro text-[clamp(18px,13.86px+1.10vw,28px)] leading-[1.2] font-normal text-fg">
                5+ years in startups, from pre-seed to Series B. I design, build, and market.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row md:hidden">
                <Button href="#works">Check out recent work</Button>
                <Button href="/about" variant="secondary">
                  Learn more about me
                </Button>
              </div>
            </div>
          </div>

          {/* Flat 3-up card row (on request, replacing the fanned deck's
              overlapping/rotated look below) — plain equal-width cards, no
              rotation, no overlap, no hover preview tiles/sketch notes.
              Reuses FAN_CARDS' non-photo entries so copy stays in one
              place. */}
          <div className="grid w-full grid-cols-1 gap-5 pt-4 sm:grid-cols-3 sm:gap-6">
            {FLAT_CARDS.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                aria-label={card.title}
                className={`group relative flex flex-col justify-between gap-8 overflow-hidden rounded-[20px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-hover ${card.bg}`}
              >
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/24 to-[60%] to-transparent" />
                <div className="relative">
                  <h2 className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">{card.title}</h2>
                  <p className="text-caption text-fg">{card.description}</p>
                </div>
                <Button as="span" variant="secondary" hoverTrigger="group" className="relative self-start">
                  {card.cta}
                </Button>
              </Link>
            ))}
          </div>

          {/* Fanned card deck — superseded by the flat row above (on
              request), kept disabled rather than deleted so it's a
              one-line flip back instead of a redo, same convention as
              HERO_TAGS_VISIBLE. */}
          {FAN_DECK_VISIBLE && (
          <div className="fan-card-deck relative hidden h-[340px] w-full items-center md:flex xl:h-[420px]">
            {FAN_CARDS.map((card, index) => (
              <div
                key={card.key}
                className="group fan-card-item relative flex h-[310px] w-[280px] flex-shrink-0 items-center justify-center -mr-7 last:mr-0 hover:z-10 xl:h-[386px] xl:w-[350px] xl:-mr-[40px]"
                style={{ zIndex: FAN_CARDS.length - index }}
              >
                {SKETCH_NOTES[card.key] && (
                  <SketchNote text={SKETCH_NOTES[card.key].text} className={SKETCH_NOTES[card.key].className} />
                )}
                {card.isPhoto ? (
                  <HeroVideoCard bg={card.bg} rotation={card.rotation} />
                ) : (
                  <Link
                    href={card.href}
                    aria-label={card.title}
                    className={`group fan-card-rotate relative flex h-[286px] w-[256px] flex-col justify-between rounded-[20px] p-6 pt-6 pb-7 shadow-[0_4px_16px_rgba(16,24,40,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-hover xl:h-[360px] xl:w-[320px] xl:rounded-[24px] xl:px-8 xl:pt-8 xl:pb-10 ${PREVIEW_TILES[card.key] ? "overflow-visible" : "overflow-hidden"} ${card.bg}`}
                    style={{ "--rotate": `${card.rotation}deg` } as CSSProperties}
                  >
                    {PREVIEW_TILES[card.key] && (
                      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
                        {PREVIEW_TILES[card.key].map((tile, i) => {
                          const REST = [
                            { left: 26, top: -60, z: 10 },
                            { left: 78, top: -60, z: 20 },
                            { left: 150, top: -60, z: 30 },
                          ][i];
                          // Hidden at rest (opacity-0) — only appears once the card is
                          // hovered, per explicit correction (was visible-but-tucked
                          // before, which read as "always on"). Base rotate + hover's
                          // translate/rotate/opacity are separate Tailwind transform
                          // utilities that compose onto the same element (each sets its
                          // own --tw-* var; standard Tailwind behavior, same as e.g.
                          // WorkImageCard's group-hover:scale-105) — not a conflict, just
                          // don't also set `transform` via inline style on top of these,
                          // since inline style would always win and silently kill the
                          // hover motion. left/top/zIndex below are plain position
                          // offsets instead, safe to inline. `transition` (not
                          // `transition-transform`) so opacity animates alongside the
                          // slide instead of snapping.
                          const ROTATE_HOVER = [
                            "rotate-[-6deg] group-hover:-translate-x-4 group-hover:-translate-y-9 group-hover:rotate-[-14deg]",
                            "rotate-[2deg] group-hover:-translate-y-12 group-hover:rotate-0",
                            "rotate-[8deg] group-hover:translate-x-4 group-hover:-translate-y-9 group-hover:rotate-[14deg]",
                          ][i];
                          const DELAY = ["", "delay-75", "delay-150"][i];
                          return (
                            <div
                              key={tile.src}
                              className={`absolute h-[74px] w-[100px] overflow-hidden rounded-lg border-2 border-white opacity-0 shadow-hover transition duration-500 ease-out group-hover:opacity-100 xl:h-[92px] xl:w-[124px] ${ROTATE_HOVER} ${DELAY}`}
                              style={{ left: REST.left, top: REST.top, zIndex: REST.z }}
                            >
                              <Image src={tile.src} alt={tile.alt} fill sizes="124px" className="object-cover" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/24 to-[60%] to-transparent" />
                    <div className="relative">
                      {/* mb-heading-gap-h4 lives directly on this heading,
                          not as a gap on some outer flex/space-y wrapper —
                          this card's title-to-description spacing doesn't
                          share a container with anything else that would
                          need a different gap. */}
                      <h2 className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg xl:text-[40px] xl:leading-[0.9]">{card.title}</h2>
                      <p className="text-caption text-fg xl:text-[19px] xl:leading-[1.5]">{card.description}</p>
                    </div>
                    <Button as="span" variant="secondary" hoverTrigger="group" className="relative">
                      {card.cta}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
          )}
        </div>
      </GlassCard>
    </section>
  );
}
