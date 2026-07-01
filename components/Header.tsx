"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#hero", sectionId: "hero" },
  { label: "Works", href: "/#works", sectionId: "works" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [activeId, setActiveId] = useState(isHome ? "hero" : "works");
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null);

  const moveIndicatorTo = (id: string) => {
    const track = trackRef.current;
    const link = linkRefs.current.get(id);
    if (!track || !link) return;
    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicatorStyle({
      left: linkRect.left - trackRect.left,
      width: linkRect.width,
    });
    setActiveId(id);
  };

  useEffect(() => {
    moveIndicatorTo(activeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.sectionId)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            moveIndicatorTo(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100]">
      <nav className="flex items-center rounded-full bg-[rgba(255,253,250,0.78)] px-2 py-1 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-[16px]">
        <div ref={trackRef} className="relative flex items-center gap-0 p-1">
          {indicatorStyle && (
            <div
              className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-fg transition-[left,width] duration-[280ms] ease-[cubic-bezier(0.34,1.2,0.64,1)] pointer-events-none"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
          )}
          {NAV_LINKS.map((link) => {
            const href = isHome ? `#${link.sectionId}` : link.href;
            const isActive = isHome && activeId === link.sectionId;
            return (
              <Link
                key={link.sectionId}
                href={href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.sectionId, el);
                }}
                onClick={() => {
                  if (isHome) moveIndicatorTo(link.sectionId);
                }}
                className={`relative z-10 inline-flex items-center whitespace-nowrap rounded-full px-[18px] py-1.5 text-sm font-medium transition-colors duration-[180ms] ${
                  isActive ? "text-bg" : "text-fg-secondary hover:text-fg"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
