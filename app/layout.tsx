import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// "Source Sans Pro" was renamed/merged into "Source Sans 3" in the Google
// Fonts catalog — this is the current name for the same typeface family.
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Handwriting face for Hero's sketch-style annotations only (the
// arrow+note pointing at the video/AI fan cards) — bold weight only,
// nowhere else on the site uses this, so no lighter weights are loaded.
const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const siteUrl = "https://yiting.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yiting Huang — Product Designer",
    template: "%s — Yiting Huang",
  },
  description:
    "Yiting Huang is a Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce.",
  openGraph: {
    title: "Yiting Huang — Product Designer",
    description:
      "Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce.",
    url: siteUrl,
    siteName: "Yiting Huang",
    images: [{ url: "/images/web3console.png", width: 1000, height: 734 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yiting Huang — Product Designer",
    description:
      "Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce.",
    images: ["/images/web3console.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${sourceSans.variable} ${caveat.variable}`}>
      <body
        className="flex min-h-screen flex-col bg-bg text-fg font-source-sans-pro text-base leading-relaxed antialiased"
        suppressHydrationWarning
      >
        {/* Standalone react-devtools app (npx react-devtools) — dev-only,
         *  connects over its default localhost:8097 server. Must load
         *  before React itself hydrates the page, hence
         *  strategy="beforeInteractive" (Next.js hoists this into <head>
         *  and runs it ahead of any page code regardless of where it's
         *  written in the tree). Gated on NODE_ENV so this never ships to
         *  production and never tries to reach localhost from a real
         *  visitor's browser. */}
        {process.env.NODE_ENV === "development" && (
          <Script src="http://localhost:8097" strategy="beforeInteractive" />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
