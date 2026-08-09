"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface TextRotatorProps {
  words: string[];
  /** Milliseconds each word stays on screen before rotating to the next. */
  interval?: number;
  className?: string;
}

/** Cycles through `words`, cross-fading + sliding between them. Every word
 *  stays mounted (just hidden via opacity) instead of being added/removed
 *  from the DOM, so the stacked grid's width is always the widest word's
 *  width — if it shrank down to only the active word's width mid-rotation,
 *  the centered parent would re-center and the text would visibly jump. */
export default function TextRotator({ words, interval = 2200, className }: TextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-grid text-center align-top ${className ?? ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          aria-hidden={i === index ? undefined : true}
          animate={i === index ? { y: 0, opacity: 1 } : { y: i < index ? -14 : 14, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="col-start-1 row-start-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
