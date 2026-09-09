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
  // openGraph/twitter here shallow-replace layout.tsx's (not deep-merge),
  // so image/card have to be restated per page — see app/page.tsx's
  // comment on the same pattern.
  openGraph: {
    description: DESCRIPTION,
    images: [{ url: "/images/summary_large_image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    images: ["/images/summary_large_image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="px-shell pt-hero-top pb-section md:px-shell-lg md:pt-hero-top-lg md:pb-section-lg">
        <GlassCard>
          <div className="relative z-[1] flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[640px]">
              <p className="mb-5 text-body-sm text-fg">
                👋 Hi, I&apos;m Yiting.
                <br />
                I&apos;m a Product Designer from Taiwan 🇹🇼, now based in Berlin 🇩🇪.
              </p>
              <p className="mb-5 text-body-sm text-fg">
                I&apos;ve spent most of my career working at startups, mainly on blockchain, Web3, and more recently
                AI products.
              </p>
              <p className="mb-5 text-body-sm text-fg">
                I started my career at a tech startup in Taiwan, working with an international team on blockchain
                products.
              </p>
              <p className="mb-5 text-body-sm text-fg">
                In 2022, I joined a fully remote team and spent the next two years living and working in New York
                🗽, Amsterdam 🇳🇱, Berlin 🇩🇪, and Tokyo 🇯🇵.
              </p>
              <p className="text-body-sm text-fg">
                In 2025, I decided to settle in Berlin and continue my career here.
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
