/**
 * A silent, looping, always-playing video with no controls at all — reads
 * like a looping background image/GIF, not a video the reader operates.
 * Referenced from benshih.design's ai-translation-review page. Shared by
 * CaseStudyBlock's "videoFile" (autoPlay: true) and CaseStudyView's
 * Overview-card video slot, so both places stay pixel-identical instead of
 * two copies of the same markup drifting apart.
 */
export default function AmbientVideoCard({
  src,
  alt,
  className,
  // "white" — the CaseStudyBlock usage, sitting directly on the page's
  // bg-bg background, same as videoGrid/embed's white cards. "bg" — the
  // CaseStudyView Overview-card usage, which already sits inside a white
  // card (bg-white on white would show no visible edge at all), so it
  // uses the same bg-bg treatment as that card's own Impact Overview
  // block instead, for the same reason that one isn't white either.
  bg = "white",
  // "all" — padding on every side (CaseStudyBlock's usage). "x" — the
  // Overview-card usage: no top/bottom padding (on request, that read as
  // an unwanted frame above/below the video there), horizontal padding
  // only, so the video still sits inset from the card's left/right edges.
  padding = "all",
}: {
  src: string;
  alt: string;
  className?: string;
  bg?: "white" | "bg";
  padding?: "all" | "x";
}) {
  return (
    <figure
      className={`rounded-2xl ${bg === "white" ? "bg-white" : "bg-bg"} ${
        padding === "all" ? "p-card-compact md:p-card-compact-lg" : "px-card-compact md:px-card-compact-lg"
      } ${className ?? ""}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-bg-alt">
        <video
          src={src}
          loop
          playsInline
          autoPlay
          muted
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </figure>
  );
}
