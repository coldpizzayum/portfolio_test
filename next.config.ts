import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/coolwallet",
        destination: "/case-study/coolwallet-pro",
        permanent: true,
      },
      {
        source: "/web3_marketing",
        destination: "/case-study/web3-marketing-dashboard",
        permanent: true,
      },
      {
        source: "/influencer_marketing",
        destination: "/case-study/influencer-marketing-tool",
        permanent: true,
      },
      {
        source: "/works/web3-marketing",
        destination: "/case-study/web3-marketing-dashboard",
        permanent: true,
      },
      {
        source: "/works/web3-growth-ads-automation-platform",
        destination: "/case-study/web3-marketing-dashboard",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/#works",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/case-study",
        permanent: true,
      },
      {
        source: "/skills",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
