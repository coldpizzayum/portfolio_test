import type { Metadata } from "next";
import Image from "next/image";
import JourneyTimeline from "@/components/JourneyTimeline";
import OutsideWork from "@/components/OutsideWork";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pt-[90px] pb-10 md:px-10 md:pt-[100px] md:pb-15">
        <div className="bg-dot-grid relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/88 via-white/76 to-white/70 p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.05)] backdrop-blur-[12px] md:rounded-[20px] md:p-14">
          <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[640px]">
              <p className="mb-5 font-serif text-body-sm text-fg">
                👋 Hello everyone,
                <br />
                After graduating from design school, I started my career at a tech startup with an international
                team building products in emerging technologies, particularly blockchain. Working with people from
                diverse backgrounds pushed me to learn fast, think broadly, and grow both professionally and
                personally.
              </p>
              <p className="mb-5 font-serif text-body-sm text-fg">
                In 2022, I joined a fully remote team, which gave me the opportunity to travel and explore different
                cultures and tech ecosystems. Over the next two years, I lived and worked in New York 🗽, Amsterdam
                🇳🇱, Berlin 🇩🇪, and Tokyo 🇯🇵, staying in each city for one to three months.
              </p>
              <p className="font-serif text-body-sm text-fg">
                In 2025, inspired by the people I met and the connections I built along the way, I moved to Berlin
                🇩🇪 to focus, build, and start the next chapter of my career.
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
        </div>
      </section>

      <JourneyTimeline />
      <OutsideWork />
    </>
  );
}
