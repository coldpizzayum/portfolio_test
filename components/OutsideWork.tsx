import Image from "next/image";
import GlassCard from "./GlassCard";

const PARAGRAPHS = [
  {
    heading: "I'm a Hustle dancer, and I love exploring different ways humans move.",
    body: "I'm a bit shy, but learning and building things with other passionate people is how I connect, grow, and find meaning. That sense of progress and shared energy is what keeps me motivated. From dance, I fell in love with exploring different ways of moving. I've spent years training in Capoeira, acrobatics, and CrossFit, and lately, I've started rock climbing.",
  },
];

interface GridImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const COLUMNS: GridImage[][] = [
  [
    {
      src: "/images/outside-work/col1-top.jpeg",
      alt: "Group photo with the ADPList community on the grass",
      width: 1024,
      height: 768,
    },
    {
      src: "/images/outside-work/col1-bottom.jpg",
      alt: "Dancing on a colorfully lit dance floor",
      width: 576,
      height: 1024,
    },
  ],
  [
    {
      src: "/images/outside-work/col2-top.jpg",
      alt: "Friends gathered around a table at an outdoor cafe",
      width: 576,
      height: 1024,
    },
    {
      src: "/images/outside-work/col2-bottom.jpeg",
      alt: "Group photo with the ADPList community in a park",
      width: 1024,
      height: 768,
    },
  ],
  [
    {
      src: "/images/outside-work/col3-top.jpeg",
      alt: "Group photo in Capoeira uniforms",
      width: 1024,
      height: 683,
    },
    {
      src: "/images/outside-work/col3-bottom.jpeg",
      alt: "Climbing an outdoor bouldering wall",
      width: 1024,
      height: 768,
    },
  ],
  [
    {
      src: "/images/outside-work/col4-top.jpg",
      alt: "Hustle dancing with a partner",
      width: 1024,
      height: 577,
    },
    {
      src: "/images/outside-work/col4-bottom.jpeg",
      alt: "Lifting weights at the gym",
      width: 681,
      height: 1024,
    },
  ],
];

export default function OutsideWork() {
  return (
    <section className="px-5 py-5 md:px-10 md:py-[30px]">
      <GlassCard>
        <div className="relative z-[1]">
          <h2 className="mb-3 text-h1 tracking-[-0.03em] text-fg">
            What I do outside of work.
          </h2>

          <div className="mb-10 flex flex-col gap-8 md:mb-14">
            {PARAGRAPHS.map((section) => (
              <div key={section.heading}>
                <h3 className="mb-2 font-serif text-h3 text-fg">{section.heading}</h3>
                <p className="text-body-sm whitespace-pre-line text-fg">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl md:grid-cols-4 md:gap-3">
            {COLUMNS.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2 md:gap-3">
                {column.map((img) => (
                  <div
                    key={img.src}
                    className="relative overflow-hidden rounded-lg"
                    style={{ aspectRatio: `${img.width} / ${img.height}` }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
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
