# Yiting Huang — Portfolio

Personal portfolio site, rebuilt from static HTML/CSS into Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — homepage (Hero, Selected Work, About, Testimonials, Contact)
- `app/case-study/[slug]/page.tsx` — dynamic case study route
- `components/` — page sections and shared UI
- `components/case-study/` — case study layout and content-block renderer
- `data/caseStudies.ts` — typed content for homepage work cards and full case studies; add a new project here without touching layout code
- `data/testimonials.ts` — typed testimonial collage content

## Notes

- Styling uses Tailwind CSS v4 (`app/globals.css` defines the design tokens — colors, spacing — as `@theme` variables) plus a couple of small custom CSS classes for effects Tailwind can't express cleanly (the hero dot-grid texture, per-card rotation combined with a hover lift).
- Scroll-reveal and hover micro-interactions use Framer Motion and respect `prefers-reduced-motion`.
- `legacy-static/` holds the original static HTML/CSS files and design handoff doc for reference; it isn't part of the app.

## Deploy

Deploys to Vercel with zero extra config — connect the repo and it builds out of the box.
