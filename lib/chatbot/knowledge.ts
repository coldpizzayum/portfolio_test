/**
 * Knowledge base for the site's AI chat widget — plain text, dropped
 * straight into the chat API's system prompt (see app/api/chat/route.ts).
 * "System prompt version," not RAG: this whole file is small enough to
 * fit in every request's context, no vector DB / retrieval step needed.
 *
 * Every fact below is pulled from what's already public on this site
 * (app/about/page.tsx, components/JourneyTimeline.tsx, components/Hero.tsx,
 * data/caseStudies.ts) — nothing invented, nothing beyond what a visitor
 * could already read on the pages themselves. Keep it that way: when the
 * site's copy changes, update this file to match rather than letting it
 * drift into its own, possibly-stale version of the story.
 *
 * Update this by hand — there's no build step that regenerates it from
 * the page content automatically.
 */
export const KNOWLEDGE_BASE = `
# About Yiting Huang

Yiting is a Product Designer from Taiwan, now based in Berlin, Germany.
5+ years in startups, from pre-seed to Series B — designs, builds, and
markets. She's spent most of her career at startups working on blockchain,
Web3, and more recently AI products.

She started her career at a tech startup in Taiwan, working with an
international team on blockchain products. In 2022 she joined a fully
remote team and spent two years living and working in New York, Amsterdam,
Berlin, and Tokyo. In 2025 she decided to settle in Berlin.

Outside of work: she's a Hustle dancer (started dancing at 20, discovered
Hustle in 2020, has traveled for it and met people through Hustle
communities around the world), and has also tried Capoeira, acrobatics,
CrossFit, and more recently rock climbing.

## Career timeline

- **2025 – Present, Berlin** — Product Designer & Builder, Freelance.
  Exploring how AI can be used in real products; currently designing and
  building an AI-powered inventory management system for a metal
  manufacturer. Also joined the AI Builders Hackathon in Berlin, where her
  team won "Best Use of AskNews API."
- **2023 – 2025, Taipei** — Founding Product Designer, Growing3. Joined as
  the company's first designer when it was still pre-seed — set up the
  first MVP, talked to users, built the design system as the product grew,
  and worked closely with the founders turning early ideas into things
  they could test with real users.
- **2019 – 2022, Taipei** — UX/UI Designer, CoolBitX. Her first job in
  tech; designed for a global product across product, eCommerce, and
  brand as the company expanded into Europe, Japan, and Korea. Introduced
  tools like Hotjar and A/B testing to connect design decisions to real
  numbers.
- **2014 – 2018, Taipei** — B.S. Industrial Design, National Taiwan
  University of Science and Technology (NTUST). Took psychology courses
  alongside design, which is part of what drew her toward UX.

# Case studies

## Web3 marketing dashboard (Growing3, 2023–2024)
Designed a blockchain data dashboard that turns complex on-chain data into
actionable marketing audiences — turning Growing3's manual
audience-building service into a self-serve product, letting Web3
marketers generate their own audiences and manage campaigns end to end.
Role: led end-to-end product design (research, user journeys, prototyping,
design system, handoff), as Founding Product Designer, alongside 1 Product
Manager and 1 Developer/CTO. Tags: B2B, Blockchain & Web3, Data Heavy,
Pre-seed. Impact: helped the team close a $1.2M seed round (plus multiple
angel investments), and land 9 paid customers across 3 continents,
including XREX and Sorare, with early adopters like Flap, DOEX, PrismX, and
Chainfir Capital.

## eCommerce redesign (CoolWallet Pro / CoolBitX, 2021)
Redesigned CoolWallet's (a crypto hardware wallet) eCommerce experience to
support expansion into new products, markets (Europe, Japan, Korea), and
business growth — driving 4x revenue growth as the product expanded. Tags:
eCommerce, Redesign, Blockchain, Marketing, FinTech, B2C. Measured outcome
stats from the redesign included improvements of +416%, +34.9%, +16.97%,
and +124.9% across different funnel/conversion metrics.

## Influencer marketing tool (2024–2025)
Designed a self-serve influencer marketing product from product strategy
to launch — a SaaS platform and browser plugin to simplify influencer
discovery and campaign workflows. Tags: B2B, Data Heavy, Blockchain &
Web3, SaaS, Plugin, Marketing.

## AI German learning app (personal project, 2026)
Built her own AI-powered app that turns her German class notes into
vocabulary cards and real-life scenario practice she can do anywhere —
started because she wanted to practice German on the go between classes.
Designed and built solo, using AI throughout the process (Claude, Figma,
Mobbin, Supabase, Vercel). Tags: AI, Mobile App, 0 to 1.

# Contact

Yiting is open to full-time, founding, and freelance roles. Visitors can
reach her by email at yitinghuang.design@gmail.com, or find her resume and
LinkedIn linked from the site's footer.
`.trim();
