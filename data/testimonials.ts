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
  /** Supports `**bold**` markdown-style spans for emphasis within the quote. */
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  borderColor?: string;
  /** "sticky" renders as a flat colored note (no border/avatar/quote mark), role-first attribution. */
  variant?: "sticky";
}

export interface PhotoTestimonial extends TestimonialBase {
  type: "photo";
  src: string;
  alt: string;
}

export type Testimonial = QuoteTestimonial | PhotoTestimonial;

export const testimonials: Testimonial[] = [
  {
    type: "quote",
    id: "maxine",
    quote:
      "Yiting has a unique ability to translate complex ideas into intuitive, beautifully crafted designs that truly elevate the user experience.",
    author: "Maxine",
    role: "COO, Founder, Growing3",
    avatar: "/images/testimonials/maxine.png",
    borderColor: "#f5c563",
    rotation: -4,
    position: { top: 31, left: 74 },
    zIndex: 3,
  },
  {
    type: "quote",
    id: "bill",
    quote:
      "She has a strong understanding of engineering requirements and quickly responds to requests and questions, ensuring a smooth collaboration process.",
    author: "Bill",
    role: "Senior Developer, Growing3",
    avatar: "/images/testimonials/bill.jpeg",
    borderColor: "#f5c563",
    rotation: 3,
    position: { top: 43, right: 48 },
    zIndex: 6,
  },
  {
    type: "photo",
    id: "portrait",
    src: "/images/yiting_laptop.png",
    alt: "Yiting Huang working at her laptop",
    rotation: -2,
    position: { top: 100, left: 300 },
    zIndex: 9,
  },
  {
    type: "quote",
    id: "kei",
    quote:
      "Beyond her technical skills, she is an incredible team player — always open to feedback, quick to iterate, and generous in sharing knowledge.",
    author: "Kei",
    role: "UXUI Designer, CoolBitX",
    avatar: "/images/testimonials/kei.jpeg",
    borderColor: "#f5c563",
    rotation: -3,
    position: { top: 250, left: 0 },
    zIndex: 4,
  },
  {
    type: "quote",
    id: "henry",
    quote: "She consistently creates the best designs to engage users and enable them to complete purchases smoothly.",
    author: "Henry",
    role: "Marketing Manager, CoolBitX",
    avatar: "/images/testimonials/henry.jpeg",
    borderColor: "#f5c563",
    rotation: 2,
    position: { top: 296, right: 0 },
    zIndex: 7,
  },
  {
    type: "quote",
    id: "james",
    quote:
      "Her deep understanding of Web3 and Blockchain, combined with her ability to design scalable, user-friendly solutions, helped us stand out in a competitive market.",
    author: "James",
    role: "Co-founder and CEO, Growing3",
    avatar: "/images/testimonials/james.jpeg",
    borderColor: "#f5c563",
    rotation: -5,
    position: { top: 430, left: 122 },
    zIndex: 5,
  },
  {
    type: "quote",
    id: "edward",
    quote: "When I pointed out technical limits, she was super open to feedback and quick to adjust without compromising the design…",
    author: "Edward",
    role: "Senior Engineer, CoolBitX",
    avatar: "/images/testimonials/edward.jpeg",
    borderColor: "#f5c563",
    rotation: 4,
    position: { top: 470, right: 148 },
    zIndex: 8,
  },
  {
    type: "quote",
    id: "zoe",
    quote:
      "Growing3 is one of the few marketing tools on the market specifically designed for KOL marketing. It offers highly practical features like client mapping, filtering, and one-click bulk messaging... with one-click bulk messaging, everything is done within 10 minutes, greatly improving my efficiency. **Additionally, the website's UI/UX, keyword research, and its understanding of user logic are exceptionally well-designed.** I've already recommended it to other friends and colleagues.",
    author: "Zoe Yang",
    role: "BD Lead",
    company: "Flap",
    variant: "sticky",
    rotation: 3,
    position: { top: 191, left: 590 },
    zIndex: 2,
  },
  {
    type: "quote",
    id: "vincent",
    quote:
      "Growing3 is a tool that has significantly benefited my work, providing a **seamless overall product experience, especially in terms of user experience**, which left a strong impression on me!",
    author: "Vincent",
    role: "Project Manager",
    company: "PrismX",
    variant: "sticky",
    rotation: -3,
    position: { top: 320, left: 280 },
    zIndex: 1,
  },
];
