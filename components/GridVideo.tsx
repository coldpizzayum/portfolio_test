"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A decorative, silent, looping video tile that only plays while it's
 * actually on screen — used by OutsideWork's media grid. With 6 of these
 * potentially in one grid, autoplaying all of them unconditionally on page
 * load wastes bandwidth/battery on the ones the reader hasn't scrolled to
 * yet; this starts each one paused and lets IntersectionObserver play/pause
 * it as it enters/leaves the viewport, same mechanism CaseStudySideNav
 * already uses for its own scroll tracking.
 *
 * `preload="metadata"` means the actual frame data only starts downloading
 * once IntersectionObserver calls play() — on a slow connection that's a
 * visible blank/black gap before the first frame decodes. `poster` (a
 * still JPG, extracted per-video via `qlmanage -t`) fills that gap: it's
 * a plain <img> sitting behind the <video>, always rendered immediately,
 * so the tile never has a moment with nothing in it. The <video> itself
 * fades in over the poster once it actually starts playing, rather than
 * relying on the browser's native `poster` attribute — that attribute
 * lives *inside* the video element itself, so it wouldn't stay visible if
 * the video element also had its own opacity animated for the fade.
 */
export default function GridVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  /** Optional — falls back to just the fade-in with no placeholder
   *  underneath if a given video doesn't have one yet. */
  poster?: string;
  alt: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <>
      {poster && (
        // Plain <img>, not next/image — decorative poster fill behind the
        // <video>, doesn't need responsive srcset/optimization for a
        // ~50KB still.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden="true" className={`absolute inset-0 ${className ?? ""}`} />
      )}
      <video
        ref={videoRef}
        src={src}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setIsPlaying(true)}
        className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
      />
    </>
  );
}
