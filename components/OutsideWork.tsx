import Image from "next/image";

const PARAGRAPHS = [
  {
    heading: "I'm a Hustle Dancer",
    body: "I started dancing at 20, and I found Hustle in 2020, since than I have been traveling around the world for communities.\nI'm a bit shy, but through learning and building things with other passionate people,  I connect, grow, and find meaning in my life. That sense of progress and shared energy is what keeps me motivated over time.",
  },
  {
    heading: "I enjoy explore different way of human movements",
    body: "Start with dancing, I find the beauty of exploring different ways of movements, I have spent years training Capoeira, acrobatics, CrossFit and lately, I started rock climbing.",
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
    <section className="px-5 py-10 md:px-10 md:py-15">
      <div className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:p-14">
        <div className="relative z-[1]">
          <h2 className="mb-8 font-serif text-[32px] font-bold tracking-[-0.03em] text-fg md:text-h1">
            What I do outside of work.
          </h2>

          <div className="mb-10 flex flex-col gap-8 md:mb-14">
            {PARAGRAPHS.map((section) => (
              <div key={section.heading}>
                <h3 className="mb-2 font-serif text-h3 text-fg">{section.heading}</h3>
                <p className="font-serif text-body-sm whitespace-pre-line text-fg">{section.body}</p>
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
      </div>
    </section>
  );
}
