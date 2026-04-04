import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/cv`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
