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
  {
    slug: "influencer-marketing-management-tool",
    year: "2024 — 2025",
    title: "Influencer Marketing Management Tools, B2B, SaaS",
    description:
      "Designing viral loops that encouraged sharing, building a browser extension as a new distribution channel, and supporting launches across platforms like Product Hunt.",
    tags: ["Growth", "Plugin"],
    image: "/images/influencer-marketing-hero.png",
    caseStudySlug: "influencer-marketing-tool",
  },
  {
    slug: "coolwallet-pro-rebrand",
    year: "2021",
    title: "Hardware Crypto Wallet: Branding & eCom Redesign",
    description:
      "I helped shape CoolWallet Pro's brand, optimize its eCommerce experience, and bridge product, marketing, and data to drive measurable growth.",
    tags: ["AB Testing", "Marketing", "eCommerce", "Redesign", "Scaleup"],
    image: "/images/coolwallet-hero.png",
    caseStudySlug: "coolwallet-pro",
  },
];

export type CaseStudyBlock =
  | { type: "paragraph"; text: string; href?: string; linkText?: string }
  | { type: "heading"; level: 3; text: string }
  | { type: "bulletList"; items: string[] }
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
  /** Not every case study has a role/team/timeline meta grid or top-line impact stats. */
  meta?: CaseStudyMeta;
  impactStats?: ImpactStat[];
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
      href: "/case-study/influencer-marketing-tool",
    },
  },
  {
    slug: "influencer-marketing-tool",
    title: "Influencer Marketing Management Tools, B2B, SaaS",
    year: "2024 — 2025",
    subtitle:
      "Designing viral loops that encouraged sharing, building a browser extension as a new distribution channel, and supporting launches across platforms like Product Hunt.",
    tags: ["Growth", "Plugin"],
    heroImage: "/images/influencer-marketing-hero.png",
    sections: [
      {
        id: "growth",
        navLabel: "Design for Growth",
        heading: "Design for Growth",
        blocks: [
          {
            type: "paragraph",
            text: "Based on our previous product, we already got some paid users, across East Asia, Europe, and the US. Include Flap, DOEX, PrismX, Chainfir Capital…etc.",
          },
          {
            type: "paragraph",
            text: 'While validating our "all-in-one marketing platform" idea with users, we realized that among all the features, the Influencer Matcher delivered the most value. So we decided to focus on it and turn it into an independent product.',
          },
          {
            type: "paragraph",
            text: "At the same time, we explored distribution by launching on Product Hunt and building a browser extension.",
          },
          {
            type: "paragraph",
            text: "Here, we also designed a sharing flow that lets users share their curated lists, helping the product grow organically.",
          },
          {
            type: "paragraph",
            text: "All-in-one marketing platform case study here →",
            href: "/case-study/web3-marketing-dashboard",
            linkText: "Link",
          },
          {
            type: "image",
            src: "/images/influencer-marketing-product-hunt.png",
            alt: "Growing3 - Influencer Matcher launch page on Product Hunt",
          },
          {
            type: "image",
            src: "/images/influencer-marketing-chrome-store.png",
            alt: "Growing3 - Web3 Influencer Marketing Tool listing on the Chrome Web Store",
          },
        ],
      },
      {
        id: "high-fidelity",
        navLabel: "High-Fidelity Designs in 1 Month",
        heading: "High-Fidelity Designs in 1 Month",
        blocks: [
          {
            type: "paragraph",
            text: "Based on the existing design system I built before, we were able to quickly translate workflows into market-ready designs within 1 month this time (last product was 6 months)",
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
                name: "🦠 Share Curated Lists",
                description: "Easily share influencer lists with teammates or other users.",
              },
            ],
          },
        ],
      },
      {
        id: "responsive",
        navLabel: "Responsive Design",
        heading: "Responsive, dark/light mode",
        blocks: [
          {
            type: "paragraph",
            text: "Responsive, dark/light mode, ensure accessibility and comfort across different devices and environments.",
          },
        ],
      },
      {
        id: "browser-plugin",
        navLabel: "Browser Plugin",
        heading: "Browser Plugin",
        blocks: [
          {
            type: "paragraph",
            text: "Enables users to manage influencer outreach without switching between multiple platforms.",
          },
          {
            type: "paragraph",
            text: "Published on the Chrome Web Store as a marketing channel to increase exposure.",
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
            text: "🔗",
            href: "https://www.figma.com/design/ZIjrmyzkBp9SPsfQ0RPqxR/Influencer-Matcher?node-id=1069-1958&t=PUZafa6fkHXDnTim-1",
            linkText: "Figma files",
          },
          {
            type: "paragraph",
            text: "Password: sleet-halo-weight-herbs",
          },
          {
            type: "image",
            src: "/images/influencer-marketing-figma.png",
            alt: "Figma file showing the Influencer Matcher design system and responsive desktop, tablet, and mobile layouts",
          },
        ],
      },
      {
        id: "takeaways",
        navLabel: "Takeaways",
        heading: "Takeaways",
        blocks: [
          {
            type: "paragraph",
            text: "As a designer, this project pushed me to develop **rapid prototyping skills**—I learned to build interactive prototypes and design plugins that could be tested immediately with users, accelerating the feedback loop dramatically.",
          },
          {
            type: "paragraph",
            text: "I also honed my ability to **design for two different goals simultaneously**: refining existing user flows while exploring entirely new features. This dual-track approach became essential for growth-stage products where you can't just optimize or just innovate—you need both.",
          },
          {
            type: "paragraph",
            text: "Most importantly, I learned that **designing for sustained engagement** requires thinking beyond launch moments. Features need built-in mechanisms that encourage ongoing discovery and sharing, not just initial adoption.",
          },
        ],
      },
    ],
    nextCaseStudy: {
      label: "Next Case Study",
      title: "Hardware Crypto Wallet: Branding & eCom Redesign",
      href: "/case-study/coolwallet-pro",
    },
  },
  {
    slug: "coolwallet-pro",
    title: "Hardware Crypto Wallet: Branding & eCom Redesign",
    year: "CoolBitX/ 2021",
    subtitle:
      "I helped shape CoolWallet Pro's brand, optimize its eCommerce experience, and bridge product, marketing, and data to drive measurable growth.",
    tags: ["AB Testing", "Marketing", "eCommerce", "Redesign", "Scaleup"],
    heroImage: "/images/coolwallet-hero.png",
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        heading: "🧩 Overview",
        blocks: [
          {
            type: "paragraph",
            text: "CoolBitX is a growth-stage startup of secure crypto asset management. After the success of its first product(CoolWallet S), the team expanded into new verticals— **including , DeFi, NFTs, staking, and B2B solutions (CoolWallet Pro)** —aiming to **serve more advanced and diverse use cases.**",
          },
          {
            type: "paragraph",
            text: "I led design efforts on two key initiatives that supported both product evolution and company growth:",
          },
          {
            type: "bulletList",
            items: [
              "**⚡ CoolWallet Pro Rebranding** – Crafting a distinct identity for power users and redefining the brand story",
              "**🛒 Growth-Driven eCommerce Redesign** – Transforming a transactional site into a multifunctional growth engine for users, partners, and investors",
            ],
          },
        ],
      },
      {
        id: "myrole",
        navLabel: "My Role",
        heading: "👩🏻‍💻 My Role",
        blocks: [
          {
            type: "paragraph",
            text: "I worked cross-functionally with teams across marketing, product, customer service, sales, and logistics. My scope covered three key areas:",
          },
          { type: "heading", level: 3, text: "📣 Marketing" },
          {
            type: "bulletList",
            items: [
              "Defined visual tone for global campaigns with marketing leads",
              "Designed landing pages, in-app banners, and social assets",
              "Managed external graphic and motion designers",
            ],
          },
          { type: "heading", level: 3, text: "🛠️ Product" },
          {
            type: "bulletList",
            items: [
              "Built design system and visual identity for CoolWallet Pro",
              "Redesigned eCommerce UX to improve onboarding and conversion",
              "Designed reusable components for new features and product pages",
              "Created physical product assets: card, packaging, accessories, co-branded editions",
            ],
          },
          { type: "heading", level: 3, text: "📊 Data & Optimization" },
          {
            type: "bulletList",
            items: [
              "Led A/B tests and tracked performance via Google Analytics",
              "Used heatmaps and session recordings to guide UX decisions",
              "Improved SEO and localized content for ZH and JP audiences",
            ],
          },
          { type: "heading", level: 3, text: "Tools" },
          {
            type: "bulletList",
            items: [
              "Design: Figma, Adobe Creative Suite",
              "SEO: Semrush, Ahrefs, Google Analytics, and Google Search Console",
              "UX Design: Hotjar, Google Analytics",
            ],
          },
          { type: "heading", level: 3, text: "Team & Collaboration" },
          {
            type: "bulletList",
            items: [
              "🧠 C-Suite",
              "🎨 Me (Web Designer) and Marketing Team",
              "💻 Product Team",
              "📞 Customer Service",
              "📦 Logistics",
              "💼 Sales",
            ],
          },
        ],
      },
      {
        id: "branding",
        navLabel: "Rebranding",
        heading: "New Product Lauch",
        blocks: [
          {
            type: "paragraph",
            text: "To support the launch of CoolWallet Pro—a premium hardware wallet built for advanced users in DeFi, NFTs, and multi-chain ecosystems—we needed a refreshed brand that clearly distinguished it from the original CoolWallet S, not just in Taiwan and the U.S., but across a growing global audience.",
          },
          {
            type: "image",
            src: "/images/coolwallet-product-launch.png",
            alt: "CoolWallet Pro unboxing set and card held in hand",
          },
          { type: "heading", level: 3, text: "Marketing Materials of global expansion" },
          {
            type: "bulletList",
            items: [
              "Aligning stakeholders, defining color, typography, packaging, and card design",
              "**Ensured brand consistency across global digital and physical touchpoints.**",
              "Coordinating with external agencies and freelance creatives to deliver high-quality visuals",
            ],
          },
          {
            type: "image",
            src: "/images/coolwallet-cobranded-cards.png",
            alt: "Fan of co-branded CoolWallet S card designs",
          },
          {
            type: "image",
            src: "/images/coolwallet-marketing-campaigns.png",
            alt: "Grid of CoolWallet Pro marketing campaign banners and co-branded partner cards",
          },
          {
            type: "image",
            src: "/images/coolwallet-influencer-videos.png",
            alt: "Collage of influencer and reviewer video thumbnails across multiple languages",
          },
        ],
      },
      {
        id: "ecom-redesign",
        navLabel: "eCom Redesign",
        heading: "🚀 Growth-Driven eCommerce Redesign",
        blocks: [
          {
            type: "paragraph",
            text: "With the launch of CoolWallet Pro in May 2021, we transformed our eCommerce site from a basic sales channel into a growth engine—designed to educate users, support partners, and boost conversions.",
          },
          {
            type: "paragraph",
            text: "**📈 Key Performance Metrics (June 2021 – March 2022 vs. previous year)**",
          },
          {
            type: "statRow",
            stats: [
              { value: "+294%", label: "increase in website revenue" },
              { value: "+21%", label: "improvement in cart conversion rate" },
              { value: "+124.9%", label: "growth in traffic" },
              { value: "-29.6%", label: "reduction in bounce rate" },
            ],
          },
          {
            type: "image",
            src: "/images/coolwallet-heatmap-analysis.png",
            alt: "Session recordings and heatmap analysis of the CoolWallet Pro product page",
          },
          {
            type: "image",
            src: "/images/coolwallet-revenue-growth.png",
            alt: "416% revenue growth chart for the year of the CoolWallet Pro launch",
          },
        ],
      },
      {
        id: "webdesign",
        navLabel: "Design Process",
        heading: "🧩 Key Web Design Enhancements",
        blocks: [
          {
            type: "bulletList",
            items: [
              "**Mobile Optimization**: Implemented a responsive design with faster load times and intuitive navigation to cater to the increasing mobile user base.",
              "**User Education**: Developed comprehensive product feature pages and in-app service guides to facilitate informed purchasing decisions.",
              "**Checkout Experience**: Streamlined the buying process by simplifying checkout steps and incorporating trust elements like customer reviews.",
              "**Partner Integration**: Highlighted collaborations with retailers and co-branded programs to build credibility and expand reach.",
              "**Localization**: Translated key content into Chinese, Japanese, and Turkish to better serve international markets.",
              "**Data-Driven Iteration**: Leveraged tools like Google Analytics and Clarity for behavioral analysis, enabling continuous A/B testing and SEO optimization.",
              "**Marketing Campaign Integration**: Established a dedicated marketing campaigns section on the website, synchronized with in-app banners, to ensure consistent messaging and enhance user engagement across platforms.",
            ],
          },
          {
            type: "paragraph",
            text: "By focusing on these areas, we aligned user experience improvements directly with business growth objectives, ensuring that design decisions were informed by actionable data and user behavior insights.",
          },
          {
            type: "image",
            src: "/images/coolwallet-website-evolution.png",
            alt: "Evolution of the CoolWallet website across 2019, 2020, and 2021 redesigns, desktop and mobile",
          },
        ],
      },
      {
        id: "takeaway",
        navLabel: "What I Learned",
        heading: "🧠 What I Learned",
        blocks: [
          {
            type: "paragraph",
            text: "Coming from a design background, working closely with marketing taught me how to think beyond usability—to design with business goals in mind. I learned to use data, storytelling, and brand consistency as tools for driving growth. It pushed me to design not just for users, but for outcomes.",
          },
        ],
      },
    ],
    nextCaseStudy: {
      label: "Next Case Study",
      title: "Web3 Marketing Dashboard",
      href: "/case-study/web3-marketing-dashboard",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
