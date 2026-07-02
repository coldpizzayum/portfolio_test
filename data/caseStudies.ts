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
    title: "Web3 Marketing Dashboard, B2B, SaaS",
    description:
      "As the Founding Product Designer, I led the MVP design from concept to launch, contributing to the team's $1.2M seed funding round.",
    tags: ["MVP", "Design System", "User Research"],
    image: "/images/web3-hero.png",
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
    title: "Web3 Marketing Dashboard, B2B, SaaS",
    year: "2023 — 2024",
    subtitle:
      "As the Founding Product Designer, I led the MVP design from concept to launch, contributing to the team's $1.2M seed funding round.",
    tags: ["MVP", "Design System", "User Research"],
    heroImage: "/images/web3-hero.png",
    sections: [
      {
        id: "overview",
        navLabel: "My Goal & Role",
        heading: "Goal: First MVP",
        blocks: [
          {
            type: "paragraph",
            text: "The team reached out to me to help turn their manual agency service into a SaaS tool.",
          },
          {
            type: "paragraph",
            text: "The goal is to build a platform for Web3 project owners or marketers to streamlines their marketing workflow, all in one place.",
          },
          { type: "heading", level: 3, text: "👩🏻‍💻 My Role" },
          {
            type: "bulletList",
            items: [
              "Supported product discovery and competitor research",
              "Designed MVP for first proof-of-concept (POC)",
              "Ran testing sessions with early users",
              "Built the design system from scratch",
            ],
          },
          { type: "heading", level: 3, text: "Tools" },
          {
            type: "bulletList",
            items: ["Figma", "Notion", "ChatGPT", "MidJourney"],
          },
          { type: "heading", level: 3, text: "Team" },
          {
            type: "bulletList",
            items: ["🧠 1 Product Manager", "🎨 Me (Product Designer)", "💻 1 Engineer"],
          },
        ],
      },
      {
        id: "discovery",
        navLabel: "Market Research",
        heading: "🔍 Discovery & Market Research",
        blocks: [
          {
            type: "paragraph",
            text: "To validate the opportunity and know what to build, my product manager and I had:",
          },
          {
            type: "researchSteps",
            steps: [
              {
                title: "Demo calls with competitors and related products",
                description:
                  "Ad management platforms (e.g., Meta Ads Manager, Twitter Ads, Google Ads), marketing automation tools (e.g., HubSpot, Mailchimp, ActiveCampaign), Customer Data Platforms (CDPs) (e.g., Segment, Amplitude, 神策數據), growth marketing tools (e.g., Branch, AppsFlyer, Mixpanel), and Web3 marketing dashboards (e.g., DappRadar, Galxe, Zapper).",
              },
              {
                title: "Analysis of public customer reviews",
                description: "From G2 and X.",
              },
              {
                title: "Feedbacks from investors, accelerator mentors, and existing clients",
                description: "",
              },
            ],
          },
          {
            type: "image",
            src: "/images/web3-market-research.png",
            alt: "Competitor tool screenshots and public customer reviews from G2",
          },
          { type: "heading", level: 3, text: "Takeaways" },
          {
            type: "paragraph",
            text: "Users were frustrated with switching between different platforms—some were synced, others weren't. This highlighted the need for a single place to manage ad audiences, campaigns, and performance tracking, fully in sync with X (Twitter).",
          },
        ],
      },
      {
        id: "features",
        navLabel: "Value vs. Effort",
        heading: "📊 Value vs. Effort",
        blocks: [
          {
            type: "paragraph",
            text: "Before moving forward, the PM, a developer, and I met to evaluate the technical and business feasibility of each feature, ensuring we were building something both valuable and achievable.",
          },
          {
            type: "image",
            src: "/images/web3-value-vs-effort.png",
            alt: "Feature architecture diagram and value vs. effort prioritization matrix",
          },
        ],
      },
      {
        id: "prototype",
        navLabel: "Prototype & User Testing",
        heading: "🧪 Prototyping & User Testing",
        blocks: [
          {
            type: "paragraph",
            text: "Rather than a Figma prototype, I directly work with our developer to build a interactive prototype that users could test hands-on.",
          },
          {
            type: "paragraph",
            text: "*2026 update: I now use Lovable to build interactive prototype.",
          },
          { type: "heading", level: 3, text: "Key Flows:" },
          {
            type: "flowList",
            items: [
              {
                name: "Select Cohort",
                description: "Define audience filters across wallets, behaviors, and social metrics",
              },
              {
                name: "Assign to Twitter Audience",
                description: "Sync directly with Twitter Ads Manager",
              },
              {
                name: "Launch & Monitor Campaign",
                description: "Track conversions and engagement",
              },
            ],
          },
        ],
      },
      {
        id: "challenge",
        navLabel: "Desin Challenges",
        heading: "😵 Design Challenge: Once Real Data Came In",
        blocks: [
          {
            type: "paragraph",
            text: "Once real data was entered and users started using the product in real scenarios, many unexpected issues surfaced. For example, some data fields were much longer than anticipated, and the original vertical stacking caused the layout to break on smaller screens.",
          },
          {
            type: "paragraph",
            text: "To address this, we revisited the UI and reorganized the data structure.",
          },
          {
            type: "bulletList",
            items: [
              "**Switched from vertical stacking to horizontal scrolling** to save space and improve usability on limited screen sizes.",
              "**Redesigned filters to be scrollable and logically chunked**, making it easier for users to scan and adjust complex conditions.",
            ],
          },
          {
            type: "paragraph",
            text: 'Clients described the experience as **"surprisingly easy,"** even though the underlying workflow was highly complex.',
          },
          {
            type: "image",
            src: "/images/web3-design-challenge.png",
            alt: "Before and after redesigning the filter conditions layout from vertical stacking to horizontal scrolling",
          },
        ],
      },
      {
        id: "design-system",
        navLabel: "Design System",
        heading: "🧱 Design System & Branding",
        blocks: [
          {
            type: "paragraph",
            text: "I created a design system with Material Design UI to ensure visual consistency and better design handoff.",
          },
          {
            type: "bulletList",
            items: [
              "**Customized atomic components **(cards, filters, inputs)",
              "Used **MidJourney** to generate custom 3D, C4D graphics to create a **futuristic brand feelings.**",
            ],
          },
          {
            type: "image",
            src: "/images/web3-design-system-components.png",
            alt: "Atomic component library: badges, checkboxes, menus, buttons, bottom app bars, navigation bars, dialogs, search, and cards",
          },
          {
            type: "image",
            src: "/images/web3-design-system-tokens.png",
            alt: "Typography scale and light/dark theme color tokens",
          },
          {
            type: "image",
            src: "/images/web3-design-system-3d-product.png",
            alt: "All-in-One Marketing Tool product screens styled with custom 3D MidJourney graphics",
          },
          {
            type: "image",
            src: "/images/web3-design-system-3d-moodboard.png",
            alt: "MidJourney-generated iridescent 3D object mood board",
          },
          {
            type: "image",
            src: "/images/web3-design-system-brand-refs.png",
            alt: "Competitor brand identity references",
          },
          {
            type: "image",
            src: "/images/web3-design-system-dashboard-refs.png",
            alt: "Dashboard UI pattern references",
          },
        ],
      },
      {
        id: "results",
        navLabel: "Outcomes & Business Impacts",
        heading: "Design Impact on Users",
        blocks: [
          {
            type: "bulletList",
            items: [
              "✅ **Reduced onboarding time** by simplifying complex Web3 workflows",
              "✅ **Improved campaign setup success rate** through intuitive data visualization",
              "✅ **Validated with 8 users** in live prototype testing",
            ],
          },
          { type: "heading", level: 3, text: "Design Impact on Business" },
          {
            type: "impactList",
            items: [
              {
                icon: "💰",
                text: "**Directly contributed to $1.2M seed funding**, investors saw the product's potential through the working MVP",
                href: "https://findit.org.tw/researchPageV2.aspx?pageId=2283",
                linkText: "Read the announcement",
              },
              {
                icon: "🌍",
                text: "**Enabled client acquisition across 3 continents** — the intuitive interface attracted Web3 founders, marketing managers, and BD teams who previously found on-chain advertising too complex",
              },
              {
                icon: "🏢",
                text: "**Early adopters:** Flap, DOEX, PrismX, Chainfir Capital",
              },
            ],
          },
        ],
      },
      {
        id: "next-up",
        navLabel: "Next Up: Design for Growth",
        heading: "📌 Next Up: Design for Growth",
        blocks: [
          {
            type: "paragraph",
            text: "After establishing the product foundation, I shifted focus to growth-stage design challenges—optimizing existing experiences and exploring new features to expand the user base.",
          },
          {
            type: "paragraph",
            text: "→ See how I approached this in the",
            href: "/case-study/influencer-marketing-tool",
            linkText: "Influencer Marketing Tool case study",
          },
        ],
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
      title: "Web3 Marketing Dashboard, B2B, SaaS",
      href: "/case-study/web3-marketing-dashboard",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
