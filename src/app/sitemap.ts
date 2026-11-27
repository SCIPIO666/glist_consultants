import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getInsights } from "@/lib/content";

// Rebuild at most hourly, so new Sanity articles show up in the sitemap without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await getInsights();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/property-management"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/insights"), changeFrequency: "weekly", priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = items.map((a) => ({
    url: absoluteUrl(`/insights/${a.slug}`),
    lastModified: a.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
