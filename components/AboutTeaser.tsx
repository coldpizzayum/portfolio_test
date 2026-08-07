import Image from "next/image";
import Button from "./Button";
import { Reveal } from "./Reveal";

export default function AboutTeaser() {
  return (
    <section className="px-5 py-10 md:px-10 md:py-15">
      <Reveal className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 px-7 py-9 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:px-14 md:py-14">
        <h2 className="relative mb-10 font-serif text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-fg md:mb-14 md:text-h1">
          9 years in product design
        </h2>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-border md:w-[320px] md:shrink-0">
            <Image
              src="/images/Yiting_Climb.JPG"
              alt="Yiting rock climbing on the coast"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-7 max-w-[560px] text-body-sm text-fg md:text-body">
              5 years building real products, backed by a background in industrial design. Still love every bit of
              it.
            </p>
            <Button href="/about" variant="primary">
              Learn More About Yiting
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
