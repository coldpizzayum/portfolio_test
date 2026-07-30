# Site Copy Export

掃描範圍：`/app`、`/components`、`/data` 底下所有 `.tsx`/`.ts`/`.jsx`/`.js` 檔案。依照頁面順序排列：Global（每頁共用）→ Home（含 Works 區塊）→ Case Study 詳情頁 → AI Projects → About Me → 目前沒有被使用到的元件。

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|

## Global（每頁共用：Header / Footer / 全站 Metadata）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| app/layout.tsx | Metadata > title (default) | Yiting Huang — Product Designer | |
| app/layout.tsx | Metadata > title (template) | %s — Yiting Huang | |
| app/layout.tsx | Metadata > description | Yiting Huang is a Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce. | |
| app/layout.tsx | Metadata > openGraph.title | Yiting Huang — Product Designer | |
| app/layout.tsx | Metadata > openGraph.description | Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce. | |
| app/layout.tsx | Metadata > twitter.title | Yiting Huang — Product Designer | |
| app/layout.tsx | Metadata > twitter.description | Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce. | |
| components/Header.tsx | Nav > Logo 文字 | Yiting H. | |
| components/Header.tsx | Nav > 選單項目 | Home | |
| components/Header.tsx | Nav > 選單項目 | Works | |
| components/Header.tsx | Nav > 選單項目 | Ai Projects | |
| components/Header.tsx | Nav > 選單項目 | About Me | |
| components/Header.tsx | Nav > 按鈕（手機版 Say Hello） | Say Hello | |
| components/Header.tsx | Nav > 按鈕（桌機版 Say Hello） | Say Hello | |
| components/Footer.tsx | Footer > 標題 | Let's connect! | |
| components/Footer.tsx | Footer > 內文 | Whether it's a full-time role, a contract project, or just a design conversation — my inbox is always open. | |
| components/Footer.tsx | Footer > 按鈕 | Schedule a chat | |
| components/Footer.tsx | Footer > 按鈕（預設狀態） | Copy my email | |
| components/Footer.tsx | Footer > 按鈕（複製後狀態） | Copied! | |
| components/Footer.tsx | Footer > 當地時間標籤前綴 | Berlin | |
| components/Footer.tsx | Footer > 連結欄標題 | Links | |
| components/Footer.tsx | Footer > 連結欄項目 | Resume | |
| components/Footer.tsx | Footer > 連結欄項目 | LinkedIn | |
| components/Footer.tsx | Footer > 連結欄項目 | GitHub | |
| components/Footer.tsx | Footer > Nav 欄標題 | Nav. | |
| components/Footer.tsx | Footer > Nav 欄項目 | Works | |
| components/Footer.tsx | Footer > Nav 欄項目 | Ai Projects | |
| components/Footer.tsx | Footer > Nav 欄項目 | About Me | |
| components/Footer.tsx | Footer > 版權文字 | © 2026 Yiting Huang. All rights reserved. | |

## Home（`/`）

### Hero（components/Hero.tsx）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/Hero.tsx | Hero > 主標題（第一行） | Hi, I'm Yiting. | |
| components/Hero.tsx | Hero > 主標題（第二行，淺色） | Product Designer & Builder. | |
| components/Hero.tsx | Hero > 副標題 | 5+ years in startups, from pre-seed to Series B. I turn complex ideas into lovable design, and help drive GTM strategy. I've designed for: | |
| components/Hero.tsx | Hero > 標籤 pill | eCom | |
| components/Hero.tsx | Hero > 標籤 pill | B2B | |
| components/Hero.tsx | Hero > 標籤 pill | FinTech | |
| components/Hero.tsx | Hero > 標籤 pill | MarTech | |
| components/Hero.tsx | Hero > 標籤 pill | Web3 | |
| components/Hero.tsx | Hero > 標籤 pill | Blockchain | |
| components/Hero.tsx | Hero > 扇形卡片「Recent work」標題 | Recent work | |
| components/Hero.tsx | Hero > 扇形卡片「Recent work」內文 | My career's mostly in blockchain and Web3. I take complex tech problems and turn them into something people actually understand and like. | |
| components/Hero.tsx | Hero > 扇形卡片「Recent work」CTA | Recent case studies | |
| components/Hero.tsx | Hero > 扇形卡片「Build with Ai」標題 | Build with Ai | |
| components/Hero.tsx | Hero > 扇形卡片「Build with Ai」內文 | I use AI to build prototypes and full products. Recently won a prize at the Berlin AI Builder Hackathon. | |
| components/Hero.tsx | Hero > 扇形卡片「Build with Ai」CTA | Projects I'm building | |
| components/Hero.tsx | Hero > 扇形卡片「About Me」標題 | About Me | |
| components/Hero.tsx | Hero > 扇形卡片「About Me」內文 | 5+ years of industry experience, backed by a design education. Still just as into the craft as day one. | |
| components/Hero.tsx | Hero > 扇形卡片「About Me」CTA | My story | |

### Ai Projects 區塊（首頁內嵌，components/AiProjectsSection.tsx）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/AiProjectsSection.tsx | Ai Projects 區塊 > 標題（2 行） | I work with AI to…<br>build prototype | |
| components/AiProjectsSection.tsx | Ai Projects 區塊 > 內文 | I use AI to build fast, from prototype to real product, with real users. I'm always exploring how AI can change how I work. | |
| components/AiProjectsSection.tsx | Ai Projects 區塊 > 斜體說明 | What I've been shipping lately - pulled from GitHub and Claude Code. | |
| components/AiProjectsSection.tsx | Ai Projects 區塊 > 按鈕 | Ai Project | |
| components/AiProjectsSection.tsx | Ai Projects 區塊 > 按鈕 | GitHub | |
| components/ActivityHeatmap.tsx | Ai Projects 區塊 > 熱力圖切換 tab | GitHub | |
| components/ActivityHeatmap.tsx | Ai Projects 區塊 > 熱力圖切換 tab | Claude Code | |
| components/ActivityHeatmap.tsx | Ai Projects 區塊 > 熱力圖年份標籤 | YEAR | |

### Works / Selected Works（components/WorkSection.tsx，`id="works"`）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/WorkSection.tsx | Works > Eyebrow | Portfolio | |
| components/WorkSection.tsx | Works > 標題 | Selected Works | |
| components/WorkSection.tsx | Works > 連結 | View all projects | |
| components/WorkCard.tsx | Work card > CTA（3 張卡片共用同一段文字） | View case study → | |
| data/caseStudies.ts | Work card 1 > 標題 | Web3 Marketing Dashboard, B2B, SaaS | |
| data/caseStudies.ts | Work card 1 > 內文 | As the Founding Product Designer, I led the MVP design from concept to launch, contributing to the team's $1.2M seed funding round. | |
| data/caseStudies.ts | Work card 1 > 標籤 | MVP | |
| data/caseStudies.ts | Work card 1 > 標籤 | Design System | |
| data/caseStudies.ts | Work card 1 > 標籤 | User Research | |
| data/caseStudies.ts | Work card 2 > 標題 | Influencer Marketing Management Tools, B2B, SaaS | |
| data/caseStudies.ts | Work card 2 > 內文 | Designing viral loops that encouraged sharing, building a browser extension as a new distribution channel, and supporting launches across platforms like Product Hunt. | |
| data/caseStudies.ts | Work card 2 > 標籤 | Growth | |
| data/caseStudies.ts | Work card 2 > 標籤 | Plugin | |
| data/caseStudies.ts | Work card 3 > 標題 | Hardware Crypto Wallet: Branding & eCom Redesign | |
| data/caseStudies.ts | Work card 3 > 內文 | I helped shape CoolWallet Pro's brand, optimize its eCommerce experience, and bridge product, marketing, and data to drive measurable growth. | |
| data/caseStudies.ts | Work card 3 > 標籤 | AB Testing | |
| data/caseStudies.ts | Work card 3 > 標籤 | Marketing | |
| data/caseStudies.ts | Work card 3 > 標籤 | eCommerce | |
| data/caseStudies.ts | Work card 3 > 標籤 | Redesign | |
| data/caseStudies.ts | Work card 3 > 標籤 | Scaleup | |

### Testimonials（components/TestimonialsSection.tsx + data/testimonials.ts）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/TestimonialsSection.tsx | Testimonials > 標題 | What's it like working with me? | |
| components/TestimonialsSection.tsx | Testimonials > 副標題 | By working hard and being kind — amazing things happen. | |
| data/testimonials.ts | Testimonials > Maxine 引言 | Yiting has a unique ability to translate complex ideas into intuitive, beautifully crafted designs that truly elevate the user experience. | |
| data/testimonials.ts | Testimonials > Maxine 職稱 | COO, Founder, Growing3 | |
| data/testimonials.ts | Testimonials > Bill 引言 | She has a strong understanding of engineering requirements and quickly responds to requests and questions, ensuring a smooth collaboration process. | |
| data/testimonials.ts | Testimonials > Bill 職稱 | Senior Developer, Growing3 | |
| data/testimonials.ts | Testimonials > 大頭照 alt text | Yiting Huang working at her laptop | |
| data/testimonials.ts | Testimonials > Kei 引言 | Beyond her technical skills, she is an incredible team player — always open to feedback, quick to iterate, and generous in sharing knowledge. | |
| data/testimonials.ts | Testimonials > Kei 職稱 | UXUI Designer, CoolBitX | |
| data/testimonials.ts | Testimonials > Henry 引言 | She consistently creates the best designs to engage users and enable them to complete purchases smoothly. | |
| data/testimonials.ts | Testimonials > Henry 職稱 | Marketing Manager, CoolBitX | |
| data/testimonials.ts | Testimonials > James 引言 | Her deep understanding of Web3 and Blockchain, combined with her ability to design scalable, user-friendly solutions, helped us stand out in a competitive market. | |
| data/testimonials.ts | Testimonials > James 職稱 | Co-founder and CEO, Growing3 | |
| data/testimonials.ts | Testimonials > Edward 引言 | When I pointed out technical limits, she was super open to feedback and quick to adjust without compromising the design… | |
| data/testimonials.ts | Testimonials > Edward 職稱 | Senior Engineer, CoolBitX | |
| data/testimonials.ts | Testimonials > Zoe（便利貼）引言 | Growing3 is one of the few marketing tools on the market specifically designed for KOL marketing. It offers highly practical features like client mapping, filtering, and one-click bulk messaging... with one-click bulk messaging, everything is done within 10 minutes, greatly improving my efficiency. **Additionally, the website's UI/UX, keyword research, and its understanding of user logic are exceptionally well-designed.** I've already recommended it to other friends and colleagues. | |
| data/testimonials.ts | Testimonials > Zoe 職稱 | BD Lead | |
| data/testimonials.ts | Testimonials > Zoe 公司 | Flap | |
| data/testimonials.ts | Testimonials > Vincent（便利貼）引言 | Growing3 is a tool that has significantly benefited my work, providing a **seamless overall product experience, especially in terms of user experience**, which left a strong impression on me! | |
| data/testimonials.ts | Testimonials > Vincent 職稱 | Project Manager | |
| data/testimonials.ts | Testimonials > Vincent 公司 | PrismX | |

### A bit about me（components/AboutTeaser.tsx）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/AboutTeaser.tsx | About Teaser > Eyebrow | A bit about me | |
| components/AboutTeaser.tsx | About Teaser > 標題（2 行） | Design is how I think.<br>I build with AI to prove it. | |
| components/AboutTeaser.tsx | About Teaser > 照片 alt text | Yiting rock climbing on the coast | |
| components/AboutTeaser.tsx | About Teaser > 內文 | 9 years shaped by design — 4 years studying industrial design, 5 years building products in the industry. I love figuring out what users need and making it lovable. | |
| components/AboutTeaser.tsx | About Teaser > 按鈕 | Learn More About Yiting | |

## Case Study 詳情頁（`/case-study/[slug]`，由 Works 卡片點進去）

### Case Study 1：Web3 Marketing Dashboard（data/caseStudies.ts, slug: web3-marketing-dashboard）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| data/caseStudies.ts | CS1 > 標題 | Web3 Marketing Dashboard, B2B, SaaS | |
| data/caseStudies.ts | CS1 > 副標題 | As the Founding Product Designer, I led the MVP design from concept to launch, contributing to the team's $1.2M seed funding round. | |
| data/caseStudies.ts | CS1 > Section「Goal: First MVP」段落1 | The team reached out to me to help turn their manual agency service into a SaaS tool. | |
| data/caseStudies.ts | CS1 > Section「Goal: First MVP」段落2 | The goal is to build a platform for Web3 project owners or marketers to streamlines their marketing workflow, all in one place. | |
| data/caseStudies.ts | CS1 > 小標題 | 👩🏻‍💻 My Role | |
| data/caseStudies.ts | CS1 > My Role 條列 | Supported product discovery and competitor research | |
| data/caseStudies.ts | CS1 > My Role 條列 | Designed MVP for first proof-of-concept (POC) | |
| data/caseStudies.ts | CS1 > My Role 條列 | Ran testing sessions with early users | |
| data/caseStudies.ts | CS1 > My Role 條列 | Built the design system from scratch | |
| data/caseStudies.ts | CS1 > 小標題 | Tools | |
| data/caseStudies.ts | CS1 > Tools 條列 | Figma | |
| data/caseStudies.ts | CS1 > Tools 條列 | Notion | |
| data/caseStudies.ts | CS1 > Tools 條列 | ChatGPT | |
| data/caseStudies.ts | CS1 > Tools 條列 | MidJourney | |
| data/caseStudies.ts | CS1 > 小標題 | Team | |
| data/caseStudies.ts | CS1 > Team 條列 | 🧠 1 Product Manager | |
| data/caseStudies.ts | CS1 > Team 條列 | 🎨 Me (Product Designer) | |
| data/caseStudies.ts | CS1 > Team 條列 | 💻 1 Engineer | |
| data/caseStudies.ts | CS1 > Section 標題 | 🔍 Discovery & Market Research | |
| data/caseStudies.ts | CS1 > Discovery 段落 | To validate the opportunity and know what to build, my product manager and I had: | |
| data/caseStudies.ts | CS1 > Research step | Demo calls with competitors and related products — Ad management platforms (e.g., Meta Ads Manager, Twitter Ads, Google Ads), marketing automation tools (e.g., HubSpot, Mailchimp, ActiveCampaign), Customer Data Platforms (CDPs) (e.g., Segment, Amplitude, 神策數據), growth marketing tools (e.g., Branch, AppsFlyer, Mixpanel), and Web3 marketing dashboards (e.g., DappRadar, Galxe, Zapper). | |
| data/caseStudies.ts | CS1 > Research step | Analysis of public customer reviews — From G2 and X. | |
| data/caseStudies.ts | CS1 > Research step | Feedbacks from investors, accelerator mentors, and existing clients | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Competitor tool screenshots and public customer reviews from G2 | |
| data/caseStudies.ts | CS1 > 小標題 | Takeaways | |
| data/caseStudies.ts | CS1 > Takeaways 段落 | Users were frustrated with switching between different platforms—some were synced, others weren't. This highlighted the need for a single place to manage ad audiences, campaigns, and performance tracking, fully in sync with X (Twitter). | |
| data/caseStudies.ts | CS1 > Section 標題 | 📊 Value vs. Effort | |
| data/caseStudies.ts | CS1 > Value vs Effort 段落 | Before moving forward, the PM, a developer, and I met to evaluate the technical and business feasibility of each feature, ensuring we were building something both valuable and achievable. | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Feature architecture diagram and value vs. effort prioritization matrix | |
| data/caseStudies.ts | CS1 > Section 標題 | 🧪 Prototyping & User Testing | |
| data/caseStudies.ts | CS1 > Prototype 段落1 | Rather than a Figma prototype, I directly work with our developer to build a interactive prototype that users could test hands-on. | |
| data/caseStudies.ts | CS1 > Prototype 段落2 | *2026 update: I now use Lovable to build interactive prototype. | |
| data/caseStudies.ts | CS1 > 小標題 | Key Flows: | |
| data/caseStudies.ts | CS1 > Flow 項目 | Select Cohort — Define audience filters across wallets, behaviors, and social metrics | |
| data/caseStudies.ts | CS1 > Flow 項目 | Assign to Twitter Audience — Sync directly with Twitter Ads Manager | |
| data/caseStudies.ts | CS1 > Flow 項目 | Launch & Monitor Campaign — Track conversions and engagement | |
| data/caseStudies.ts | CS1 > Section 標題 | 😵 Design Challenge: Once Real Data Came In | |
| data/caseStudies.ts | CS1 > Challenge 段落1 | Once real data was entered and users started using the product in real scenarios, many unexpected issues surfaced. For example, some data fields were much longer than anticipated, and the original vertical stacking caused the layout to break on smaller screens. | |
| data/caseStudies.ts | CS1 > Challenge 段落2 | To address this, we revisited the UI and reorganized the data structure. | |
| data/caseStudies.ts | CS1 > Challenge 條列 | **Switched from vertical stacking to horizontal scrolling** to save space and improve usability on limited screen sizes. | |
| data/caseStudies.ts | CS1 > Challenge 條列 | **Redesigned filters to be scrollable and logically chunked**, making it easier for users to scan and adjust complex conditions. | |
| data/caseStudies.ts | CS1 > Challenge 段落3 | Clients described the experience as **"surprisingly easy,"** even though the underlying workflow was highly complex. | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Before and after redesigning the filter conditions layout from vertical stacking to horizontal scrolling | |
| data/caseStudies.ts | CS1 > Section 標題 | 🧱 Design System & Branding | |
| data/caseStudies.ts | CS1 > Design System 段落 | I created a design system with Material Design UI to ensure visual consistency and better design handoff. | |
| data/caseStudies.ts | CS1 > Design System 條列 | **Customized atomic components **(cards, filters, inputs) | |
| data/caseStudies.ts | CS1 > Design System 條列 | Used **MidJourney** to generate custom 3D, C4D graphics to create a **futuristic brand feelings.** | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Atomic component library: badges, checkboxes, menus, buttons, bottom app bars, navigation bars, dialogs, search, and cards | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Typography scale and light/dark theme color tokens | |
| data/caseStudies.ts | CS1 > 圖片 alt text | All-in-One Marketing Tool product screens styled with custom 3D MidJourney graphics | |
| data/caseStudies.ts | CS1 > 圖片 alt text | MidJourney-generated iridescent 3D object mood board | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Competitor brand identity references | |
| data/caseStudies.ts | CS1 > 圖片 alt text | Dashboard UI pattern references | |
| data/caseStudies.ts | CS1 > Section 標題 | Design Impact on Users | |
| data/caseStudies.ts | CS1 > Impact 條列 | ✅ **Reduced onboarding time** by simplifying complex Web3 workflows | |
| data/caseStudies.ts | CS1 > Impact 條列 | ✅ **Improved campaign setup success rate** through intuitive data visualization | |
| data/caseStudies.ts | CS1 > Impact 條列 | ✅ **Validated with 8 users** in live prototype testing | |
| data/caseStudies.ts | CS1 > 小標題 | Design Impact on Business | |
| data/caseStudies.ts | CS1 > Impact list 項目 | 💰 **Directly contributed to $1.2M seed funding**, investors saw the product's potential through the working MVP（連結文字：Read the announcement） | |
| data/caseStudies.ts | CS1 > Impact list 項目 | 🌍 **Enabled client acquisition across 3 continents** — the intuitive interface attracted Web3 founders, marketing managers, and BD teams who previously found on-chain advertising too complex | |
| data/caseStudies.ts | CS1 > Impact list 項目 | 🏢 **Early adopters:** Flap, DOEX, PrismX, Chainfir Capital | |
| data/caseStudies.ts | CS1 > Section 標題 | 📌 Next Up: Design for Growth | |
| data/caseStudies.ts | CS1 > Next Up 段落 | After establishing the product foundation, I shifted focus to growth-stage design challenges—optimizing existing experiences and exploring new features to expand the user base. | |
| data/caseStudies.ts | CS1 > Next Up 連結文字 | → See how I approached this in the（連結文字：Influencer Marketing Tool case study） | |
| data/caseStudies.ts | CS1 > 下一篇案例標籤 | Next Case Study | |

### Case Study 2：Influencer Marketing Management Tools（slug: influencer-marketing-tool）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| data/caseStudies.ts | CS2 > 標題 | Influencer Marketing Management Tools, B2B, SaaS | |
| data/caseStudies.ts | CS2 > 副標題 | Designing viral loops that encouraged sharing, building a browser extension as a new distribution channel, and supporting launches across platforms like Product Hunt. | |
| data/caseStudies.ts | CS2 > Section 標題 | Design for Growth | |
| data/caseStudies.ts | CS2 > 段落 | Based on our previous product, we already got some paid users, across East Asia, Europe, and the US. Include Flap, DOEX, PrismX, Chainfir Capital…etc. | |
| data/caseStudies.ts | CS2 > 段落 | While validating our "all-in-one marketing platform" idea with users, we realized that among all the features, the Influencer Matcher delivered the most value. So we decided to focus on it and turn it into an independent product. | |
| data/caseStudies.ts | CS2 > 段落 | At the same time, we explored distribution by launching on Product Hunt and building a browser extension. | |
| data/caseStudies.ts | CS2 > 段落 | Here, we also designed a sharing flow that lets users share their curated lists, helping the product grow organically. | |
| data/caseStudies.ts | CS2 > 段落（連結） | All-in-one marketing platform case study here →（連結文字：Link） | |
| data/caseStudies.ts | CS2 > 圖片 alt text | Growing3 - Influencer Matcher launch page on Product Hunt | |
| data/caseStudies.ts | CS2 > 圖片 alt text | Growing3 - Web3 Influencer Marketing Tool listing on the Chrome Web Store | |
| data/caseStudies.ts | CS2 > Section 標題 | High-Fidelity Designs in 1 Month | |
| data/caseStudies.ts | CS2 > 段落 | Based on the existing design system I built before, we were able to quickly translate workflows into market-ready designs within 1 month this time (last product was 6 months) | |
| data/caseStudies.ts | CS2 > 段落 | Here are some key flows to streamline influencer outreach: | |
| data/caseStudies.ts | CS2 > Flow 項目 | Search & Discover — Find and filter influencers that match your niche and goals. | |
| data/caseStudies.ts | CS2 > Flow 項目 | Analyze Follower Networks — Explore followers and followings to build a tailored influencer list. | |
| data/caseStudies.ts | CS2 > Flow 項目 | Track Keyword Mentions — Identify influencers talking about your chosen keywords on X (Twitter). | |
| data/caseStudies.ts | CS2 > Flow 項目 | Bulk Outreach — Contact hundreds of influencers at once to save time and scale outreach. | |
| data/caseStudies.ts | CS2 > Flow 項目 | 🦠 Share Curated Lists — Easily share influencer lists with teammates or other users. | |
| data/caseStudies.ts | CS2 > Section 標題 | Responsive, dark/light mode | |
| data/caseStudies.ts | CS2 > 段落 | Responsive, dark/light mode, ensure accessibility and comfort across different devices and environments. | |
| data/caseStudies.ts | CS2 > Section 標題 | Browser Plugin | |
| data/caseStudies.ts | CS2 > 段落 | Enables users to manage influencer outreach without switching between multiple platforms. | |
| data/caseStudies.ts | CS2 > 段落 | Published on the Chrome Web Store as a marketing channel to increase exposure. | |
| data/caseStudies.ts | CS2 > Section 標題 | Figma File | |
| data/caseStudies.ts | CS2 > 段落 | Organized design system and responsive layouts. | |
| data/caseStudies.ts | CS2 > 連結文字 | 🔗（連結文字：Figma files） | |
| data/caseStudies.ts | CS2 > 段落 | Password: sleet-halo-weight-herbs | |
| data/caseStudies.ts | CS2 > 圖片 alt text | Figma file showing the Influencer Matcher design system and responsive desktop, tablet, and mobile layouts | |
| data/caseStudies.ts | CS2 > Section 標題 | Takeaways | |
| data/caseStudies.ts | CS2 > 段落 | As a designer, this project pushed me to develop **rapid prototyping skills**—I learned to build interactive prototypes and design plugins that could be tested immediately with users, accelerating the feedback loop dramatically. | |
| data/caseStudies.ts | CS2 > 段落 | I also honed my ability to **design for two different goals simultaneously**: refining existing user flows while exploring entirely new features. This dual-track approach became essential for growth-stage products where you can't just optimize or just innovate—you need both. | |
| data/caseStudies.ts | CS2 > 段落 | Most importantly, I learned that **designing for sustained engagement** requires thinking beyond launch moments. Features need built-in mechanisms that encourage ongoing discovery and sharing, not just initial adoption. | |
| data/caseStudies.ts | CS2 > 下一篇案例標籤 | Next Case Study | |

### Case Study 3：Hardware Crypto Wallet: Branding & eCom Redesign（slug: coolwallet-pro）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| data/caseStudies.ts | CS3 > 標題 | Hardware Crypto Wallet: Branding & eCom Redesign | |
| data/caseStudies.ts | CS3 > 副標題 | I helped shape CoolWallet Pro's brand, optimize its eCommerce experience, and bridge product, marketing, and data to drive measurable growth. | |
| data/caseStudies.ts | CS3 > Section 標題 | 🧩 Overview | |
| data/caseStudies.ts | CS3 > 段落 | CoolBitX is a growth-stage startup of secure crypto asset management. After the success of its first product(CoolWallet S), the team expanded into new verticals— **including , DeFi, NFTs, staking, and B2B solutions (CoolWallet Pro)** —aiming to **serve more advanced and diverse use cases.** | |
| data/caseStudies.ts | CS3 > 段落 | I led design efforts on two key initiatives that supported both product evolution and company growth: | |
| data/caseStudies.ts | CS3 > 條列 | **⚡ CoolWallet Pro Rebranding** – Crafting a distinct identity for power users and redefining the brand story | |
| data/caseStudies.ts | CS3 > 條列 | **🛒 Growth-Driven eCommerce Redesign** – Transforming a transactional site into a multifunctional growth engine for users, partners, and investors | |
| data/caseStudies.ts | CS3 > Section 標題 | 👩🏻‍💻 My Role | |
| data/caseStudies.ts | CS3 > 段落 | I worked cross-functionally with teams across marketing, product, customer service, sales, and logistics. My scope covered three key areas: | |
| data/caseStudies.ts | CS3 > 小標題 | 📣 Marketing | |
| data/caseStudies.ts | CS3 > 條列 | Defined visual tone for global campaigns with marketing leads | |
| data/caseStudies.ts | CS3 > 條列 | Designed landing pages, in-app banners, and social assets | |
| data/caseStudies.ts | CS3 > 條列 | Managed external graphic and motion designers | |
| data/caseStudies.ts | CS3 > 小標題 | 🛠️ Product | |
| data/caseStudies.ts | CS3 > 條列 | Built design system and visual identity for CoolWallet Pro | |
| data/caseStudies.ts | CS3 > 條列 | Redesigned eCommerce UX to improve onboarding and conversion | |
| data/caseStudies.ts | CS3 > 條列 | Designed reusable components for new features and product pages | |
| data/caseStudies.ts | CS3 > 條列 | Created physical product assets: card, packaging, accessories, co-branded editions | |
| data/caseStudies.ts | CS3 > 小標題 | 📊 Data & Optimization | |
| data/caseStudies.ts | CS3 > 條列 | Led A/B tests and tracked performance via Google Analytics | |
| data/caseStudies.ts | CS3 > 條列 | Used heatmaps and session recordings to guide UX decisions | |
| data/caseStudies.ts | CS3 > 條列 | Improved SEO and localized content for ZH and JP audiences | |
| data/caseStudies.ts | CS3 > 小標題 | Tools | |
| data/caseStudies.ts | CS3 > 條列 | Design: Figma, Adobe Creative Suite | |
| data/caseStudies.ts | CS3 > 條列 | SEO: Semrush, Ahrefs, Google Analytics, and Google Search Console | |
| data/caseStudies.ts | CS3 > 條列 | UX Design: Hotjar, Google Analytics | |
| data/caseStudies.ts | CS3 > 小標題 | Team & Collaboration | |
| data/caseStudies.ts | CS3 > 條列 | 🧠 C-Suite | |
| data/caseStudies.ts | CS3 > 條列 | 🎨 Me (Web Designer) and Marketing Team | |
| data/caseStudies.ts | CS3 > 條列 | 💻 Product Team | |
| data/caseStudies.ts | CS3 > 條列 | 📞 Customer Service | |
| data/caseStudies.ts | CS3 > 條列 | 📦 Logistics | |
| data/caseStudies.ts | CS3 > 條列 | 💼 Sales | |
| data/caseStudies.ts | CS3 > Section 標題 | New Product Lauch | |
| data/caseStudies.ts | CS3 > 段落 | To support the launch of CoolWallet Pro—a premium hardware wallet built for advanced users in DeFi, NFTs, and multi-chain ecosystems—we needed a refreshed brand that clearly distinguished it from the original CoolWallet S, not just in Taiwan and the U.S., but across a growing global audience. | |
| data/caseStudies.ts | CS3 > 圖片 alt text | CoolWallet Pro unboxing set and card held in hand | |
| data/caseStudies.ts | CS3 > 小標題 | Marketing Materials of global expansion | |
| data/caseStudies.ts | CS3 > 條列 | Aligning stakeholders, defining color, typography, packaging, and card design | |
| data/caseStudies.ts | CS3 > 條列 | **Ensured brand consistency across global digital and physical touchpoints.** | |
| data/caseStudies.ts | CS3 > 條列 | Coordinating with external agencies and freelance creatives to deliver high-quality visuals | |
| data/caseStudies.ts | CS3 > 圖片 alt text | Fan of co-branded CoolWallet S card designs | |
| data/caseStudies.ts | CS3 > 圖片 alt text | Grid of CoolWallet Pro marketing campaign banners and co-branded partner cards | |
| data/caseStudies.ts | CS3 > 圖片 alt text | Collage of influencer and reviewer video thumbnails across multiple languages | |
| data/caseStudies.ts | CS3 > Section 標題 | 🚀 Growth-Driven eCommerce Redesign | |
| data/caseStudies.ts | CS3 > 段落 | With the launch of CoolWallet Pro in May 2021, we transformed our eCommerce site from a basic sales channel into a growth engine—designed to educate users, support partners, and boost conversions. | |
| data/caseStudies.ts | CS3 > 段落 | **📈 Key Performance Metrics (June 2021 – March 2022 vs. previous year)** | |
| data/caseStudies.ts | CS3 > 數據 | +294% — increase in website revenue | |
| data/caseStudies.ts | CS3 > 數據 | +21% — improvement in cart conversion rate | |
| data/caseStudies.ts | CS3 > 數據 | +124.9% — growth in traffic | |
| data/caseStudies.ts | CS3 > 數據 | -29.6% — reduction in bounce rate | |
| data/caseStudies.ts | CS3 > 圖片 alt text | Session recordings and heatmap analysis of the CoolWallet Pro product page | |
| data/caseStudies.ts | CS3 > 圖片 alt text | 416% revenue growth chart for the year of the CoolWallet Pro launch | |
| data/caseStudies.ts | CS3 > Section 標題 | 🧩 Key Web Design Enhancements | |
| data/caseStudies.ts | CS3 > 條列 | **Mobile Optimization**: Implemented a responsive design with faster load times and intuitive navigation to cater to the increasing mobile user base. | |
| data/caseStudies.ts | CS3 > 條列 | **User Education**: Developed comprehensive product feature pages and in-app service guides to facilitate informed purchasing decisions. | |
| data/caseStudies.ts | CS3 > 條列 | **Checkout Experience**: Streamlined the buying process by simplifying checkout steps and incorporating trust elements like customer reviews. | |
| data/caseStudies.ts | CS3 > 條列 | **Partner Integration**: Highlighted collaborations with retailers and co-branded programs to build credibility and expand reach. | |
| data/caseStudies.ts | CS3 > 條列 | **Localization**: Translated key content into Chinese, Japanese, and Turkish to better serve international markets. | |
| data/caseStudies.ts | CS3 > 條列 | **Data-Driven Iteration**: Leveraged tools like Google Analytics and Clarity for behavioral analysis, enabling continuous A/B testing and SEO optimization. | |
| data/caseStudies.ts | CS3 > 條列 | **Marketing Campaign Integration**: Established a dedicated marketing campaigns section on the website, synchronized with in-app banners, to ensure consistent messaging and enhance user engagement across platforms. | |
| data/caseStudies.ts | CS3 > 段落 | By focusing on these areas, we aligned user experience improvements directly with business growth objectives, ensuring that design decisions were informed by actionable data and user behavior insights. | |
| data/caseStudies.ts | CS3 > 圖片 alt text | Evolution of the CoolWallet website across 2019, 2020, and 2021 redesigns, desktop and mobile | |
| data/caseStudies.ts | CS3 > Section 標題 | 🧠 What I Learned | |
| data/caseStudies.ts | CS3 > 段落 | Coming from a design background, working closely with marketing taught me how to think beyond usability—to design with business goals in mind. I learned to use data, storytelling, and brand consistency as tools for driving growth. It pushed me to design not just for users, but for outcomes. | |
| data/caseStudies.ts | CS3 > 下一篇案例標籤 | Next Case Study | |

### Case Study 頁面共用元件

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/case-study/CaseStudyView.tsx | Case Study > 返回連結 | ← Back to Work | |
| components/case-study/CaseStudyView.tsx | Case Study > Meta 標籤 | My Role | |
| components/case-study/CaseStudyView.tsx | Case Study > Meta 標籤 | Team | |
| components/case-study/CaseStudyView.tsx | Case Study > Meta 標籤 | Timeline | |
| components/case-study/CaseStudyView.tsx | Case Study > Meta 標籤 | Tools | |
| components/case-study/CaseStudySideNav.tsx | Case Study > 側邊導覽標題 | On This Page | |

## AI Projects（`/ai-projects`，目前顯示 Coming soon）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| app/ai-projects/page.tsx | Ai Projects 頁 > Eyebrow | Ai Projects | |
| components/ComingSoon.tsx | Ai Projects 頁 > 標題 | Coming soon. | |
| app/ai-projects/page.tsx | Ai Projects 頁 > 說明文字 | I'm putting together a collection of AI-related experiments and case studies. Check back shortly. | |

## About Me（`/about`）

### Hero（app/about/page.tsx）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| app/about/page.tsx | About hero > 段落1 | 👋 Hello everyone,<br>After graduating from design school, I started my career at a tech startup with an international team building products in emerging technologies, particularly blockchain. Working with people from diverse backgrounds pushed me to learn fast, think broadly, and grow both professionally and personally. | |
| app/about/page.tsx | About hero > 段落2 | In 2022, I joined a fully remote team, which gave me the opportunity to travel and explore different cultures and tech ecosystems. Over the next two years, I lived and worked in New York 🗽, Amsterdam 🇳🇱, Berlin 🇩🇪, and Tokyo 🇯🇵, staying in each city for one to three months. | |
| app/about/page.tsx | About hero > 段落3 | In 2025, inspired by the people I met and the connections I built along the way, I moved to Berlin 🇩🇪 to focus, build, and start the next chapter of my career. | |
| app/about/page.tsx | About hero > 照片 alt text | Yiting smiling | |

### My journey（components/JourneyTimeline.tsx）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/JourneyTimeline.tsx | My journey > 標題 | My journey | |
| components/JourneyTimeline.tsx | My journey > 簡介 | I'm a Product Designer from Taiwan 🇹🇼. Now based in Berlin 🇩🇪. | |
| components/JourneyTimeline.tsx | My journey > 按鈕 | My Resume | |
| components/JourneyTimeline.tsx | My journey > 徽章 1 | 25~ | |
| components/JourneyTimeline.tsx | My journey > 時間軸1 日期地點 | 11/2025 \| Present \| Berlin, Germany | |
| components/JourneyTimeline.tsx | My journey > 時間軸1 職稱 | Product Designer & Builder, Freelance | |
| components/JourneyTimeline.tsx | My journey > 時間軸1 內文 | Working Holiday Visa in Germany,  I spent some time traveling around Europe, along the way, I freelance and built. | |
| components/JourneyTimeline.tsx | My journey > 時間軸1 條列 | Built an AI inventory management system for a metal manufacturer. | |
| components/JourneyTimeline.tsx | My journey > 時間軸1 條列 | Won "Best Use of AskNews API" at AI Builders Hackathon Berlin. | |
| components/JourneyTimeline.tsx | My journey > 徽章 2 | 23-25 | |
| components/JourneyTimeline.tsx | My journey > 時間軸2 日期地點 | 03/2023 \| 03/2025 \| Taipei, Taiwan | |
| components/JourneyTimeline.tsx | My journey > 時間軸2 職稱 | Founding Product Designer, Growing3 | |
| components/JourneyTimeline.tsx | My journey > 時間軸2 內文 | Working as a founding product designer in pre-seed startup, I helped them build their first MVP, building design system, marketing, and constantly building prototype to explore business 機會 | |
| components/JourneyTimeline.tsx | My journey > 時間軸2 條列 | Design AD targeting platform | |
| components/JourneyTimeline.tsx | My journey > 時間軸2 條列 | Design Influencer Marketing platfrom | |
| components/JourneyTimeline.tsx | My journey > 時間軸3 日期地點 | 03/2023 \| 03/2025 \| Taipei, Taiwan | |
| components/JourneyTimeline.tsx | My journey > 時間軸3 職稱 | UXUI Designer, CoolBitX | |
| components/JourneyTimeline.tsx | My journey > 時間軸3 內文 | As a UXUI designer in a series B startup, I help them redesign eCom website, localize product experience and create conhensive visual design system across differenct channel. | |
| components/JourneyTimeline.tsx | My journey > 時間軸3 條列 | CoolWallet Pro launch branding | |
| components/JourneyTimeline.tsx | My journey > 時間軸3 條列 | eCommerce redesign | |
| components/JourneyTimeline.tsx | My journey > 時間軸4 日期地點 | 03/2023 \| 03/2025 \| Taipei, Taiwan | |
| components/JourneyTimeline.tsx | My journey > 時間軸4 職稱 | B.S. Industrial Design, National Taiwan University of Science and Technology | |
| components/JourneyTimeline.tsx | My journey > 時間軸4 內文 | Taiwan's equivalent of a Technical University (TU), top-ranked for technology and design. | |

### What I do outside of work（components/OutsideWork.tsx）

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/OutsideWork.tsx | Outside of work > 標題 | What I do outside of work. | |
| components/OutsideWork.tsx | Outside of work > 小標題1 | I'm a Hustle Dancer | |
| components/OutsideWork.tsx | Outside of work > 內文1 | I started dancing at 20, and I found Hustle in 2020, since than I have been traveling around the world for communities.<br>I'm a bit shy, but through learning and building things with other passionate people,  I connect, grow, and find meaning in my life. That sense of progress and shared energy is what keeps me motivated over time. | |
| components/OutsideWork.tsx | Outside of work > 小標題2 | I enjoy explore different way of human movements | |
| components/OutsideWork.tsx | Outside of work > 內文2 | Start with dancing, I find the beauty of exploring different ways of movements, I have spent years training Capoeira, acrobatics, CrossFit and lately, I started rock climbing. | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Group photo with the ADPList community on the grass | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Dancing on a colorfully lit dance floor | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Friends gathered around a table at an outdoor cafe | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Group photo with the ADPList community in a park | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Group photo in Capoeira uniforms | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Climbing an outdoor bouldering wall | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Hustle dancing with a partner | |
| components/OutsideWork.tsx | Outside of work > 照片 alt text | Lifting weights at the gym | |

## 目前沒有被任何頁面使用到的元件（僅供參考，需要你確認是否列入）

`components/AboutSection.tsx` 這個檔案還在 repo 裡，但目前沒有任何頁面 import 它（`/about` 頁面現在用的是 app/about/page.tsx + JourneyTimeline + OutsideWork）。以下文字如果之後要重新啟用這個元件才會用到：

| 檔案路徑 | 區塊 / 元件名稱 | 目前文字 | 修改後文字（留空） |
|---|---|---|---|
| components/AboutSection.tsx | （未使用）About me > Eyebrow | Background | |
| components/AboutSection.tsx | （未使用）About me > 標題 | About me | |
| components/AboutSection.tsx | （未使用）About me > 內文 | I'm a Product Designer based in Berlin with over five years of experience designing digital products that people genuinely enjoy using. My work spans Web3, B2B SaaS, and eCommerce — always centred on the intersection of clear thinking, visual craft, and user empathy. | |
| components/AboutSection.tsx | （未使用）About me > 內文 | I believe great design is quiet. It doesn't shout — it makes complex things feel obvious, and ordinary interactions feel considered. I work closely with engineers and product managers to bring ideas from messy ambiguity to shipped reality. | |
| components/AboutSection.tsx | （未使用）About me > 內文 | When I'm not at my desk I'm wandering Berlin's flea markets, hunting for mid-century furniture, or exploring a new country with an embarrassingly full camera roll. | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊標籤 | Location | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊值 | Berlin, Germany | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊標籤 | Experience | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊值 | 5+ years | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊標籤 | Domains | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊值 | Web3 · B2B SaaS · eCommerce | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊標籤 | Tools | |
| components/AboutSection.tsx | （未使用）About me > 詳細資訊值 | Figma · Maze · Notion | |
