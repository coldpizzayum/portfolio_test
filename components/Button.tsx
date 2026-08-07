import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  newTab?: boolean;
}

export default function Button({ href, variant, children, className = "", newTab = false }: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium duration-300";
  const styles =
    variant === "primary"
      ? "bg-[#FF6553] text-white transition-opacity hover:opacity-85"
      : "bg-transparent text-fg border border-border transition-colors hover:border-fg";

  const content = (
    <>
      {children}
      {variant === "primary" && <span aria-hidden="true">→</span>}
    </>
  );

  if (newTab) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}
