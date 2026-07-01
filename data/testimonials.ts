export interface TestimonialPosition {
  top?: number;
  left?: number;
  right?: number;
}

interface TestimonialBase {
  id: string;
  rotation: number;
  position: TestimonialPosition;
  zIndex: number;
}

export interface QuoteTestimonial extends TestimonialBase {
  type: "quote";
  quote: string;
  author: string;
  role: string;
}

export interface StickyTestimonial extends TestimonialBase {
  type: "sticky";
  text: string;
  color: "yellow" | "green";
  width?: number;
}

export interface PhotoTestimonial extends TestimonialBase {
  type: "photo";
  caption: string;
  placeholderLabel: string;
}

export type Testimonial = QuoteTestimonial | StickyTestimonial | PhotoTestimonial;

export const testimonials: Testimonial[] = [
  {
    type: "quote",
    id: "marcus",
    quote:
      "Yiting has a rare ability to ask the right questions before picking up a tool. She untangled our most confusing flow in a single workshop.",
    author: "Marcus W.",
    role: "Head of Product, Chainlink Labs",
    rotation: -3,
    position: { top: 0, left: 0 },
    zIndex: 3,
  },
  {
    type: "photo",
    id: "workshop-photo",
    caption: "Workshop, Berlin 2024",
    placeholderLabel: "team photo",
    rotation: 4,
    position: { top: 20, left: 310 },
    zIndex: 2,
  },
  {
    type: "sticky",
    id: "sticky-experience",
    text: "She doesn't just design screens — she designs the whole experience.",
    color: "yellow",
    rotation: 2.5,
    position: { top: 10, right: 80 },
    zIndex: 4,
  },
  {
    type: "quote",
    id: "sophie",
    quote:
      "Working with Yiting felt like having a true design partner. She challenged our assumptions and brought data to every decision.",
    author: "Sophie L.",
    role: "CEO, Storefront Studio",
    rotation: 1.5,
    position: { top: 200, left: 180 },
    zIndex: 5,
  },
  {
    type: "photo",
    id: "design-review-photo",
    caption: "Design Review, 2023",
    placeholderLabel: "design review",
    rotation: -5,
    position: { top: 310, left: 10 },
    zIndex: 2,
  },
  {
    type: "quote",
    id: "tom",
    quote:
      "The analytics dashboard Yiting redesigned became our most-praised feature. Exceptional eye for hierarchy and density.",
    author: "Tom R.",
    role: "Engineering Lead, DataBridge",
    rotation: -2,
    position: { top: 310, right: 0 },
    zIndex: 3,
  },
  {
    type: "sticky",
    id: "sticky-5star",
    text: "5★ Would hire again and again.",
    color: "green",
    width: 180,
    rotation: -1.5,
    position: { top: 380, left: 390 },
    zIndex: 2,
  },
];
