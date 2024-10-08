import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ansungjae-gpt.vercel.app/sitemap.xml",
    host: "https://ansungjae-gpt.vercel.app",
  };
}
