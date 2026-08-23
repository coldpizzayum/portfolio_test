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
    description: "Led crypto wallet's rebrand and eCommerce redesign, helping the product expand into global market.",
    tags: ["eCommerce", "Blockchain & Web3", "B2C", "FinTech"],
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
  | { type: "spotlight"; summary: string; heading: string; text: string; images: { src: string; alt: string; width: number; height: number }[] }
  | { type: "statRow"; stats: { value: string; label: string }[] }
  | { type: "flowList"; items: { name: string; description: string }[] }
  /** `width`/`height` are the source file's real pixel dimensions — when set,
   *  the image renders at its own aspect ratio (no cropping, no letterboxing).
   *  Omit them and it falls back to the old fixed 16:9 frame. */
  | { type: "image"; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: "videoGrid"; videos: { youtubeId: string; title: string; caption?: string }[] }
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
      "Designed a blockchain data dashboard that turns complex on-chain data into actionable marketing insights.",
    metaDescription:
      "As Founding Product Designer for this Web3 marketing dashboard, I led MVP design from concept to launch, helping the team close a $1.2M seed round.",
    tags: ["B2B", "Pre-seed", "Data-heavy UXUI"],
    heroImage: "/images/Web3/Web3 Console.png",
    meta: {
      role: "I led end-to-end product design, from competitor research and user interviews, to user journey mapping, building the design system, and final design hand-off.",
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
        text: "Including XREX and Sorare, with early adopters like Flap, DOEX, PrismX, and Chainfir Capital.",
      },
    ],
    sections: [
      {
        id: "all-in-one-tool",
        navLabel: "Problems",
        heading: "Building an all-in-one marketing tool",
        blocks: [
          {
            // Was a live Figma board embed — swapped for a static image
            // per the user's own screenshot/export of it.
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
          {
            type: "paragraph",
            text: "I started by researching patterns marketers already knew from Web2 platforms, then came up with the information architecture diagram.",
          },
          {
            type: "toggle",
            summary: "Reference products I looked at",
            items: [
              "Ad management platforms (e.g., Meta Ads Manager, Twitter Ads, Google Ads)",
              "Marketing automation tools (e.g., HubSpot, Mailchimp, ActiveCampaign)",
              "Customer Data Platforms (CDPs) (e.g., Segment, Amplitude)",
              "Growth marketing tools (e.g., Branch, AppsFlyer, Mixpanel)",
              "Web3 marketing dashboards (e.g., DappRadar, Galxe, Zapper)",
            ],
          },
        ],
      },
      {
        id: "ad-targeting-logic",
        navLabel: "The logic behind our ad targeting is complicated",
        heading: "The logic behind our ad targeting is complicated",
        hideFromToc: true,
        blocks: [
          {
            type: "paragraph",
            text: "Before this, the team built audience packages by hand, analyzing wallet behavior and putting together a list for each client individually, then handing it off for them to run ads. My job was to turn that service into something clients could do themselves, so the company could actually scale like a SaaS product, not an agency.",
          },
        ],
      },
      {
        id: "first-prototype",
        navLabel: "Research",
        heading: "Build the first prototype",
        blocks: [
          {
            type: "paragraph",
            text: "First, I used **Material Design UI** patterns to quickly piece together a first version of the prototype to test with users.",
          },
          {
            type: "paragraph",
            text: "I broke the whole journey down into 3 simple steps:",
          },
          {
            type: "videoGrid",
            videos: [
              {
                youtubeId: "KyDXsbJS2mY",
                title: "Select Cohort demo",
                caption: "**Select Cohort** — Set filters by wallet, behavior, and social activity",
              },
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
        heading: "Designing the cohort selection UI",
        blocks: [
          {
            type: "paragraph",
            text: "The hardest part was the logic behind how we found audiences, helping the marketers understand this and guiding them through the process of setting their cohorts.",
          },
          {
            type: "toggle",
            summary: "Web2 audiences vs. Web3 audiences",
            text: "Web2 ad platforms like Twitter or Google target people using demographics and interests, signals that come from social media behavior. Web3 audiences are different. They're built from what wallets actually do on-chain: what tokens they hold, what they've traded, what protocols they've used.",
          },
          {
            type: "paragraph",
            text: "Marketers stacked filter conditions one after another, and only found out at the end if the audience worked. Too narrow, too broad, either way, they'd already built the whole thing before finding out it didn't.",
          },
          {
            type: "paragraph",
            text: "My first instinct was to show live wallet data on every change. But that was slow, and it cost us money in API calls.",
          },
          {
            type: "paragraph",
            text: "So I went back to a few core decisions:",
          },
          {
            type: "paragraph",
            text: "**Pre-selected category pools, not a blank slate.** Marketers started from pools scoped to the type of project they were running, GameFi, NFT, DeFi, each already narrowed to what actually mattered, instead of building a cohort from zero.",
          },
          {
            type: "image",
            src: "/images/Web3/Cohort project selection.png",
            alt: "Screenshot of pre-selected cohort category pools by project type",
            width: 1422,
            height: 553,
          },
          {
            type: "paragraph",
            text: "**A slideout, not a full-page flow.** People could keep an eye on the estimate while they worked. As they added filters, the number updated in real time, pulled from our own data, not a fresh API call every time.",
          },
          {
            type: "paragraph",
            text: "**A way back, not a restart.** If someone still hit a dead end at the last step, they could open the slideout again, jump back, and watch the estimate update live from there.",
          },
          {
            type: "paragraph",
            text: '**A percentage, not an exact number.** An exact count implies precision we didn\'t have, the data was cached, not live. "1,284 wallets" sounds like right now. It might\'ve been an hour old. A percentage told users what they actually needed to know: too narrow, or too broad.',
          },
          {
            type: "image",
            src: "/images/Web3/Building Chohorts.png",
            alt: "Screenshot of building a cohort in the slideout selector",
            width: 1682,
            height: 906,
          },
          {
            type: "image",
            src: "/images/Web3/filter.png",
            alt: "Filter layout for setting cohort conditions",
            width: 1200,
            height: 675,
          },
        ],
      },
      {
        id: "feedback-impact",
        navLabel: "Outcomes",
        heading: "Feedback & Impact",
        blocks: [
          {
            type: "paragraph",
            text: 'Clients later described the experience as "surprisingly easy," even though the underlying workflow, mapping wallet behavior to real identities, was highly complex.',
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
