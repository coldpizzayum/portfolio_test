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
    title: "Designing Web3 Marketing Dashboard: 0 to 1",
    description:
      "Turned our audience-building algorithm into a self-serve product, letting Web3 marketers generate their own audiences and manage campaigns end to end.",
    tags: ["B2B", "Blockchain & Web3", "Data Heavy"],
    image: "/images/web3console.png",
    caseStudySlug: "web3-marketing-dashboard",
  },
  {
    slug: "coolwallet-pro-rebrand",
    title: "Global Expansion: branding & eCommerce redesign",
    description: "Led CoolWallet Pro's brand and eCommerce redesign, helping the product expand into global market.",
    tags: ["eCommerce", "Blockchain & Web3", "B2C", "FinTech"],
    image: "/images/coolwallet-hero.png",
    caseStudySlug: "coolwallet-pro",
  },
  {
    slug: "influencer-marketing-management-tool",
    title: "Turning a Feature Into a SaaS Product",
    description:
      "A self-serve tool for influencer marketing that filled a gap in the platform, complete with SaaS pricing and onboarding.",
    tags: ["B2B", "Data Heavy", "Blockchain & Web3"],
    image: "/images/influencer-marketing-hero.png",
    caseStudySlug: "influencer-marketing-tool",
  },
];

export type CaseStudyBlock =
  | { type: "paragraph"; text: string; href?: string; linkText?: string }
  /** `id` is optional — set it to make the heading a jump target, which also
   *  surfaces it as a nested sub-item under its section in the side TOC. */
  | { type: "heading"; level: 3; text: string; id?: string }
  | { type: "bulletList"; items: string[] }
  /** Collapsed-by-default disclosure — a heading-style summary line that expands
   *  to a bullet list on click. Reuses the accordion pattern already established
   *  in JourneyTimeline (chevron icon, framer-motion height animation). `id` is
   *  optional, same jump-target/TOC-sub-item behavior as the heading block. */
  | { type: "toggle"; summary: string; items?: string[]; text?: string; id?: string }
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
  /** One sentence, supports `**bold**` for the embedded number/stat. */
  text: string;
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
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "web3-marketing-dashboard",
    title: "Web3 Marketing Dashboard: 0 to 1",
    year: "2023 — 2024 | **Growing3**",
    subtitle:
      "Designed a marketing platform from 0 to 1, turning our underlying workflow, mapping wallet behavior to real identities, into a product that both users and investors could understand and use.",
    metaDescription:
      "As Founding Product Designer for this Web3 marketing dashboard, I led MVP design from concept to launch, helping the team close a $1.2M seed round.",
    tags: ["B2B", "Pre-seed", "9-paying users", "Data-heavy UXUI"],
    heroImage: "/images/web3console.png",
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
            type: "embed",
            src: "https://embed.figma.com/board/B6MIqfvztsoVLex4FqW6kB/Feature-Architecture-Diagram?node-id=0-1&embed-host=share",
            title: "Feature Architecture Diagram",
          },
          {
            type: "image",
            src: "/images/Allinonetool.png",
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
            src: "/images/web3-design-system-components.png",
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
            src: "/images/Cohort project selection.png",
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
            src: "/images/Building Chohorts.png",
            alt: "Screenshot of building a cohort in the slideout selector",
            width: 1682,
            height: 906,
          },
          {
            type: "image",
            src: "/images/filter.png",
            alt: "Filter layout for setting cohort conditions",
            width: 1200,
            height: 675,
          },
        ],
      },
      {
        id: "design-trade-off",
        navLabel: "Design trade-off",
        heading: "Design trade-off",
        hideFromToc: true,
        blocks: [
          {
            type: "paragraph",
            text: "My engineer had limited time and couldn't get deep into UI details, so the design system I'd built in Figma didn't always make it into the final build cleanly.",
          },
          {
            type: "paragraph",
            text: "That's part of why I now build my own React components with AI, so nothing gets lost between what I design and what actually ships.",
          },
          {
            type: "paragraph",
            text: "",
            href: "/case-study",
            linkText: "See what I've built with AI →",
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
    title: "Turning a Feature Into a SaaS Product",
    year: "2024 — 2025",
    subtitle:
      "A self-serve tool for influencer marketing that filled a gap in the platform, complete with SaaS pricing and onboarding.",
    metaDescription:
      "For this B2B SaaS platform, I designed viral growth loops and a browser extension distribution channel, supporting a successful Product Hunt launch.",
    tags: ["B2B", "SaaS", "Pivot"],
    heroImage: "/images/influencer-marketing-hero.png",
    meta: {
      role: "I made the call to build this as a standalone product, and designed the SaaS pricing and onboarding experience that let it run as a self-serve business.",
      team: [
        { initials: "PM", label: "Product Manager" },
        { initials: "YH", label: "Me (Product Designer)" },
        { initials: "ENG", label: "Engineer" },
      ],
      timeline: "2024 — 2025",
      tools: "Figma",
    },
    impactStats: [
      {
        label: "Clients across GameFi, NFT, DeFi, and crypto exchanges",
        text: "including Gate.io",
      },
      {
        label: "1 month to high-fidelity design",
        text: "down from 6 months on the previous product, thanks to the design system already in place",
      },
      {
        label: "A complete product line",
        text: "the company could finally run as a real SaaS business; customers Sales brought in could operate the product entirely on their own",
      },
    ],
    sections: [
      {
        id: "context",
        navLabel: "Context",
        heading: "Context",
        blocks: [
          {
            type: "paragraph",
            text: "We already had the wallet-mapping tech to turn any influencer's follower list into an audience. So once a client had an influencer list, we could take that list and run ads directly against those followers. Influencer marketing was the missing piece that made the whole marketing product more powerful.",
          },
          {
            type: "paragraph",
            text: "All-in-one marketing platform case study here →",
            href: "/case-study/web3-marketing-dashboard",
            linkText: "Link",
          },
        ],
      },
      {
        id: "designing-the-product",
        navLabel: "Designing the Product",
        heading: "Part 1: Designing the Product",
        blocks: [
          { type: "heading", level: 3, text: "Built in 1 Month, Not 6" },
          {
            type: "paragraph",
            text: "Because the design system and core interaction patterns were already established from the previous product, I delivered designs in about a month, a fraction of the six months the first MVP took.",
          },
          {
            type: "paragraph",
            text: "Here are some key flows to streamline influencer outreach:",
          },
          {
            type: "flowList",
            items: [
              {
                name: "Search & Discover",
                description: "Find and filter influencers that match your niche and goals.",
              },
              {
                name: "Analyze Follower Networks",
                description: "Explore followers and followings to build a tailored influencer list.",
              },
              {
                name: "Track Keyword Mentions",
                description: "Identify influencers talking about your chosen keywords on X (Twitter).",
              },
              {
                name: "Bulk Outreach",
                description: "Contact hundreds of influencers at once to save time and scale outreach.",
              },
              {
                name: "Share Curated Lists",
                description: "Easily share influencer lists with teammates or other users.",
              },
            ],
          },
          { type: "heading", level: 3, text: "Seamless Experience: The Chrome Extension" },
          {
            type: "paragraph",
            text: "I designed a Chrome Extension to reduce users' time switching between platforms, which made the whole experience more seamless.",
          },
          {
            type: "paragraph",
            text: "Published on the Chrome Web Store as a marketing channel to increase exposure.",
          },
          {
            type: "image",
            src: "/images/influencer-marketing-chrome-store.png",
            alt: "Growing3 - Web3 Influencer Marketing Tool listing on the Chrome Web Store",
          },
        ],
      },
      {
        id: "pivot",
        navLabel: "The Pivot",
        heading: "Part 2: The Pivot to a Standalone Business",
        blocks: [
          { type: "heading", level: 3, text: "From an All-in-One Platform to a Focused Tool" },
          {
            type: "paragraph",
            text: "Through interviews, we found the customers who needed influencer marketing weren't always the same ones running paid ad campaigns.",
          },
          {
            type: "paragraph",
            text: "Rather than bolting influencer marketing on as one more feature inside the existing dashboard, I made the call to build it as its own standalone product.",
          },
          {
            type: "paragraph",
            text: "At the same time, we explored distribution by launching on Product Hunt.",
          },
          {
            type: "image",
            src: "/images/influencer-marketing-product-hunt.png",
            alt: "Growing3 - Influencer Matcher launch page on Product Hunt",
          },
          { type: "heading", level: 3, text: "Designing the SaaS Experience: Credits & Onboarding" },
          {
            type: "paragraph",
            text: 'Once we decided to price this on its own, the next question was how someone would actually go from "curious" to "paying" without us in the room.',
          },
          {
            type: "paragraph",
            text: "We built it around credits. New users got a small number of credits to try the core features first, run a real search, see real KOL matches, before spending anything.",
          },
          {
            type: "paragraph",
            text: "Onboarding had to carry that same weight. Since there was no sales call walking someone through it, the first few minutes in the product had to teach the tool by itself.",
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Outcome",
        heading: "Outcome",
        blocks: [
          { type: "heading", level: 3, text: "What worked" },
          {
            type: "paragraph",
            text: "The standalone pricing brought in a new kind of customer. And the design let the company start operating like a SaaS business.",
          },
          { type: "heading", level: 3, text: "What's still open" },
          {
            type: "paragraph",
            text: "What we hadn't cracked yet was how people found the product in the first place. Neither product got much traction through organic signups. Almost every real customer still came in through B2B sales, someone on our team reaching out first. **But once they landed, they went through the exact flow we designed, not a manual workaround.**",
          },
          {
            type: "paragraph",
            text: "Good self-serve design solves what happens after someone shows up. It doesn't solve how they show up. That's still an open problem for the company, and one I'd want to be part of solving next.",
          },
        ],
      },
      {
        id: "figma",
        navLabel: "Figma Files",
        heading: "Figma File",
        blocks: [
          {
            type: "paragraph",
            text: "Organized design system and responsive layouts.",
          },
          {
            type: "paragraph",
            text: "",
            href: "https://www.figma.com/design/ZIjrmyzkBp9SPsfQ0RPqxR/Influencer-Matcher?node-id=1069-1958&t=PUZafa6fkHXDnTim-1",
            linkText: "Figma files",
          },
          {
            type: "image",
            src: "/images/influencer-marketing-figma.png",
            alt: "Figma file showing the Influencer Matcher design system and responsive desktop, tablet, and mobile layouts",
          },
        ],
      },
    ],
  },
  {
    slug: "coolwallet-pro",
    title: "CoolWallet eCommerce redesign: new markets, new products, 4x revenue",
    year: "CoolBitX / 2021",
    subtitle:
      "Redesigned CoolWallet's eCommerce site to support the CoolWallet Pro launch and a push into new markets — EU, Japan, Korea.",
    metaDescription:
      "I led the eCommerce redesign and rebrand for CoolWallet Pro, a crypto hardware wallet, driving 4x revenue growth as the product expanded into new markets and product lines.",
    tags: ["AB Testing", "Marketing", "eCommerce", "Redesign"],
    heroImage: "/images/coolwallet-hero.png",
    meta: {
      role: "I led design for two initiatives that supported this market expansion: product rebranding, and eCommerce redesign.",
      team: [
        { initials: "YH", label: "Me (Product Designer)" },
        { initials: "PT", label: "Product Team" },
        { initials: "MS", label: "Marketing & Sales Team" },
        { initials: "CL", label: "Customer Service & Logistics Team" },
      ],
      // Not in the Notion source, and CaseStudyView doesn't currently render
      // meta.timeline/meta.tools anywhere (only role/team) — left blank
      // rather than invented or pulled from this entry's old content. Fill
      // in if you have real values.
      timeline: "",
      tools: "",
    },
    impactStats: [
      {
        label: "+416% website revenue",
        text: "June 2021 to March 2022, compared to the year before.",
      },
      {
        label: "+34.9% average order value",
        text: "June 2021 to March 2022, compared to the year before.",
      },
      {
        label: "+21% cart conversion rate",
        text: "June 2021 to March 2022, compared to the year before.",
      },
      {
        label: "+124.9% traffic",
        text: "June 2021 to March 2022, compared to the year before.",
      },
      {
        label: "29.6% bounce rate",
        text: "June 2021 to March 2022, compared to the year before.",
      },
    ],
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "CoolBitX is one of the biggest hardware crypto wallet providers in the world, with 300,000+ customers worldwide. After CoolWallet S took off, we launched CoolWallet Pro to reach more advanced users — people into DeFi, NFTs, staking. And we also redesigned the eCommerce site to reach more markets: EU, Japan, Korea.",
          },
        ],
      },
      {
        id: "problems",
        navLabel: "Problems",
        heading: "Problems",
        blocks: [
          {
            type: "paragraph",
            text: "We launched CoolWallet Pro in May 2021. Our website's structure hadn't caught up. It was still built for a much smaller business: one product, one market.",
          },
          {
            type: "bulletList",
            items: [
              "No place to put multiple product types. We wanted to sell Pro, S, DUO bundles, plus co-branded cards, but the old architecture had no room for that.",
              "No flexibility for localization, as we wanted to serve Japan, Korea, and France.",
              "No dedicated place to host marketing campaigns.",
              "No way to properly support the other users we needed to serve: business partners, affiliate program.",
            ],
          },
        ],
      },
      {
        id: "solutions",
        navLabel: "Solutions",
        heading: "Solutions",
        blocks: [
          { type: "heading", level: 3, text: "A full site UX check: localization, mobile, SEO" },
          {
            type: "paragraph",
            text: "I also scanned through the whole site and made the following improvements:",
          },
          {
            type: "bulletList",
            items: [
              "**Localization**: translated the site into multiple languages, and localized currency and shipping cost by region.",
              "**Mobile optimization**: responsive design for the growing mobile user base.",
            ],
          },
          {
            type: "toggle",
            summary: "SEO optimization: Click to read what this covered",
            items: [
              "Shallow site architecture, every product within a few clicks of the homepage",
              "Core Web Vitals: load speed, interactivity, visual stability",
              "hreflang tags, currency, and region-specific content for the multi-market setup",
              "Keyword-optimized titles, meta descriptions, and H1s on product pages",
              "Unique product descriptions, image alt text, descriptive file names",
              "Comparison and guide content linking to product and category pages",
              "Customer reviews and Q&A on product pages",
            ],
          },
          {
            type: "paragraph",
            text: "These fixes contribute to more organic traffic!",
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "Japanese localized version of the CoolWallet website",
          },
          { type: "heading", level: 3, text: "Made Pro and S easy to compare" },
          {
            type: "paragraph",
            text: "Built product introduction pages and a side-by-side comparison to help users choose between CoolWallet Pro and S, depending on what they needed.",
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "CoolWallet Pro introduction and comparison pages",
          },
          { type: "heading", level: 3, text: "Rebuilt the information architecture" },
          {
            type: "paragraph",
            text: "I redefined the site's navigation and information architecture so it could serve several purposes at once:",
          },
          {
            type: "bulletList",
            items: [
              "Support 2 main products plus multiple additional products",
              "Introduce new features to users",
              "Serve our business partners",
            ],
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "New navigation pills and the interaction between the CoolWallet app and Pro",
          },
          { type: "heading", level: 3, text: "Turned co-branded cards into a product line" },
          {
            type: "paragraph",
            text: "Customers loved the co-branded cards and gifts we gave out in past marketing campaigns. So we made them part of the regular product line.",
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "Co-branded card designs with Crypto.com and other partners",
          },
          { type: "heading", level: 3, text: "Built a system for marketing campaigns" },
          {
            type: "paragraph",
            text: "Campaigns kept growing. I created a marketing campaign landing page template, along with a campaign material workflow.",
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "Marketing campaign landing page template",
          },
        ],
      },
      {
        id: "research",
        navLabel: "Research",
        heading: "Research",
        blocks: [
          { type: "heading", level: 3, text: "Used data to find where people dropped off" },
          {
            type: "paragraph",
            text: "Alongside the redesign, I set up Google Analytics and Clarity for behavioral analysis. From landing page to cart, I found points that could be improved to reduce drop-off, and other points that looked like opportunities. I prioritized pages with high traffic but low conversion rate or high bounce rate.",
          },
          {
            type: "toggle",
            summary: "GA4 metrics I tracked - Click to read",
            items: [
              "Landing (page_view): unique visitors, traffic source, bounce rate",
              "Browsing (view_item): scroll depth, click heatmaps, average time on page",
              "Add to cart (add_to_cart): add-to-cart rate",
              "Checkout (begin_checkout, purchase): cart abandonment rate, checkout abandonment rate",
            ],
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "GA4 funnel analysis from landing page to checkout",
          },
          { type: "heading", level: 3, text: "Added \"buy with\" to lift AOV" },
          {
            type: "paragraph",
            text: "The data showed room to grow order value without hurting conversion. So I added \"buy with\" suggestions to product pages, some campaigns, and the cart, without overwhelming customers with too much buying information.",
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "\"Buy with\" suggestions on a product page",
          },
          { type: "heading", level: 3, text: "Brought shipping fees upfront" },
          {
            type: "paragraph",
            text: "Checkout abandonment was one of the numbers I tracked. Surprise fees at the last step are a common cause. So I brought the shipping fee upfront, showing the full cost (taxes, shipping, discounts) before checkout, to build trust with customers.",
          },
          {
            type: "image",
            src: "/images/coolwallet-hero.png",
            alt: "Upfront shipping and tax costs shown before checkout",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        heading: "Built to Grow",
        blocks: [
          {
            type: "paragraph",
            text: "The site started out built for one product, one market. After redesign, it was solid enough to carry two main product lines and three new markets, with room to keep growing. When CoolWallet later expanded into Korea and Turkey, the same architecture supported it.",
          },
          {
            type: "statRow",
            stats: [
              { value: "+416%", label: "increase in website revenue" },
              { value: "+21%", label: "improvement in cart conversion rate" },
              { value: "+124.9%", label: "growth in traffic" },
              { value: "29.6%", label: "reduction in bounce rate" },
            ],
          },
          {
            type: "toggle",
            summary: "Behind the numbers - Click to read",
            items: [
              "Revenue is the combined effect of everything below.",
              "AOV moved because of the DUO bundles and the buy with prompts.",
              "Cart conversion moved because I fixed the specific drop-off points the funnel data pointed to.",
              "Traffic mostly came from marketing spend and the new-market push, though localization added its own lift in organic search.",
              "Bounce rate dropped since the new site had a better user experience.",
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
