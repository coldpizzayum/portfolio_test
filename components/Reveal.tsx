"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Fades a section up into place the first time it enters the viewport.
 *
 * `useReducedMotion()` returns `null` during SSR, so — per Framer Motion's
 * own guidance — it must never change which element/variant is rendered
 * (that would mismatch the server-rendered markup on hydration). Instead it
 * only shortens the transition, which Framer applies client-side only.
 */
export function Reveal({ children, className, delay = 0, id }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={itemVariants}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/** Wraps a grid/list of RevealItem children and staggers their entrance. */
export function RevealGroup({ children, className, stagger = 0.1 }: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : stagger } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
