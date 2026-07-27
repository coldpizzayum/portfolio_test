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
  avatar: string;
  borderColor: string;
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
    borderColor: "var(--color-card-sand)",
    rotation: -4,
    position: { top: 0, left: 20 },
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
    borderColor: "var(--color-card-sage)",
    rotation: 4,
    position: { top: 0, right: 20 },
    zIndex: 3,
  },
  {
    type: "photo",
    id: "portrait",
    src: "/images/self-intro-poster.jpg",
    alt: "Yiting Huang",
    rotation: -2,
    position: { top: 140, left: 380 },
    zIndex: 6,
  },
  {
    type: "quote",
    id: "kei",
    quote:
      "Beyond her technical skills, she is an incredible team player — always open to feedback, quick to iterate, and generous in sharing knowledge.",
    author: "Kei",
    role: "UXUI Designer, CoolBitX",
    avatar: "/images/testimonials/kei.jpeg",
    borderColor: "var(--color-card-slate)",
    rotation: 3,
    position: { top: 190, left: 0 },
    zIndex: 2,
  },
  {
    type: "quote",
    id: "henry",
    quote: "She consistently creates the best designs to engage users and enable them to complete purchases smoothly.",
    author: "Henry",
    role: "Marketing Manager, CoolBitX",
    avatar: "/images/testimonials/henry.jpeg",
    borderColor: "var(--color-card-sand)",
    rotation: 2,
    position: { top: 190, right: 0 },
    zIndex: 2,
  },
  {
    type: "quote",
    id: "james",
    quote:
      "Her deep understanding of Web3 and Blockchain, combined with her ability to design scalable, user-friendly solutions, helped us stand out in a competitive market.",
    author: "James",
    role: "Co-founder and CEO, Growing3",
    avatar: "/images/testimonials/james.jpeg",
    borderColor: "var(--color-card-sage)",
    rotation: -3,
    position: { top: 390, left: 60 },
    zIndex: 4,
  },
  {
    type: "quote",
    id: "edward",
    quote: "When I pointed out technical limits, she was super open to feedback and quick to adjust without compromising the design…",
    author: "Edward",
    role: "Senior Engineer, CoolBitX",
    avatar: "/images/testimonials/edward.jpeg",
    borderColor: "var(--color-card-slate)",
    rotation: 3,
    position: { top: 390, right: 60 },
    zIndex: 4,
  },
];
