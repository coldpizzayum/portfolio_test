import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://portfolio-test-steel-nine.vercel.app";

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
    images: [{ url: "/images/web3-hero.png", width: 1000, height: 734 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yiting Huang — Product Designer",
    description:
      "Product Designer based in Berlin with 5+ years of experience shaping digital products across Web3, B2B SaaS, and eCommerce.",
    images: ["/images/web3-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg text-fg font-sans text-base leading-relaxed antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
