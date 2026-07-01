export interface WorkItem {
  slug: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  /** If set, the work card links to /case-study/[caseStudySlug]. */
  caseStudySlug?: string;
}

export const workItems: WorkItem[] = [
  {
    slug: "web3-wallet-defi-dashboard",
    year: "2023 — 2024",
    title: "Web3 Wallet & DeFi Dashboard",
    description:
      "Simplified complex on-chain data into a clear, trustworthy interface — helping first-time DeFi users navigate wallets, swaps, and portfolio tracking with confidence.",
    tags: ["Web3", "Product Design", "Design System"],
    image: "/images/project-screenshot.png",
    caseStudySlug: "web3-marketing-dashboard",
  },
  {
    slug: "b2b-analytics-platform-redesign",
    year: "2022 — 2023",
    title: "B2B Analytics Platform Redesign",
    description:
      "Rebuilt a legacy analytics tool from the ground up — replacing a fragmented data model with a coherent workspace that cut onboarding time by 40%.",
    tags: ["B2B SaaS", "Data Visualization", "Research"],
    image: "/images/project-screenshot.png",
  },
  {
    slug: "ecommerce-checkout-overhaul",
    year: "2021 — 2022",
    title: "eCommerce Checkout Overhaul",
    description:
      "Redesigned a multi-step checkout into a frictionless single-page flow — lifting conversion by 23% while reducing cart abandonment through progressive disclosure.",
    tags: ["eCommerce", "Conversion Optimization", "Mobile-first"],
    image: "/images/project-screenshot.png",
  },
];

export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 3; text: string }
  | { type: "problemCards"; cards: { title: string; description: string }[] }
  | { type: "researchSteps"; steps: { title: string; description: string }[] }
  | { type: "hmwList"; items: string[] }
  | { type: "statRow"; stats: { value: string; label: string }[] }
  | { type: "flowList"; items: { name: string; description: string }[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "outcomeGrid"; items: { emoji: string; stat: string; label: string }[] }
  | { type: "impactList"; items: { icon: string; text: string; href?: string; linkText?: string }[] };

export interface CaseStudySection {
  id: string;
  navLabel: string;
  heading: string;
  blocks: CaseStudyBlock[];
}

export interface CaseStudyMeta {
  role: string;
  team: { initials: string; label: string; color: string }[];
  timeline: string;
  tools: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  subtitle: string;
  tags: string[];
  heroImage: string;
  meta: CaseStudyMeta;
  impactStats: ImpactStat[];
  sections: CaseStudySection[];
  nextCaseStudy: { label: string; title: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "web3-marketing-dashboard",
    title: "Web3 Marketing Dashboard",
    year: "2023 — 2024",
    subtitle:
      "As Founding Product Designer, I led the MVP design from concept to launch — directly contributing to the team's $1.2M seed funding round.",
    tags: ["Web3", "B2B SaaS", "MVP", "Design System", "User Research"],
    heroImage: "/images/project-screenshot.png",
    meta: {
      role: "Founding Product Designer",
      team: [
        { initials: "YH", label: "Me — Designer", color: "#C9A96E" },
        { initials: "PM", label: "Product Manager", color: "#7A8FB5" },
        { initials: "FE", label: "Engineer", color: "#6B9E85" },
      ],
      timeline: "2023 Q2 — 2024 Q1",
      tools: "Figma · Notion · ChatGPT · MidJourney",
    },
    impactStats: [
      {
        label: "Seed Funding Raised",
        value: "$1.2M",
        description: "Investors validated the product through the working MVP prototype.",
      },
      {
        label: "Users Tested",
        value: "8",
        description: "Live prototype testing sessions with real Web3 marketers.",
      },
      {
        label: "Continents Reached",
        value: "3",
        description: "Early adopters across Asia, Europe, and the Americas.",
      },
    ],
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        heading: "Goal: First MVP",
        blocks: [
          {
            type: "paragraph",
            text: "The team reached out to me to help turn their manual agency service into a SaaS product. The goal was to build a platform for Web3 project owners and marketers to streamline their entire marketing workflow — all in one place.",
          },
          {
            type: "paragraph",
            text: "Previously, teams were stitching together Meta Ads, Twitter, Amplitude, and on-chain tools across separate tabs. The opportunity was to unify audience targeting, campaign management, and performance tracking into one coherent experience — fully synced with X (Twitter).",
          },
          { type: "heading", level: 3, text: "My Role" },
          {
            type: "problemCards",
            cards: [
              {
                title: "Product Discovery",
                description:
                  "Supported competitor research and stakeholder discovery to shape what we were building and why.",
              },
              {
                title: "MVP Design",
                description:
                  "Designed the full MVP from zero — including all key flows, components, and interaction patterns.",
              },
              {
                title: "User Testing",
                description:
                  "Ran hands-on testing sessions with early users using an interactive (not Figma) prototype.",
              },
              {
                title: "Design System",
                description:
                  "Built the entire design system from scratch — atomic components, branding, 3D visual language.",
              },
            ],
          },
        ],
      },
      {
        id: "discovery",
        navLabel: "Market Research",
        heading: "Discovery & Market Research",
        blocks: [
          {
            type: "paragraph",
            text: "To validate the opportunity and understand what to build, my PM and I ran structured discovery across three sources:",
          },
          {
            type: "researchSteps",
            steps: [
              {
                title: "Demo calls with competitors",
                description:
                  "We demoed ad management platforms (Meta, Twitter Ads, Google Ads), marketing automation tools (HubSpot, Mailchimp), CDPs (Segment, Amplitude), and Web3-specific tools (DappRadar, Galxe, Zapper) — mapping where each fell short for Web3 use cases.",
              },
              {
                title: "Analysis of public customer reviews",
                description:
                  "We mined G2 and X (Twitter) for recurring complaints — focusing on what users said was frustrating about existing tools, not just what features they requested.",
              },
              {
                title: "Investor & mentor feedback",
                description:
                  "Collected insights from accelerator mentors and existing clients who had been using the team's manual service — real pain, real context, real urgency.",
              },
            ],
          },
          {
            type: "image",
            src: "/images/project-screenshot.png",
            alt: "Market research and competitor analysis",
            caption: "Competitor landscape mapping across ad management, automation, and Web3 tools",
          },
          { type: "heading", level: 3, text: "Key Takeaway" },
          {
            type: "paragraph",
            text: "Users were frustrated switching between platforms — some were synced, most weren't. They needed a single source of truth for managing ad audiences, campaigns, and performance tracking, fully integrated with X (Twitter) where Web3 communities live.",
          },
        ],
      },
      {
        id: "features",
        navLabel: "Value vs. Effort",
        heading: "Value vs. Effort",
        blocks: [
          {
            type: "paragraph",
            text: "Before writing a single pixel, the PM, developer, and I met to evaluate technical and business feasibility of every potential feature. We plotted each idea on a value vs. effort matrix to decide what made it into the MVP.",
          },
          {
            type: "hmwList",
            items: [
              "How Might We let marketers define on-chain audience segments without needing a developer?",
              "How Might We sync those audiences directly to Twitter Ads Manager in one click?",
              "How Might We surface campaign performance in a way that Web3 non-technical founders can act on?",
            ],
          },
          {
            type: "image",
            src: "/images/project-screenshot.png",
            alt: "Value vs. Effort prioritization matrix",
            caption: "Feature prioritization matrix — high value, low effort wins shipped in V1",
          },
        ],
      },
      {
        id: "prototype",
        navLabel: "Prototype & Testing",
        heading: "Prototype & User Testing",
        blocks: [
          {
            type: "paragraph",
            text: "Rather than a static Figma prototype, I worked directly with the developer to build an interactive prototype that users could test hands-on with real data. This surfaced friction that a clickable mock would have missed.",
          },
          { type: "heading", level: 3, text: "The Three Core Flows" },
          {
            type: "flowList",
            items: [
              {
                name: "Select Cohort",
                description: "Define audience filters across wallets, on-chain behaviors, and social metrics",
              },
              {
                name: "Assign to Twitter Audience",
                description: "Sync the cohort directly with Twitter Ads Manager, no manual export",
              },
              {
                name: "Launch & Monitor Campaign",
                description: "Track conversions and engagement across both on-chain and social channels",
              },
            ],
          },
          {
            type: "image",
            src: "/images/project-screenshot.png",
            alt: "Prototype testing session",
            caption: "Testing sessions with 8 early users using the live interactive prototype",
          },
          {
            type: "paragraph",
            text: 'Clients described the experience as **"surprisingly easy"** — even though the underlying workflow involved complex on-chain data queries, multi-platform syncing, and real-time campaign monitoring.',
          },
        ],
      },
      {
        id: "challenge",
        navLabel: "Design Challenges",
        heading: "Design Challenges: When Real Data Arrived",
        blocks: [
          {
            type: "paragraph",
            text: 'Once real data was entered and users started using the product in actual scenarios, unexpected issues surfaced fast. The gap between "designed with dummy data" and "used with real data" was significant.',
          },
          {
            type: "statRow",
            stats: [
              {
                value: "↕→",
                label:
                  "Switched from vertical stacking to horizontal scrolling to handle long data fields without layout breakage on smaller screens",
              },
              {
                value: "⊞",
                label:
                  "Redesigned filters to be scrollable and logically chunked — making complex condition-setting scannable and fast",
              },
            ],
          },
          {
            type: "paragraph",
            text: "Some data fields were far longer than anticipated. The original vertical stacking caused layouts to collapse on mid-size screens. By reorganizing the information architecture and introducing horizontal scrolling for dense data tables, we preserved usability without sacrificing completeness.",
          },
          {
            type: "image",
            src: "/images/project-screenshot.png",
            alt: "Before and after the layout redesign",
            caption: "Layout before and after addressing real-data overflow — horizontal scroll vs. broken vertical stack",
          },
        ],
      },
      {
        id: "design-system",
        navLabel: "Design System",
        heading: "Design System & Branding",
        blocks: [
          {
            type: "paragraph",
            text: "I created the design system from scratch using Material Design as a foundation — customizing it to match the futuristic, trustworthy aesthetic that Web3 marketers respond to.",
          },
          {
            type: "problemCards",
            cards: [
              {
                title: "Atomic Components",
                description:
                  "Cards, filters, inputs, and data visualizations — all built as reusable atoms with consistent states, dark/light variants, and handoff-ready specs.",
              },
              {
                title: "3D Visual Language",
                description:
                  "Used MidJourney to generate custom C4D-style 3D graphics that gave the product a high-tech, futuristic brand feeling distinct from generic SaaS.",
              },
            ],
          },
          {
            type: "image",
            src: "/images/project-screenshot.png",
            alt: "Design system components and 3D brand graphics",
            caption: "Component library and custom MidJourney 3D brand graphics",
          },
        ],
      },
      {
        id: "results",
        navLabel: "Outcomes",
        heading: "Outcomes & Business Impact",
        blocks: [
          {
            type: "outcomeGrid",
            items: [
              {
                emoji: "💰",
                stat: "$1.2M",
                label: "Seed funding directly attributable to the MVP's working prototype",
              },
              {
                emoji: "🌍",
                stat: "3",
                label: "Continents reached by early adopters — Asia, Europe, Americas",
              },
              {
                emoji: "✅",
                stat: "8",
                label: "Users validated in live prototype testing sessions",
              },
            ],
          },
          {
            type: "impactList",
            items: [
              {
                icon: "💰",
                text: "Directly contributed to **$1.2M seed funding** — investors saw the product's potential through the working MVP.",
                href: "https://findit.org.tw/researchPageV2.aspx?pageId=2283",
                linkText: "Read the announcement →",
              },
              {
                icon: "🌍",
                text: "Enabled **client acquisition across 3 continents** — the intuitive interface attracted Web3 founders and marketing managers who previously found on-chain advertising too complex.",
              },
              {
                icon: "🏢",
                text: "**Early adopters:** Flap, DOEX, PrismX, Chainfir Capital",
              },
              {
                icon: "📈",
                text: "Improved **campaign setup success rate** through intuitive data visualization; reduced onboarding time by simplifying complex Web3 workflows.",
              },
            ],
          },
        ],
      },
    ],
    nextCaseStudy: {
      label: "Next Case Study",
      title: "Design for Growth: Influencer Marketing Tool",
      href: "/#works",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
