export interface WorkItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  /** If set, the work card links to /case-study/[caseStudySlug]. */
  caseStudySlug?: string;
}

// Order matters: paired positionally (not by id) with WorkIndexRail's
// RAIL_LABELS array in components/WorkIndexRail.tsx. Keep both arrays in
// the same order — reordering one without the other mismatches every pill.
export const workItems: WorkItem[] = [
  {
    slug: "web3-wallet-defi-dashboard",
    title: "Building a Web3 marketing dashboard from 0 to 1",
    description:
      "Turned our audience-building algorithm into a self-serve product, letting Web3 marketers generate their own audiences and manage campaigns end to end.",
    tags: ["B2B", "Blockchain & Web3", "Data Heavy"],
    image: "/images/Web3/Web3 Console.png",
    caseStudySlug: "web3-marketing-dashboard",
  },
  {
    slug: "coolwallet-pro-rebrand",
    title: "Redesigning eCommerce for 4x revenue",
    description:
      "Redesigned a crypto wallet's eCommerce experience to support expansion into Europe, Japan, and Korea.",
    tags: ["FinTech", "eCommerce", "Blockchain & Web3", "B2C"],
    image: "/images/CoolWallet.png",
    caseStudySlug: "coolwallet-pro",
  },
  {
    slug: "influencer-marketing-management-tool",
    title: "From dashboard to plugin: streamlining influencer marketing",
    description:
      "Designed a SaaS platform and browser plugin to simplify influencer discovery and campaign workflows.",
    tags: ["B2B", "Data Heavy", "Blockchain & Web3"],
    image: "/images/Influencer Marketing/Influencer Matcher.png",
    caseStudySlug: "influencer-marketing-tool",
  },
  {
    slug: "german-learning-ai-app",
    title: "Building my own AI-powered German learning app",
    description:
      "Designed and built a mobile app that turns my German class notes into vocabulary cards and real-life scenario practice.",
    tags: ["AI"],
    image: "/images/German/Slide.png",
    caseStudySlug: "german-learning-app",
  },
];

export type CaseStudyBlock =
  | { type: "paragraph"; text: string; href?: string; linkText?: string }
  /** `id` is optional — set it to make the heading a jump target, which also
   *  surfaces it as a nested sub-item under its section in the side TOC. */
  | { type: "heading"; level: 3; text: string; id?: string }
  | { type: "bulletList"; items: string[] }
  /** A stack of individually-boxed insight cards (bold title + description),
   *  for a short list of distinct highlights that deserve more visual weight
   *  than a plain bulletList — e.g. Outcome/impact bullets. Referenced from
   *  benshih.design's case-study "customer interviews" cards, rebuilt on
   *  this site's own tokens (rounded-2xl/p-card-compact/text-h4, not Ben's
   *  raw rounded-[12px]/bg-white/60/text-xl). */
  | { type: "cardList"; items: { title: string; description: string }[] }
  /** Collapsed-by-default disclosure — a heading-style summary line that expands
   *  to a bullet list on click. Reuses the accordion pattern already established
   *  in JourneyTimeline (chevron icon, framer-motion height animation). `id` is
   *  optional, same jump-target/TOC-sub-item behavior as the heading block. */
  | { type: "toggle"; summary: string; items?: string[]; text?: string; id?: string }
  /** Click a label row to open a large lightbox (heading + body + a stack of
   *  images) — a visibly bigger, more prominent reveal than ToggleBlock's
   *  inline accordion, for the one spot on the site that wants that (see
   *  SpotlightCard.tsx). Not meant to become the default toggle treatment. */
  | {
      type: "spotlight";
      summary: string;
      heading: string;
      text: string;
      video?: { youtubeId: string; title: string };
      images: { src: string; alt: string; width: number; height: number }[];
    }
  | { type: "statRow"; stats: { value: string; label: string }[] }
  | { type: "flowList"; items: { name: string; description: string }[] }
  /** `width`/`height` are the source file's real pixel dimensions — when set,
   *  the image renders at its own aspect ratio (no cropping, no letterboxing).
   *  Omit them and it falls back to the old fixed 16:9 frame. */
  | { type: "image"; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: "videoGrid"; videos: { youtubeId: string; title: string; caption?: string }[] }
  /** A locally-hosted video file (native `<video controls>`), same
   *  white-card/aspect-video framing as videoGrid/embed. Every other video
   *  block on the site is a YouTube embed (youtubeId); this is the one
   *  exception for a video that only exists as a local file, not uploaded
   *  anywhere. Default: no autoplay/loop, a real content video the reader
   *  plays on purpose. `autoPlay` opts a specific instance into playing as
   *  soon as the page loads (native `<video autoPlay>`, no
   *  viewport-gating — that's GridVideo's job for looping background
   *  decoration, not this) — browsers only allow autoplay when muted, so
   *  this also mutes the video (controls stay on, so the reader
   *  can pause/unmute/replay). */
  | { type: "videoFile"; src: string; alt: string; caption?: string; autoPlay?: boolean }
  /** Embeds a live iframe (e.g. a Figma/FigJam board) — same aspect-video
   *  card framing as videoGrid, just without the YouTube-specific params. */
  | { type: "embed"; src: string; title: string; caption?: string }
  | {
      type: "imageCollage";
      items: { src: string; alt: string; top: string; left: string; width: string; rotate: number; z: number }[];
    }
  | {
      type: "feedbackGrid";
      cards: FeedbackCard[];
    }
  /** One GlassCard per feature — video demo one side, badge/title/description
   *  the other, sides alternating per item (see FeatureShowcase.tsx). Built
   *  for the German-learning-app case study's "product overview" section. */
  | {
      type: "featureShowcase";
      items: {
        video: string;
        title: string;
        description: string;
        accent: "sky" | "mint" | "salmon";
      }[];
    };

export interface FeedbackCard {
  /** Star rating (1-5) — presence of this field marks the card as a testimonial rather than a press mention. */
  rating?: number;
  eyebrow?: string;
  /** Supports `==highlight==` (coral) in addition to `**bold**`. */
  headline?: string;
  /** Supports `**bold**` markdown-style spans. */
  quote?: string;
  photo?: string;
  photoAlt?: string;
  name?: string;
  role?: string;
  date?: string;
  href?: string;
  /** Id into `data/testimonials.ts`'s `testimonials` array — when set, this
   *  card's quote/rating/attribution are sourced from that entry (via the
   *  shared `QuoteCardContent` component) instead of the fields above, so
   *  the same real quote isn't duplicated in two data files. Currently only
   *  the web3-marketing-dashboard's first Customer Review card uses this
   *  (linked to the "vincent" testimonial — same PrismX PM quote shown on
   *  the homepage). */
  testimonialId?: string;
}

export interface CaseStudySection {
  id: string;
  navLabel: string;
  heading: string;
  blocks: CaseStudyBlock[];
  /** Keeps the section's content/heading in place but leaves it out of the
   *  side TOC — for sections that don't map to one of the TOC's top-level
   *  labels. The TOC's active-highlight simply stays on the previous visible
   *  entry while scrolling through it. */
  hideFromToc?: boolean;
  /** Skips rendering the section's own <h2> — for a section whose block
   *  content (e.g. FeatureShowcase) doesn't need a heading repeated above
   *  it. `heading` is still required/kept (the TOC still uses `navLabel`,
   *  not this) so nothing downstream that might read `heading` breaks. */
  hideHeading?: boolean;
}

export interface CaseStudyMeta {
  role: string;
  team: { initials: string; label: string }[];
  timeline: string;
  tools: string;
}

export interface ImpactStat {
  label: string;
  /** One sentence, supports `**bold**` for the embedded number/stat. Optional —
   *  omit when every stat shares the same context, and set that shared context
   *  once via `CaseStudy.impactStatsNote` instead of repeating it per card. */
  text?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  subtitle: string;
  /** SEO meta/OG/Twitter description — falls back to `subtitle` when not set. */
  metaDescription?: string;
  tags: string[];
  heroImage: string;
  /** Not every case study has a role/team/timeline meta grid or top-line impact stats. */
  meta?: CaseStudyMeta;
  impactStats?: ImpactStat[];
  /** Shown once under the "Impact Overview" heading, above the stat cards —
   *  for context that applies to every stat (e.g. a shared date range) instead
   *  of repeating the same sentence in every ImpactStat.text. Only set this
   *  when the stats truly share one context; if each stat has its own distinct
   *  note (see web3-marketing-dashboard/influencer-marketing-tool), use
   *  ImpactStat.text per-card instead. */
  impactStatsNote?: string;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "web3-marketing-dashboard",
    title: "Web3 marketing dashboard",
    year: "2023 — 2024 | **Growing3**",
    subtitle:
      "Designed a blockchain data dashboard that turns complex on-chain data into actionable marketing audiences.",
    metaDescription:
      "As Founding Product Designer for this Web3 marketing dashboard, I led MVP design from concept to launch, helping the team close a $1.2M seed round.",
    tags: ["B2B", "Pre-seed", "Data-heavy UX/UI"],
    heroImage: "/images/Web3/Web3 Console.png",
    meta: {
      role: "I led end-to-end product design, from research and user journeys to prototyping, design system, and final handoff.",
      team: [
        { initials: "PM", label: "1 Product Manager" },
        { initials: "YH", label: "Me (Product Designer)" },
        { initials: "DC", label: "1 Developer + CTO" },
      ],
      timeline: "2023 — 2024",
      tools: "Figma, Notion, ChatGPT, MidJourney",
    },
    impactStats: [
      {
        label: "$1.2M seed round",
        text: "Plus multiple angel investments.",
      },
      {
        label: "9 paid customers across 3 continents",
        text: "Including XREX and Sorare, with early adopters such as Flap, DOEX, PrismX, and Chainfir Capital.",
      },
    ],
    sections: [
      {
        id: "wallet-selector-demo",
        navLabel: "Wallet Selector",
        // hideHeading — just the video, no <h2> of its own; hideFromToc —
        // doesn't need a separate TOC entry, it's a lead-in sitting right
        // above "Problems", not a section in its own right.
        heading: "Wallet Selector demo",
        hideHeading: true,
        hideFromToc: true,
        blocks: [
          {
            type: "videoFile",
            src: "/videos/web3/wallet-selector.mp4",
            alt: "Wallet Selector walkthrough",
            autoPlay: true,
          },
        ],
      },
      {
        id: "problems",
        navLabel: "Problems",
        heading: "Turning a manual service into a scalable product",
        blocks: [
          {
            type: "paragraph",
            text: "Before the product existed, our team built audience packages manually.",
          },
          {
            type: "paragraph",
            text: "We analyzed wallet behavior, created targeting lists for each client, and handed them off to marketers to run campaigns.",
          },
          {
            type: "paragraph",
            text: "It worked — but every new customer required more manual work.",
          },
          {
            type: "paragraph",
            text: "The product challenge was to turn this service into something marketers could do themselves.",
          },
          {
            type: "image",
            src: "/images/Web3/information architecture.png",
            alt: "Information architecture diagram for the all-in-one marketing tool",
            width: 1866,
            height: 2758,
          },
          {
            type: "image",
            src: "/images/Web3/Allinonetool.png",
            alt: "Screenshot of the all-in-one marketing tool",
            width: 1440,
            height: 502,
          },
        ],
      },
      {
        id: "first-prototype",
        navLabel: "Research",
        heading: "Building the first self-serve workflow",
        blocks: [
          {
            type: "paragraph",
            text: "I started by studying workflows marketers already knew from Web2 advertising platforms and mapped them to our Web3 targeting model.",
          },
          {
            type: "paragraph",
            text: "The first product flow came down to three steps:",
          },
          {
            type: "videoGrid",
            videos: [
              {
                youtubeId: "KyDXsbJS2mY",
                title: "Select Cohort demo",
                caption: "**Select Cohort** — Build an audience based on wallet activity, behavior, and social signals.",
              },
              {
                youtubeId: "e5tQmLoRowQ",
                title: "Sync Audience demo",
                caption: "**Sync Audience** — Send the cohort directly to Twitter Ads Manager.",
              },
              {
                youtubeId: "rAn4oDx5_WQ",
                title: "Launch & Monitor demo",
                caption: "**Launch & Monitor** — Run campaigns and track performance.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "I used familiar Material Design patterns to build the first prototype quickly and validate the workflow with users.",
          },
          {
            type: "image",
            src: "/images/Web3/web3-design-system-components.png",
            alt: "Design system component library",
            width: 1200,
            height: 675,
          },
        ],
      },
      {
        id: "cohort-selection-ui",
        navLabel: "Solution",
        heading: "The hardest part: making Web3 targeting understandable",
        blocks: [
          {
            type: "paragraph",
            text: "The underlying targeting logic was much more complicated than what marketers were used to.",
          },
          {
            type: "paragraph",
            text: "The UX challenge was giving marketers this power without forcing them to understand the complexity underneath.",
          },
          {
            type: "toggle",
            summary: "Web2 audiences vs. Web3 audiences",
            text: "In Web2, marketers target familiar attributes like demographics and interests. In Web3, we were asking them to think in terms of wallets, token holdings, transactions, protocols, and on-chain behavior.",
          },
          { type: "heading", level: 3, text: "Preventing users from building the wrong audience" },
          {
            type: "paragraph",
            text: "In the first flow, marketers stacked filters one after another and only discovered at the end whether their audience was usable.",
          },
          {
            type: "paragraph",
            text: "Too narrow or too broad — either way, they had already built the whole cohort.",
          },
          {
            type: "paragraph",
            text: "My first instinct was to show the audience size after every change.",
          },
          {
            type: "paragraph",
            text: "But querying live blockchain data continuously was slow and expensive.",
          },
          {
            type: "paragraph",
            text: "That constraint led to four key design decisions.",
          },
          { type: "heading", level: 3, text: "Start with relevant audience pools" },
          {
            type: "paragraph",
            text: "Instead of giving marketers a blank slate, I created pre-selected pools based on project type — such as GameFi, NFT, and DeFi.",
          },
          {
            type: "paragraph",
            text: "Each pool narrowed the available data to signals that were actually relevant to that campaign.",
          },
          {
            type: "paragraph",
            text: "**Less configuration, fewer irrelevant choices.**",
          },
          {
            type: "image",
            src: "/images/Web3/Cohort project selection.png",
            alt: "Screenshot of pre-selected cohort category pools by project type",
            width: 1422,
            height: 553,
          },
          {
            type: "image",
            src: "/images/Web3/filter-3.png",
            alt: "Advanced filter conditions applied on top of a selected cohort category",
            width: 2566,
            height: 1304,
          },
          { type: "heading", level: 3, text: "Keep the estimate visible while filtering" },
          {
            type: "paragraph",
            text: "I moved cohort building into a slideout instead of a separate full-page flow.",
          },
          {
            type: "paragraph",
            text: "This let marketers adjust filters while keeping the estimated audience size visible.",
          },
          {
            type: "paragraph",
            text: "The estimate used our cached data rather than triggering a new API request after every change.",
          },
          {
            // Was Building Chohorts.png — removed from public/images/Web3/
            // (no longer referenced anywhere); filter.png moved up into
            // this slot from "Let users adjust instead of restart" below,
            // which now gets filter-2.png instead.
            type: "image",
            src: "/images/Web3/filter.png",
            alt: "Filter layout for setting cohort conditions",
            width: 2566,
            height: 1304,
          },
          { type: "heading", level: 3, text: "Let users adjust instead of restart" },
          {
            type: "paragraph",
            text: "If the final audience was too narrow or too broad, marketers could reopen the slideout and adjust their filters immediately.",
          },
          {
            type: "paragraph",
            text: "They didn't have to rebuild the cohort from scratch.",
          },
          {
            type: "image",
            src: "/images/Web3/filter-2.png",
            alt: "Filter editing and cohort adjustment interface",
            width: 2566,
            height: 1304,
          },
          { type: "heading", level: 3, text: "Show the signal, not false precision" },
          {
            type: "paragraph",
            text: "Our data was cached rather than fully live.",
          },
          {
            type: "paragraph",
            text: "Showing an exact number like 1,284 wallets suggested a level of precision we couldn't guarantee.",
          },
          {
            type: "paragraph",
            text: "So instead, I showed the audience as a percentage/range.",
          },
          {
            type: "paragraph",
            text: "What marketers really needed to know wasn't the exact wallet count.",
          },
          {
            type: "paragraph",
            text: "They needed to know whether the audience was too narrow, healthy, or too broad.",
          },
          {
            type: "image",
            src: "/images/Web3/Show the signal.png",
            alt: "Audience estimate shown as a percentage/range instead of an exact wallet count",
            width: 2566,
            height: 1304,
          },
        ],
      },
      {
        id: "usable-workflow",
        navLabel: "Workflow",
        heading: "From complex data to a usable marketing workflow",
        blocks: [
          {
            type: "paragraph",
            text: "The final experience hid most of the blockchain complexity behind a workflow marketers already understood:",
          },
          {
            type: "paragraph",
            text: "**Choose an audience → refine it → sync it → launch a campaign.**",
          },
          {
            type: "paragraph",
            text: "This allowed clients to perform work that previously required our team to build manually.",
          },
        ],
      },
      {
        id: "feedback-impact",
        navLabel: "Outcomes",
        heading: "Outcome",
        blocks: [
          {
            type: "paragraph",
            text: 'Clients later described the experience as "surprisingly easy," despite the complexity of mapping wallet behavior to usable marketing audiences.',
          },
          {
            type: "feedbackGrid",
            cards: [
              {
                testimonialId: "vincent",
              },
              {
                eyebrow: "500 Global",
                headline: "Growing3 was selected for the startup accelerator - ==500 Global==",
                quote:
                  "[...] The team provides growth solutions for Web3 projects (such as blockchain, games, DApps, and NFTs), leveraging on-chain and off-chain data analytics to help projects acquire and retain quality users across marketing, growth strategy, analytics, and marTech.",
                date: "Jul 18, 2023",
                href: "https://www.media-outreach.com/news/taiwan/2023/07/18/233599/500-global-and-taiwan-tech-arena-tta-to-power-third-cohort-of-startups-to-aim-for-next-level-growth/",
              },
              {
                eyebrow: "AppWorks (Demo Day #26 Press Release)",
                headline: "Growing3 Selected for ==AppWorks== Accelerator #26",
                quote:
                  "Growing3 leverages on-chain data analytics and marketing technology to help clients improve conversion performance and reduce acquisition costs, showcasing the growth potential of web3 marketing applications.",
                date: "Jul 4, 2023",
                href: "https://appworks.tw/demo-day-26-en/",
              },
              {
                eyebrow: "Alibaba Cloud Project",
                headline: "Growing3 was selected in the ==Alibaba Cloud== Global Startup Accelerator",
                date: "May 24, 2023",
                href: "https://kr-asia.com/intelligence-indeed-and-feiliu-tech-named-asia-stars-of-the-alibaba-cloud-x-krasia-global-startup-accelerator-hangzhou-demo-day",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "influencer-marketing-tool",
    title: "Influencer marketing tool",
    year: "2024 — 2025",
    subtitle:
      "Designed a self-serve influencer marketing product from product strategy to launch.",
    metaDescription:
      "For this B2B SaaS platform, I designed viral growth loops and a browser extension distribution channel, supporting a successful Product Hunt launch.",
    tags: ["B2B", "SaaS", "Plugin", "Marketing"],
    heroImage: "/images/Influencer Marketing/Influencer Matcher.png",
    meta: {
      role: "Product Designer — Product direction, UX/UI, pricing & onboarding",
      team: [
        { initials: "PM", label: "PM" },
        { initials: "YH", label: "Me (Designer)" },
        { initials: "ENG", label: "Engineer" },
      ],
      timeline: "2024 — 2025",
      tools: "Figma",
    },
    sections: [
      {
        id: "opportunity",
        navLabel: "Opportunity",
        heading: "Opportunity",
        blocks: [
          { type: "heading", level: 3, text: "Turning existing technology into a new product" },
          {
            type: "paragraph",
            text: "We already had the technology to turn influencer followers into targetable audiences.",
          },
          {
            type: "paragraph",
            text: "**The missing piece:** a focused influencer marketing workflow.",
          },
        ],
      },
      {
        id: "product-decision",
        navLabel: "Product Decision",
        heading: "Product Decision",
        blocks: [
          { type: "heading", level: 3, text: "From a feature to a standalone product" },
          {
            type: "paragraph",
            text: "Customer interviews showed that influencer marketing attracted a different customer segment from our existing paid advertising product.",
          },
          {
            type: "paragraph",
            text: "So we separated it into its own product.",
          },
          {
            type: "paragraph",
            text: "**Existing platform:** Paid Ads + Audience Building + Influencer Marketing",
          },
          {
            type: "paragraph",
            text: "**Standalone product:** Influencer Discovery + Audience Insights + Campaigns",
          },
        ],
      },
      {
        id: "mvp",
        navLabel: "MVP",
        heading: "MVP",
        blocks: [
          {
            // File is password-protected — the real password lives in the
            // Notion source, not here (this is a public page). Reach out
            // (see Footer/contact) if you need access.
            type: "paragraph",
            text: "Password protected — reach out for access.",
            href: "https://www.figma.com/design/ZIjrmyzkBp9SPsfQ0RPqxR/Influencer-Matcher?node-id=695-16073&p=f",
            linkText: "Explore the product",
          },
          { type: "heading", level: 3, text: "1 month from product direction to high-fidelity" },
          {
            type: "paragraph",
            text: "The previous MVP took 6 months.",
          },
          {
            type: "paragraph",
            text: "This time, I leveraged our existing design system to focus on the new product experience.",
          },
        ],
      },
      {
        id: "core-ux",
        navLabel: "Core UX",
        heading: "Core UX",
        blocks: [
          { type: "heading", level: 3, text: "From influencer discovery to campaign" },
          {
            type: "paragraph",
            text: "Designed the core workflow around three steps:",
          },
          {
            type: "paragraph",
            text: "**Discover → Evaluate → Activate**",
          },
          { type: "heading", level: 3, text: "Discover", id: "core-ux-discover" },
          {
            type: "paragraph",
            text: "Find relevant influencers.",
          },
          {
            type: "image",
            src: "/images/Influencer Marketing/discover influencer.png",
            alt: "Influencer discovery and search interface",
            width: 2384,
            height: 2038,
          },
          { type: "heading", level: 3, text: "Evaluate", id: "core-ux-evaluate" },
          {
            type: "paragraph",
            text: "Understand their audience and campaign potential.",
          },
          {
            type: "image",
            src: "/images/Influencer Marketing/Influencer profile.png",
            alt: "Influencer profile view with audience details",
            width: 2384,
            height: 2038,
          },
          {
            type: "image",
            src: "/images/Influencer Marketing/Influencer details.png",
            alt: "Detailed influencer metrics and audience insights",
            width: 1406,
            height: 1220,
          },
          { type: "heading", level: 3, text: "Activate", id: "core-ux-activate" },
          {
            type: "paragraph",
            text: "Turn their audience into a targetable campaign.",
          },
          {
            // Same two demo videos as web3-marketing-dashboard's
            // first-prototype section — this product is built on the same
            // wallet-mapping/campaign tech, so the assign/monitor demos
            // apply here too. Not a copy-paste mistake; reused on purpose.
            type: "videoGrid",
            videos: [
              {
                youtubeId: "e5tQmLoRowQ",
                title: "Assign to Twitter Audience demo",
                caption: "**Assign to Twitter Audience** — Sync it straight to Twitter Ads Manager",
              },
              {
                youtubeId: "rAn4oDx5_WQ",
                title: "Launch & Monitor Campaign demo",
                caption: "**Launch & Monitor Campaign** — Watch conversions and engagement roll in",
              },
            ],
          },
        ],
      },
      {
        id: "browser-extension",
        navLabel: "Browser Extension",
        heading: "Browser Extension",
        blocks: [
          { type: "heading", level: 3, text: "Bringing the workflow into the browser" },
          {
            type: "paragraph",
            text: "Instead of making users switch between platforms, I brought influencer discovery into their existing workflow.",
          },
          {
            type: "image",
            src: "/images/Influencer Marketing/influencer-marketing-chrome-store.png",
            alt: "Growing3 - Web3 Influencer Marketing Tool listing on the Chrome Web Store",
            width: 2850,
            height: 1548,
          },
        ],
      },
      {
        id: "self-serve",
        navLabel: "Self-serve",
        heading: "Self-serve",
        blocks: [
          { type: "heading", level: 3, text: "Designing the product to sell itself" },
          {
            type: "paragraph",
            text: "Without Sales guiding every customer, the product had to communicate its value on its own.",
          },
          {
            type: "paragraph",
            text: "**Pricing → Credits → First value → Upgrade**",
          },
          {
            type: "image",
            src: "/images/Influencer Marketing/Credits.png",
            alt: "Credits system for trying the product before purchasing",
            width: 2384,
            height: 1344,
          },
          {
            type: "image",
            src: "/images/Influencer Marketing/Pricing.png",
            alt: "Pricing plans for the SaaS product",
            width: 2384,
            height: 1242,
          },
          { type: "heading", level: 3, text: "Onboarding", id: "self-serve-onboarding" },
          {
            type: "paragraph",
            text: "The first experience was designed around getting users to a real result, not just explaining the product.",
          },
          {
            type: "embed",
            src: "https://embed.figma.com/design/ZIjrmyzkBp9SPsfQ0RPqxR/Influencer-Matcher?node-id=1968-33470&embed-host=share",
            title: "Onboarding flow",
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Outcome",
        heading: "Outcome",
        blocks: [
          { type: "heading", level: 3, text: "A new standalone SaaS product" },
          {
            type: "cardList",
            items: [
              {
                title: "New customer segment",
                description: "Clients across GameFi, NFT, DeFi, and crypto exchanges.",
              },
              {
                title: "Self-serve product",
                description: "Customers could discover, onboard, and use the product independently.",
              },
              {
                title: "Faster product delivery",
                description: "1 month to high-fidelity, compared with 6 months for the previous MVP.",
              },
            ],
          },
        ],
      },
      {
        id: "what-i-learned",
        navLabel: "What I Learned",
        heading: "What I learned",
        blocks: [
          {
            type: "cardList",
            items: [
              {
                title: "Product design can shape the business model.",
                description: "Pricing, onboarding, and UX were all part of making the product commercially viable.",
              },
              {
                title: "Design systems create leverage.",
                description: "A strong foundation let me spend more time solving new product problems instead of rebuilding UI.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "coolwallet-pro",
    title: "eCommerce redesign",
    year: "CoolBitX / 2021",
    subtitle:
      "Redesigned CoolWallet's eCommerce experience to support new products, markets, and business growth.",
    metaDescription:
      "I led the eCommerce redesign and rebrand for CoolWallet Pro, a crypto hardware wallet, driving 4x revenue growth as the product expanded into new markets and product lines.",
    tags: ["eCommerce", "Redesign", "Blockchain", "Marketing"],
    heroImage: "/images/CoolWallet.png",
    meta: {
      role: "Led the eCommerce redesign and product rebranding.",
      team: [
        { initials: "YH", label: "Me (Product Design)" },
        { initials: "MS", label: "Marketing & Sales" },
        { initials: "CL", label: "Customer Service & Logistics" },
      ],
      // Not in the Notion source, and CaseStudyView doesn't currently render
      // meta.timeline/meta.tools anywhere (only role/team) — left blank
      // rather than invented or pulled from this entry's old content. Fill
      // in if you have real values.
      timeline: "",
      tools: "",
    },
    // No shared impactStatsNote this round — the latest Notion source
    // doesn't give these stats a common date-range sentence like the
    // previous version did, so nothing to hoist above the cards.
    // label/text split into value + short caption (was one combined label
    // string, e.g. "+416% website revenue") to match statRow's card layout —
    // label renders large (text-h5), text renders as the smaller caption
    // line below it, same as CaseStudyBlock's statRow cards.
    impactStats: [
      { label: "+416%", text: "Revenue" },
      { label: "+34.9%", text: "AOV" },
      { label: "+16.97%", text: "Cart conversion" },
      { label: "+124.9%", text: "Traffic" },
    ],
    sections: [
      {
        // Not "overview" — CaseStudySideNav already prepends its own
        // synthetic "Overview" TOC entry (id="overview") whenever `meta`
        // is set, pointing at the meta card above. A section here reusing
        // that same id collides with it (duplicate React key, and two
        // "Overview" entries in the TOC pointing at different places).
        id: "opportunity",
        navLabel: "The Opportunity",
        heading: "The Opportunity",
        blocks: [
          { type: "heading", level: 3, text: "The business had outgrown its website." },
          {
            type: "paragraph",
            text: "CoolWallet was expanding from one product and one market to multiple products and regions.",
          },
          {
            type: "paragraph",
            text: "The existing site wasn't built to support:",
          },
          {
            type: "bulletList",
            items: [
              "Multiple products and bundles",
              "Localization",
              "Marketing campaigns",
              "Partners and affiliates",
            ],
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/before&after.png",
            alt: "CoolWallet eCommerce site before and after the redesign",
            width: 1920,
            height: 1084,
          },
        ],
      },
      {
        id: "rebuilt-for-scale",
        navLabel: "Rebuilt for Scale",
        heading: "Rebuilt for Scale",
        blocks: [
          { type: "heading", level: 3, text: "From a single-product store to a scalable architecture." },
          {
            type: "paragraph",
            text: "I redesigned the information architecture to support multiple products, features, campaigns, and business partners.",
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/Nav.pills.png",
            alt: "New navigation pills for the redesigned site architecture",
            width: 2828,
            height: 1206,
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/New features.png",
            alt: "New features introduced in the site navigation",
            width: 2564,
            height: 1374,
          },
        ],
      },
      {
        id: "made-products-easier",
        navLabel: "Made Products Easier to Choose",
        heading: "Made Products Easier to Choose",
        blocks: [
          { type: "heading", level: 3, text: "Pro or S? Make the difference clear." },
          {
            type: "paragraph",
            text: "With two main wallets, customers needed a simple way to choose.",
          },
          {
            type: "paragraph",
            text: "I created dedicated product pages and a side-by-side comparison based on different user needs.",
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/CoolWallet pro introduction.png",
            alt: "CoolWallet Pro product introduction page",
            width: 1838,
            height: 2160,
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/Pro vs S Comparison table.png",
            alt: "CoolWallet Pro vs. S comparison table",
            width: 1920,
            height: 1336,
          },
        ],
      },
      {
        id: "expanded-to-new-markets",
        navLabel: "Expanded to New Markets",
        heading: "Expanded to New Markets",
        blocks: [
          { type: "heading", level: 3, text: "Built localization into the experience." },
          {
            type: "paragraph",
            text: "The new experience supported multiple languages, regional currencies, shipping costs, mobile, and SEO — helping CoolWallet expand across Europe, Japan, and Korea.",
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/Japanese website.png",
            alt: "Japanese localized version of the CoolWallet website",
            width: 2000,
            height: 958,
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/japanese website2.png",
            alt: "Japanese localized version of the CoolWallet website, product page",
            width: 2846,
            height: 1370,
          },
        ],
      },
      {
        id: "built-for-campaigns",
        navLabel: "Built for Campaigns",
        heading: "Built for Campaigns",
        blocks: [
          { type: "heading", level: 3, text: "Turned one-off campaigns into reusable systems." },
          {
            type: "paragraph",
            text: "I created reusable campaign landing pages and introduced co-branded cards as a recurring product category.",
          },
          {
            // Referenced seanhalpin.xyz/work/ai's "more" card — click a
            // label row → opens a large lightbox (not an inline accordion
            // like every other toggle on this site), see SpotlightCard.tsx.
            type: "spotlight",
            summary: "Supporting Go-to-Market",
            heading: "Supporting Go-to-Market",
            text: "Campaign materials I designed for product launches across international markets.",
            video: { youtubeId: "ZLY7iW2vOcs", title: "Go-to-market campaign material walkthrough" },
            images: [
              {
                src: "/images/CaseStudy-eCom/Marketing material/MKT Campaign material.png",
                alt: "Marketing campaign material",
                width: 1440,
                height: 680,
              },
              {
                src: "/images/CaseStudy-eCom/Marketing material/zh-en.png",
                alt: "Marketing material localized in Chinese and English",
                width: 1440,
                height: 446,
              },
              {
                src: "/images/CaseStudy-eCom/Marketing material/international market.png",
                alt: "Marketing material for international markets",
                width: 1788,
                height: 996,
              },
            ],
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/marketingcampaign.png",
            alt: "Marketing campaign landing page template",
            width: 2812,
            height: 1416,
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/co-branded card with Crypto.com.png",
            alt: "Co-branded card design with Crypto.com",
            width: 1910,
            height: 1334,
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/Our Cobranded card partner program.png",
            alt: "Co-branded card partner program entry in the navigation",
            width: 2388,
            height: 1340,
          },
        ],
      },
      {
        id: "optimize-with-data",
        navLabel: "Optimize with Data",
        heading: "Optimize with Data",
        blocks: [
          { type: "heading", level: 3, text: "Used behavior data to find growth opportunities." },
          {
            type: "paragraph",
            text: "I set up Google Analytics and Clarity to track the journey from landing page to checkout and identify high-traffic, low-conversion areas.",
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/heatmap.png",
            alt: "Click heatmap analysis of the site",
            width: 960,
            height: 540,
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/User flow.png",
            alt: "User flow from landing page to final checkout",
            width: 2880,
            height: 848,
          },
          { type: "heading", level: 3, text: "Increased order value", id: "optimize-order-value" },
          {
            type: "paragraph",
            text: 'Added relevant **"Buy with"** recommendations at high-intent moments.',
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/buy with.png",
            alt: "\"Buy with\" suggestions on a product page",
            width: 2442,
            height: 1228,
          },
          { type: "heading", level: 3, text: "Reduced checkout uncertainty", id: "optimize-checkout" },
          {
            type: "paragraph",
            text: "Surfaced shipping, taxes, and discounts before checkout so customers could see the full cost earlier.",
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/shipping fees.png",
            alt: "Upfront shipping and tax costs shown before checkout",
            width: 4038,
            height: 3104,
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Outcome",
        heading: "Outcome",
        blocks: [
          { type: "heading", level: 3, text: "From a storefront to a growth platform." },
          {
            type: "statRow",
            stats: [
              { value: "+416%", label: "Revenue" },
              { value: "+34.9%", label: "AOV" },
              { value: "+16.97%", label: "Cart conversion" },
              { value: "+124.9%", label: "Traffic" },
              { value: "-29.6%", label: "Bounce rate" },
            ],
          },
          {
            type: "paragraph",
            text: "The new architecture later supported further expansion into Korea and Turkey without needing to be rebuilt.",
          },
          {
            type: "image",
            src: "/images/CaseStudy-eCom/GA4matrix.png",
            alt: "GA4 funnel analysis from landing page to checkout",
            width: 2298,
            height: 1174,
          },
        ],
      },
    ],
  },
  {
    slug: "german-learning-app",
    title: "AI German learning app",
    year: "2026",
    subtitle:
      "Built an AI-powered app that turns my German class notes into vocabulary cards and real-life scenario practice I can do anywhere.",
    tags: ["AI", "Mobile App", "0 to 1"],
    heroImage: "/images/German/Slide.png",
    meta: {
      role: "Designed, built, and shipped this app.",
      team: [{ initials: "YH", label: "Me (solo)" }],
      timeline: "2026",
      tools: "Claude, Figma, Mobbin, Paper, VS Code, ChatGPT, Supabase, Vercel, GitHub",
    },
    sections: [
      {
        id: "goal",
        navLabel: "Goal",
        heading: "I want to speak German confidently in daily scenarios by the end of 2026",
        blocks: [
          {
            type: "paragraph",
            text: "I started German classes to learn with a community and stay motivated. But most of my learning stayed inside the classroom. I wanted an easy way to practice what I learned on the go, even while waiting for a delayed train in Berlin.",
          },
        ],
      },
      {
        id: "product-overview",
        navLabel: "Features",
        // hideHeading: true — no visible <h2> for this section (removed on
        // request); heading text still set since it's the only thing the
        // TOC's section-jump target has to refer to if something else ever
        // reads it (e.g. an aria-label), not because it renders anywhere.
        heading: "Product overview",
        hideHeading: true,
        blocks: [
          {
            type: "featureShowcase",
            items: [
              {
                video: "/videos/german-app/organize-notes.mp4",
                accent: "sky",
                title: "Organize notes with AI",
                description: "Turn messy German notes, translations, and new vocabulary into structured learning cards.",
              },
              {
                video: "/videos/german-app/browse-scenarios.mp4",
                accent: "mint",
                title: "Browse by real-life scenarios",
                description: "Explore content by situations like cafés, supermarkets, and public transport.",
              },
              {
                video: "/videos/german-app/practice.mp4",
                accent: "salmon",
                title: "Practice what I learned",
                description: "Practice vocabulary, grammar, speaking, and listening based on my notes and real-life scenarios.",
              },
            ],
          },
        ],
      },
      {
        id: "build-process",
        navLabel: "Process",
        heading: "Build Process",
        blocks: [
          { type: "heading", level: 3, text: "1. Frame the problem: I want to practice German on the go" },
          {
            type: "paragraph",
            text: "I asked AI to interview me about how I study German, my learning goals, and where I struggle.",
          },
          {
            type: "paragraph",
            text: "This helped me narrow the first version down to two jobs:",
          },
          {
            type: "bulletList",
            items: [
              "**Turn class notes into reusable vocabulary and sentence cards.**",
              "**Practice what I learned** so I can remember words and use sentences more naturally.",
            ],
          },
          {
            type: "paragraph",
            text: "The goal was not to build a full language learning platform. It was to solve the small problem I had every week after class.",
          },
          { type: "heading", level: 3, text: "2. Explore common mobile patterns with Mobbin MCP" },
          {
            type: "image",
            src: "/images/German/mobbin-exploration.png",
            alt: "Tools used to explore and refine the design — Mobbin, Figma, Claude, and Paper for exploring, then VS Code, Figma, Claude, Paper, and ChatGPT for refining",
            width: 3850,
            height: 1600,
          },
          {
            type: "paragraph",
            text: "I connected Mobbin MCP and used Claude to explore common patterns for saving, browsing, and reviewing content. This gave me several options to compare before choosing a structure.",
          },
          { type: "heading", level: 3, text: "3. Iterate with AI to build the first interactive prototype" },
          {
            type: "paragraph",
            text: "Once the main jobs were clear, I mapped the app by hand.",
          },
          {
            type: "paragraph",
            text: "The first version focused on four areas:",
          },
          {
            type: "bulletList",
            items: [
              "**Home**: see saved material and learning groups.",
              "**Add**: turn class notes into vocabulary and sentences.",
              "**Cards**: browse saved vocabulary and sentences.",
              "**Practice**: review cards and mark what I remember and what needs more practice.",
            ],
          },
          {
            type: "image",
            src: "/images/German/paper-sketch.jpeg",
            alt: "Hand-drawn sketch mapping the app's four main areas: Home, Add, Cards, and Practice",
            width: 3788,
            height: 2525,
          },
          {
            type: "paragraph",
            text: "Claude Code turned my paper sketch into screens and added some interactions I had missed.",
          },
          {
            type: "paragraph",
            text: "After a few iterations with Claude and Figma, I reached the final design.",
          },
          { type: "heading", level: 3, text: "4. Building the real product was the easiest part" },
          {
            type: "paragraph",
            text: "Once the structure and interactions were clear, I used Supabase, Vercel, and GitHub to turn the prototype into a working product.",
          },
          {
            type: "paragraph",
            text: "Surprisingly, implementation was the easiest part. Most of the hard work happened earlier: understanding the problem and deciding what to build.",
          },
        ],
      },
      {
        id: "takeaways",
        navLabel: "Takeaways",
        heading: "Takeaways",
        blocks: [
          {
            type: "cardList",
            items: [
              {
                title: "AI helped me fill a gap in my German learning",
                description: "I used AI to turn what I learned in class into something I could easily practice in daily life.",
              },
              {
                title: "Building a reusable AI design workflow",
                description:
                  "I reused the Design Skills I had created while building my portfolio website and tested them on a different product. Each iteration helped me refine how I work with AI across projects.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
