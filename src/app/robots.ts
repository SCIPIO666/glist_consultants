import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api/", "/motion-lab", "/hero-alt2"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
