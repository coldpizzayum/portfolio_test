export interface WorkFeature {
  src: string;
  alt: string;
  title: string;
}

export interface WorkItem {
  slug: string;
  company: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  features: WorkFeature[];
  /** If set, the work card links to /case-study/[caseStudySlug]. */
  caseStudySlug?: string;
}

export const workItems: WorkItem[] = [
  {
    slug: "web3-wallet-defi-dashboard",
    company: "Growing3",
    year: "2023 - 2025",
    title: "Blockchain Marketing Data Dashboard",
    description:
      "As the Founding Product Designer, I led MVP design from concept to launch, helping the team close a $1.2M seed round and acquire 9 paying customers within 6 months.\nGrowing3 is an ad-targeting SaaS for Web3 and blockchain project owners. By mapping on-chain behavior to social media accounts, we helped clients cut CPA by 79% and boost conversions by 376%.",
    tags: ["B2B SaaS", "9 paying customers", "Pre-seed", "MVP"],
    image: "/images/web3-hero.png",
    features: [
      { src: "/images/web3-hero.png", alt: "Growing3 blockchain marketing dashboard", title: "Blockchain data dashboard" },
      { src: "/images/web3-market-research.png", alt: "Competitor ad platform research", title: "Ad campaign outreach" },
      { src: "/images/web3-value-vs-effort.png", alt: "Feature architecture and prioritization diagram", title: "Tracking" },
      { src: "/images/web3-design-system-components.png", alt: "Atomic design system component library", title: "Design system" },
    ],
    caseStudySlug: "web3-marketing-dashboard",
  },
  {
    slug: "influencer-marketing-management-tool",
    company: "Growing3",
    year: "2024 — 2025",
    title: "Influencer Marketing Management Tools, B2B, SaaS",
    description:
      "Designing viral loops that encouraged sharing, building a browser extension as a new distribution channel, and supporting launches across platforms like Product Hunt.",
    tags: ["Growth", "Plugin"],
    image: "/images/influencer-marketing-hero.png",
    features: [
      { src: "/images/influencer-marketing-hero.png", alt: "Influencer Matcher product hero", title: "Hero" },
      { src: "/images/influencer-marketing-product-hunt.png", alt: "Influencer Matcher launch page on Product Hunt", title: "Product Hunt launch" },
      { src: "/images/influencer-marketing-chrome-store.png", alt: "Influencer Matcher Chrome Web Store listing", title: "Chrome extension" },
      { src: "/images/influencer-marketing-figma.png", alt: "Influencer Matcher Figma design system", title: "Figma design system" },
    ],
    caseStudySlug: "influencer-marketing-tool",
  },
  {
    slug: "coolwallet-pro-rebrand",
    company: "CoolBitX",
    year: "2021",
    title: "Hardware Crypto Wallet: Branding & eCom Redesign",
    description:
      "I helped shape CoolWallet Pro's brand, optimize its eCommerce experience, and bridge product, marketing, and data to drive measurable growth.",
    tags: ["AB Testing", "Marketing", "eCommerce", "Redesign", "Scaleup"],
    image: "/images/coolwallet-hero.png",
    features: [
      { src: "/images/coolwallet-hero.png", alt: "CoolWallet Pro hero", title: "Hero" },
      { src: "/images/coolwallet-product-launch.png", alt: "CoolWallet Pro unboxing set and card held in hand", title: "Product launch" },
      { src: "/images/coolwallet-marketing-campaigns.png", alt: "CoolWallet Pro marketing campaign banners", title: "Marketing campaigns" },
      { src: "/images/coolwallet-website-evolution.png", alt: "Evolution of the CoolWallet website across redesigns", title: "Website evolution" },
    ],
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
  | { type: "impactList"; items: { icon: string; text: string; href?: string; linkText?: string }[] }
  | { type: "videoGrid"; videos: { youtubeId: string; title: string; caption?: string }[] };

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
  nextCaseStudy: { label: string; title: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "web3-marketing-dashboard",
    title: "Team's first MVP: All-in-one Marketing Dashboard",
    year: "2023 — 2024",
    subtitle:
      "This case study is about turning our idea into first product, letting investors and users to get what we built and our value fast!",
    metaDescription:
      "As Founding Product Designer for this Web3 marketing dashboard, I led MVP design from concept to launch, helping the team close a $1.2M seed round.",
    tags: ["B2B SaaS", "MarTech", "Data", "Web3", "Blockchain"],
    heroImage: "/images/web3-hero.png",
    meta: {
      role: "I led end-to-end product design. From competitor research, user interviews, to user journey mapping. From building the design system to final MVP delivery.",
      team: [
        { initials: "PM", label: "Product Manager", color: "#f5c563" },
        { initials: "YH", label: "Me (Product Designer)", color: "#c9a96e" },
        { initials: "DC", label: "Developer + CTO", color: "#74c2a0" },
      ],
      timeline: "2023 — 2024",
      tools: "Figma, Notion, ChatGPT, MidJourney",
    },
    impactStats: [
      {
        label: "$1.2M seed round",
        text: "Followed with couple angel rounds. Investors saw what the MVP could do, and backed it.",
      },
      {
        label: "9 paid customers",
        text: "Within 6 months, we landed 9 paid customers across 3 continents, including XREX and Sorare, plus early adopters like Flap, DOEX, PrismX, and Chainfir Capital.",
      },
    ],
    sections: [
      {
        id: "problem",
        navLabel: "The Problem",
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "There was nothing like this on the market. No one had built a tool that let Web3 marketers target ads using wallet behavior.",
          },
          {
            type: "paragraph",
            text: "That meant we couldn't just copy an existing product. **We had to help users trust something they'd never seen before, what our filtering meant, and why wallet data actually worked.**",
          },
          {
            type: "paragraph",
            text: "Before this, our team built audience lists by hand and handed them off to clients. Our job was to turn that manual hand-off into something users could do on their own.",
          },
        ],
      },
      {
        id: "research",
        navLabel: "Research",
        heading: "Research",
        blocks: [
          { type: "heading", level: 3, text: "We borrowed patterns marketers already knew" },
          {
            type: "paragraph",
            text: "We didn't want users to learn a whole new tool just because it was Web3. So we based our UI on ad platforms marketers already used every day, like Web2 tools they were familiar with.",
          },
          { type: "heading", level: 3, text: "Talking to users, over and over" },
          {
            type: "paragraph",
            text: "The hardest part was explaining how our on-chain filtering worked, in a way non-technical marketers could actually get. So we ran a lot of user interviews. We also built a simple design system that let us snap different UI flows together fast, like Lego, and test them with real users right away. That's how we turned a messy, confusing user journey into something we could actually design for.",
          },
        ],
      },
      {
        id: "results",
        navLabel: "Results",
        heading: "Results",
        blocks: [
          {
            type: "paragraph",
            text: "We broke the whole journey down into 3 simple steps, so users never felt lost:",
          },
          {
            type: "flowList",
            items: [
              {
                name: "Select Cohort",
                description: "Set filters by wallet, behavior, and social activity",
              },
              {
                name: "Assign to Twitter Audience",
                description: "Sync it straight to Twitter Ads Manager",
              },
              {
                name: "Launch & Monitor Campaign",
                description: "Watch conversions and engagement roll in",
              },
            ],
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
        ],
      },
      {
        id: "what-we-got-wrong",
        navLabel: "Iterations",
        heading: "Iterations",
        blocks: [
          { type: "heading", level: 3, text: "Filters: vertical vs. horizontal" },
          {
            type: "paragraph",
            text: 'Our first version stacked filters vertically. It looked clean. But users got confused, they couldn\'t tell if the conditions were "and this too" or "then this next." Once real data came in, things got messier. The algorithm and the UI were being built at the same time, so every change on one side meant more changes on the other. We ended up rebuilding the filter layout more than once to keep up.',
          },
          { type: "heading", level: 3, text: "Branding, added last" },
          {
            type: "paragraph",
            text: "Once the core flow felt right, we layered the branding on top. For a Web3 audience, this mattered more than it might for other products. Look too generic, and people don't trust you with their wallet.",
          },
        ],
      },
      {
        id: "feedback-impact",
        navLabel: "Feedback",
        heading: "Feedback",
        blocks: [],
      },
    ],
    nextCaseStudy: {
      label: "Next Case Study",
      title: "Influencer Marketing Management Tools, B2B, SaaS",
      href: "/case-study/influencer-marketing-tool",
    },
  },
  {
    slug: "influencer-marketing-tool",
    title: "Influencer Marketing Management Tools, B2B, SaaS",
    year: "2024 — 2025",
    subtitle:
      "Designing viral loops that encouraged sharing, building a browser extension as a new distribution channel, and supporting launches across platforms like Product Hunt.",
    metaDescription:
      "For this B2B SaaS platform, I designed viral growth loops and a browser extension distribution channel, supporting a successful Product Hunt launch.",
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
    metaDescription:
      "I redesigned the brand and eCommerce experience for CoolWallet Pro, a Series B crypto hardware wallet, driving growth across Europe, Japan, Korea, Americas.",
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
      title: "Web3 Marketing Dashboard, B2B, SaaS",
      href: "/case-study/web3-marketing-dashboard",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
