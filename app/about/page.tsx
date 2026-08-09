import type { Metadata } from "next";
import Image from "next/image";
import JourneyTimeline from "@/components/JourneyTimeline";
import OutsideWork from "@/components/OutsideWork";
import GlassCard from "@/components/GlassCard";

const DESCRIPTION =
  "Yiting Huang, Product Designer in Berlin with 5 years of industry experience and a design education. Open to full-time, founding, and freelance roles.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  openGraph: { description: DESCRIPTION },
  twitter: { description: DESCRIPTION },
};

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pt-[45px] pb-10 md:px-10 md:pt-[50px] md:pb-15">
        <GlassCard>
          <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[640px]">
              <p className="mb-5 text-body-sm text-fg">
                👋 Hi, I&apos;m Yiting.
                <br />
                After design school, I started my career at a tech startup with an international team, building
                products in emerging tech, blockchain especially. Working with people from so many different
                backgrounds pushed me to learn fast, think broadly, and grow both professionally and personally.
              </p>
              <p className="mb-5 text-body-sm text-fg">
                In 2022, I joined a fully remote team, which gave me the freedom to travel and explore new cultures
                and tech ecosystems. Over the next two years, I lived and worked in New York, Amsterdam, Berlin, and
                Tokyo, spending one to three months in each city.
              </p>
              <p className="text-body-sm text-fg">
                In 2025, inspired by the people I met and the connections I made along the way, I moved to Berlin to
                focus, build, and start the next chapter of my career.
              </p>
            </div>

            <div className="relative h-[256px] w-[256px] shrink-0 overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <Image
                src="/images/Yiting_smile.jpg"
                alt="Yiting smiling"
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          </div>
        </GlassCard>
      </section>

      <JourneyTimeline />
      <OutsideWork />
    </>
  );
}
