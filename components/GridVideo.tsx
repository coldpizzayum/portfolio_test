"use client";

import { useEffect, useRef } from "react";

/**
 * A decorative, silent, looping video tile that only plays while it's
 * actually on screen — used by OutsideWork's media grid. With 6 of these
 * potentially in one grid, autoplaying all of them unconditionally on page
 * load wastes bandwidth/battery on the ones the reader hasn't scrolled to
 * yet; this starts each one paused and lets IntersectionObserver play/pause
 * it as it enters/leaves the viewport, same mechanism CaseStudySideNav
 * already uses for its own scroll tracking.
 */
export default function GridVideo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() returns a promise that rejects if the browser interrupts
          // it (e.g. the tile scrolls back out before playback actually
          // starts) — not an error worth surfacing, just ignore it.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={videoRef} src={src} aria-label={alt} muted loop playsInline preload="metadata" className={className} />
  );
}
