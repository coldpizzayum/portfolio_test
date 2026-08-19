export interface TestimonialPosition {
  top?: number;
  left?: number;
  right?: number;
}

interface TestimonialBase {
  id: string;
  rotation: number;
  /** Absolute placement within the collage container — matches the
   *  production layout (yiting.space): a centered `max-w-[1040px]` box, not
   *  the full-bleed scatter this was experimenting with. Not used by the
   *  mobile stack (which renders upright, in a plain top-to-bottom flex column). */
  position: TestimonialPosition;
  zIndex: number;
}

interface QuoteTestimonialBase extends TestimonialBase {
  type: "quote";
  /** Supports `**bold**` markdown-style spans for emphasis within the quote. */
  quote: string;
  role: string;
  company: string;
  borderColor?: string;
  /** Real name behind the quote — kept for reference only. No card variant
   *  renders it (every card is attributed by role/company, not name); it's
   *  just worth keeping the real attribution on record. */
  author?: string;
}

/** Quote-mark glyph + avatar circle (shown only when `avatar` is set) +
 *  two-line attribution (bold role, plain company below). */
export interface AvatarQuoteTestimonial extends QuoteTestimonialBase {
  variant: "avatar";
  avatar?: string;
}

/** Star rating in place of the quote-mark, no avatar, single-line
 *  "role @company" attribution. */
export interface StarQuoteTestimonial extends QuoteTestimonialBase {
  variant: "star";
  /** 1-5. Mirrors FeedbackStack's `FeedbackCard.rating`. */
  rating: number;
}

export type QuoteTestimonial = AvatarQuoteTestimonial | StarQuoteTestimonial;

export interface PhotoTestimonial extends TestimonialBase {
  type: "photo";
  src: string;
  alt: string;
}

export type Testimonial = QuoteTestimonial | PhotoTestimonial;

export const testimonials: Testimonial[] = [
  {
    type: "quote",
    variant: "avatar",
    id: "maxine",
    quote:
      "Yiting has a unique ability to translate complex ideas into intuitive, beautifully crafted designs that truly elevate the user experience.",
    author: "Maxine",
    role: "Founder & COO",
    company: "Growing3",
    avatar: "/images/testimonials/maxine.png",
    borderColor: "#1A1A1A",
    rotation: -5,
    position: { top: 60, left: 20 },
    zIndex: 3,
  },
  {
    type: "quote",
    variant: "avatar",
    id: "bill",
    quote:
      "She has a strong understanding of engineering requirements and quickly responds to requests and questions, ensuring a smooth collaboration process.",
    author: "Bill",
    role: "Senior Developer",
    company: "Growing3",
    avatar: "/images/testimonials/bill.jpeg",
    borderColor: "#1A1A1A",
    rotation: 3,
    position: { top: 43, left: 712 },
    zIndex: 6,
  },
  {
    type: "photo",
    id: "portrait",
    src: "/images/yiting_working.png",
    alt: "Yiting Huang working at her laptop",
    rotation: -2,
    // zIndex: 0 puts this card behind every quote card, so any overlap with
    // another card's box at this position/size gets fully covered, not just
    // layered — not a subtle visual overlap, it can make the photo vanish.
    // If any card's position changes, re-check this one against whatever
    // moves near it.
    position: { top: 40, left: 300 },
    // Bottom-most layer of the deck — sits behind every quote card at rest,
    // by design (not an accident of insertion order).
    zIndex: 0,
  },
  {
    type: "quote",
    variant: "avatar",
    id: "kei",
    quote:
      "Beyond her technical skills, she is an incredible team player — always open to feedback, quick to iterate, and generous in sharing knowledge.",
    author: "Kei",
    role: "UXUI Designer",
    company: "CoolBitX",
    avatar: "/images/testimonials/kei.jpeg",
    borderColor: "#1A1A1A",
    rotation: -3,
    position: { top: 250, left: 0 },
    zIndex: 4,
  },
  {
    type: "quote",
    variant: "avatar",
    id: "henry",
    quote: "She consistently creates the best designs to engage users and enable them to complete purchases smoothly.",
    author: "Henry",
    role: "Marketing Manager",
    company: "CoolBitX",
    avatar: "/images/testimonials/henry.jpeg",
    borderColor: "#1A1A1A",
    rotation: 2,
    position: { top: 296, left: 760 },
    zIndex: 7,
  },
  {
    type: "quote",
    variant: "avatar",
    id: "james",
    quote:
      "Her deep understanding of Web3 and Blockchain, combined with her ability to design scalable, user-friendly solutions, helped us stand out in a competitive market.",
    author: "James",
    role: "Founder & CEO",
    company: "Growing3",
    avatar: "/images/testimonials/james.jpeg",
    borderColor: "#1A1A1A",
    rotation: -4,
    position: { top: 344, left: 183 },
    zIndex: 5,
  },
  {
    type: "quote",
    variant: "star",
    id: "zoe",
    quote:
      "[...] Additionally, Growing3's UI/UX, keyword research, and its understanding of user logic are exceptionally well-designed. I've already recommended it to other friends and colleagues!",
    author: "Zoe Yang",
    role: "BD Lead",
    company: "Flap",
    borderColor: "#1A1A1A",
    rating: 5,
    rotation: 3,
    position: { top: 175, left: 594 },
    zIndex: 2,
  },
  {
    type: "quote",
    variant: "star",
    id: "vincent",
    quote:
      "Growing3 is a tool that has significantly benefited my work, providing a **seamless overall product experience, especially in terms of user experience**, which left a strong impression on me!",
    author: "Vincent",
    role: "Project Manager",
    company: "PrismX",
    borderColor: "#1A1A1A",
    rating: 5,
    rotation: -3,
    position: { top: 300, left: 500 },
    zIndex: 1,
  },
];
