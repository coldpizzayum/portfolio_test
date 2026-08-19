"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CollageItem {
  src: string;
  alt: string;
  top: string;
  left: string;
  width: string;
  rotate: number;
  z: number;
}

export default function ImageCollage({ items }: { items: CollageItem[] }) {
  const [active, setActive] = useState<CollageItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <div className="relative my-10 h-[300px] sm:h-[380px] md:h-[560px]">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            aria-label={`Enlarge: ${item.alt}`}
            // Shadow bloom is deliberately bigger than shadow-float/
            // shadow-hover — it's signaling "this is clickable/enlargeable,"
            // not just floating above the page.
            className="absolute aspect-video cursor-zoom-in overflow-hidden rounded-xl shadow-[0_20px_40px_rgba(16,24,40,0.15)] ring-1 ring-black/5 transition-[filter] duration-300 hover:brightness-95"
            style={{
              top: item.top,
              left: item.left,
              width: item.width,
              transform: `rotate(${item.rotate}deg)`,
              zIndex: item.z,
            }}
          >
            <Image src={item.src} alt={item.alt} fill sizes="(min-width: 900px) 500px, 90vw" className="object-cover" />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          // p-6 (24px) is this lightbox's own fixed edge margin, not a
          // card-padding token — full-screen overlay, not a card.
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors duration-300 hover:bg-white/20"
          >
            ✕
          </button>
          <div
            className="relative aspect-video w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
