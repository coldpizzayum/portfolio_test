export interface WorkItem {
  slug: string;
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
    title: "Designing Web3 Marketing Dashboard: 0 to 1",
    description:
      "Turned our audience-building algorithm into a self-serve product, letting Web3 marketers generate their own audiences and manage campaigns end to end.",
    tags: ["B2B", "Pre-seed", "9-paying users", "Data-heavy UXUI"],
    image: "/images/web3-hero.png",
    caseStudySlug: "web3-marketing-dashboard",
  },
  {
    slug: "influencer-marketing-management-tool",
    title: "Turning a Feature Into a SaaS Product",
    description:
      "A self-serve tool for influencer marketing that filled a gap in the platform, complete with SaaS pricing and onboarding.",
    tags: ["B2B", "SaaS", "Pivot"],
    image: "/images/influencer-marketing-hero.png",
    caseStudySlug: "influencer-marketing-tool",
  },
  {
    slug: "coolwallet-pro-rebrand",
    title: "Global Expansion: branding & eCommerce redesign",
    description: "Led CoolWallet Pro's brand and eCommerce redesign, helping the product expand into global market.",
    tags: ["AB Testing", "Marketing", "eCommerce", "Redesign", "Scaleup"],
    image: "/images/coolwallet-hero.png",
    caseStudySlug: "coolwallet-pro",
  },
];

export type CaseStudyBlock =
  | { type: "paragraph"; text: string; href?: string; linkText?: string }
  | { type: "heading"; level: 3; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "statRow"; stats: { value: string; label: string }[] }
  | { type: "flowList"; items: { name: string; description: string }[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "videoGrid"; videos: { youtubeId: string; title: string; caption?: string }[] }
  | {
      type: "imageCollage";
      items: { src: string; alt: string; top: string; left: string; width: string; rotate: number; z: number }[];
    }
  | {
      type: "feedbackGrid";
      cards: {
        /** Star rating (1-5) — presence of this field marks the card as a testimonial rather than a press mention. */
        rating?: number;
        eyebrow?: string;
        headline?: string;
        /** Supports `**bold**` markdown-style spans. */
        quote?: string;
        photo?: string;
        photoAlt?: string;
        name?: string;
        role?: string;
        date?: string;
        href?: string;
      }[];
    };

export interface CaseStudySection {
  id: string;
  navLabel: string;
  heading: string;
  blocks: CaseStudyBlock[];
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
    year: "2023 — 2024",
    subtitle:
      "Designed a platform from 0 to 1, turning our on-chain wallet behavior analysis, mapping wallets to social accounts to build audiences, into a clear, tangible product that both users and investors could understand and use.",
    metaDescription:
      "As Founding Product Designer for this Web3 marketing dashboard, I led MVP design from concept to launch, helping the team close a $1.2M seed round.",
    tags: ["B2B", "Pre-seed", "9-paying users", "Data-heavy UXUI"],
    heroImage: "/images/web3-hero.png",
    meta: {
      role: "I led end-to-end product design, from competitor research and user interviews, to user journey mapping, building the design system, and high-fidelity design hand-off.",
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
        label: "Traction",
        text: "9 paid customers across 3 continents, including XREX and Sorare, plus early adopters like Flap, DOEX, PrismX, and Chainfir Capital. Clients saw 79% lower cost per acquisition and 376% more conversions.",
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
            text: "Ad platforms like Twitter target audiences using demographics and interests, signals that come from how people behave on social media. Web3 audiences are based on what wallets actually do on-chain: what tokens they hold, what they've traded, what protocols they've used.",
          },
        ],
      },
      {
        id: "problem",
        navLabel: "The Problem",
        heading: "1. The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Our team built audience packages by hand, analyzing wallet behavior and putting together a list for each client individually, then handing it off for them to run ads. My job was to turn that service into something clients could do themselves, so the company could actually scale like a SaaS product, not an agency.",
          },
          {
            type: "paragraph",
            text: "The logic behind how we mapped wallet behavior wasn't simple to explain: what our filtering meant, and why wallet data actually worked.",
          },
        ],
      },
      {
        id: "research",
        navLabel: "Research",
        heading: "2. Research & User Interviews",
        blocks: [
          {
            type: "paragraph",
            text: "First we started with patterns marketers already knew from Web2 ad platforms, and used them to quickly piece together a first version to test with users.",
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
        ],
      },
      {
        id: "challenges",
        navLabel: "Challenges",
        heading: "3. Challenges",
        blocks: [
          {
            type: "paragraph",
            text: "The hardest part was on-chain filtering: finding audiences based on what wallets actually do, what tokens they hold, what they've traded, what contracts they've interacted with, helping the marketers understand this and guide them through the process of setting it.",
          },
          { type: "heading", level: 3, text: "#1 Select your cohorts" },
          {
            type: "paragraph",
            text: "Marketers stacked filter conditions, wallet holdings, transaction behavior, social metrics, and only found out the result at the final step. Sometimes the audience was too narrow to run a real campaign. Sometimes it was too broad to be targeted at all. Either way, they'd already spent several steps building a filter before learning it didn't work.",
          },
          {
            type: "paragraph",
            text: "We surfaced an estimated audience size as users added each filter, instead of waiting until the end. If a combination pushed the number into a risky zone, we flagged it right there, as they were building it. And if someone still reached the end with an audience that didn't work, they didn't have to start over, they could jump back to any step and watch the estimate update live.",
          },
          { type: "heading", level: 3, text: "#2 A black box across systems" },
          {
            type: "paragraph",
            text: "From a user's point of view, the chain from our platform to Twitter was invisible. If a sync was slow or failed partway, they had no way to tell whether the problem was ours or Twitter's, and no way to know if their audience was actually ready to run ads against.",
          },
          {
            type: "paragraph",
            text: "We designed a visible status for every audience, fetched, processed, synced, so users could see exactly where things stood.",
          },
        ],
      },
      {
        id: "feedback-impact",
        navLabel: "Feedbacks and Impacts",
        heading: "Feedbacks and Impacts",
        blocks: [
          {
            type: "feedbackGrid",
            cards: [
              {
                rating: 5,
                quote:
                  "Growing3 is a tool that has significantly benefited my work, providing a **seamless overall product experience, especially in terms of user experience**, which left a strong impression on me!",
                name: "Project Manager",
                role: "Vincent@PrismX",
              },
              {
                eyebrow: "AppWorks (Demo Day #26 Press Release)",
                headline: "Growing3 Selected for AppWorks Accelerator #26",
                quote:
                  "Growing3 leverages on-chain data analytics and marketing technology to help clients improve conversion performance and reduce acquisition costs, showcasing the growth potential of web3 marketing applications.",
                date: "Jul 4, 2023",
                href: "https://appworks.tw/demo-day-26-en/",
              },
              {
                eyebrow: "Alibaba Cloud Project",
                headline: "Growing3 was selected in the Alibaba Cloud Global Startup Accelerator",
                date: "May 24, 2023",
                href: "https://kr-asia.com/intelligence-indeed-and-feiliu-tech-named-asia-stars-of-the-alibaba-cloud-x-krasia-global-startup-accelerator-hangzhou-demo-day",
              },
              {
                eyebrow: "500 Global",
                headline: "Growing3 was selected for the startup accelerator program run by 500 Global",
                quote:
                  "[...] The team provides growth solutions for Web3 projects (such as blockchain, games, DApps, and NFTs), leveraging on-chain and off-chain data analytics to help projects acquire and retain quality users across marketing, growth strategy, analytics, and marTech.",
                date: "Jul 18, 2023",
                href: "https://www.media-outreach.com/news/taiwan/2023/07/18/233599/500-global-and-taiwan-tech-arena-tta-to-power-third-cohort-of-startups-to-aim-for-next-level-growth/",
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
    title: "Global Expansion: branding & eCommerce redesign",
    year: "CoolBitX/ 2021",
    subtitle: "Led CoolWallet Pro's brand and eCommerce redesign, helping the product expand into global market.",
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
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
