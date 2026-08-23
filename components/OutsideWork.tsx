import Image from "next/image";
import GlassCard from "./GlassCard";
import GridVideo from "./GridVideo";

const PARAGRAPHS = [
  {
    heading: "I'm a Hustle dancer",
    body: "I started dancing at 20 and discovered Hustle in 2020. Since then, I've traveled quite a bit for dance and met people through Hustle communities around the world.\nI'm naturally a bit shy, and dance has helped me connect with people wherever I go.",
  },
  {
    heading: "I love exploring movement",
    body: "Over the years, I've tried Capoeira, acrobatics, CrossFit, and more recently, rock climbing.",
  },
];

interface GridMedia {
  /** Videos autoplay/muted/loop, same silent-background treatment as the
   *  photos around them — not a click-to-watch moment like SpotlightCard,
   *  just another tile in the grid. */
  type: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
}

const COLUMNS: GridMedia[][] = [
  [
    {
      type: "image",
      src: "/images/outside-work/mount-fuji.jpg",
      alt: "Looking out over a lake toward Mount Fuji",
      width: 4032,
      height: 3024,
    },
    {
      type: "video",
      src: "/images/outside-work/dance-social-1.mp4",
      alt: "Hustle dancing at a social dance event",
      width: 1080,
      height: 1920,
    },
    {
      type: "video",
      src: "/images/outside-work/dance-colorful-lights.mp4",
      alt: "Dancing on a colorfully lit dance floor",
      width: 1080,
      height: 1920,
    },
  ],
  [
    {
      // Left at its original, unrotated orientation on purpose — no
      // rotation applied here.
      type: "image",
      src: "/images/outside-work/dance in prague.JPG",
      alt: "Dancing with a partner in a park in Prague",
      width: 4032,
      height: 3024,
    },
    {
      type: "image",
      src: "/images/outside-work/kayaking.jpg",
      alt: "Kayaking down a forested river",
      width: 1500,
      height: 2000,
    },
    {
      type: "video",
      src: "/images/outside-work/dance-practice.mp4",
      alt: "Practicing a dance lift at the studio",
      width: 1080,
      height: 1920,
    },
  ],
  [
    {
      type: "image",
      src: "/images/outside-work/col3-top.jpeg",
      alt: "Group photo in Capoeira uniforms",
      width: 1024,
      height: 683,
    },
    {
      type: "image",
      src: "/images/outside-work/col3-bottom.jpeg",
      alt: "Climbing an outdoor bouldering wall",
      width: 1024,
      height: 768,
    },
    {
      type: "video",
      src: "/images/outside-work/dance-rainbow-lights.mp4",
      alt: "Dancing under rainbow-colored lights",
      width: 1080,
      height: 1920,
    },
  ],
  [
    {
      type: "image",
      src: "/images/outside-work/col4-top.jpg",
      alt: "Hustle dancing with a partner",
      width: 1024,
      height: 577,
    },
    {
      // 720×1280 (was 1280×720, swapped) — this is a portrait phone
      // recording; the earlier landscape aspect-ratio box was cropping the
      // top/bottom off it.
      type: "video",
      src: "/images/outside-work/aerial-yoga.mp4",
      alt: "Practicing aerial yoga at a climbing gym",
      width: 720,
      height: 1280,
    },
    {
      // 1080×1920 (was 1920×1080, swapped) — same portrait-recorded-as-
      // landscape-box issue as aerial-yoga.mp4 above.
      type: "video",
      src: "/images/outside-work/dance-hudson-valley.mp4",
      alt: "Hustle dancing on a hilltop overlooking the Hudson Valley",
      width: 1080,
      height: 1920,
    },
  ],
];

export default function OutsideWork() {
  return (
    <section className="px-shell py-section md:px-shell-lg md:py-section-lg">
      <GlassCard>
        <div className="relative z-[1]">
          <h2 className="mb-heading-gap-h2 text-h2 tracking-[-0.03em] text-fg">
            Outside of work
          </h2>

          <div className="mb-10 flex flex-col gap-8 md:mb-14">
            {PARAGRAPHS.map((section) => (
              <div key={section.heading}>
                <h3 className="mb-heading-gap-h4 text-h4 tracking-[-0.01em] text-fg">{section.heading}</h3>
                <p className="text-body-sm whitespace-pre-line text-fg">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl md:grid-cols-4 md:gap-3">
            {COLUMNS.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2 md:gap-3">
                {column.map((media) => (
                  <div
                    key={media.src}
                    className="relative overflow-hidden rounded-lg"
                    style={{ aspectRatio: `${media.width} / ${media.height}` }}
                  >
                    {media.type === "video" ? (
                      <GridVideo src={media.src} alt={media.alt} className="h-full w-full object-cover" />
                    ) : (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
