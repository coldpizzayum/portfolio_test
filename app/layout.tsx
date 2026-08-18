import type { Metadata } from "next";
import { JetBrains_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    <html
      lang="en"
      className={`${sourceSerif.variable} ${jetbrainsMono.variable} ${sourceSans.variable}`}
    >
      <body
        className="flex min-h-screen flex-col bg-bg text-fg font-source-sans-pro text-base leading-relaxed antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
