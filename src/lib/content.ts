import type { PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/sanity/fetch";
import { insights as staticInsights, type Insight } from "@/data/insights";
import { articleBodies } from "@/data/insightBodies";
import { reviewsSection, type Review } from "@/data/reviews";

/**
 * The ONLY place pages ask for content. Each getter returns Sanity content when it is
 * configured and reachable, otherwise the static content in src/data, in the same shape.
 * Server components only (never import this from a "use client" file).
 */

// Cover image projection. `focus` turns the editor's hotspot into a CSS object-position.
const IMAGE = `{
  "src": image.asset->url,
  "alt": coalesce(image.alt, title),
  "focus": select(defined(image.hotspot) => string(round(image.hotspot.x * 100)) + "% " + string(round(image.hotspot.y * 100)) + "%")
}`;

const INSIGHT_FIELDS = `
  "slug": slug.current, title, excerpt, date, category, service, readMinutes,
  "image": ${IMAGE}
`;

/**
 * Newest first. Articles written in Sanity come first-class; the client's own articles that
 * live in src/data/insights.ts are shown alongside them (a Sanity article with the same slug
 * wins). `isSample` is always false now: the static articles are the client's real ones.
 */
export async function getInsights(): Promise<{ items: Insight[]; isSample: boolean }> {
  const data = await sanityFetch<Insight[]>({
    query: `*[_type == "insight" && defined(slug.current)] | order(date desc){ ${INSIGHT_FIELDS} }`,
    tags: ["insight"],
  });
  const fromSanity = (data ?? []).map((i) => ({ ...i, image: { ...i.image, focus: i.image.focus ?? undefined } }));
  const seen = new Set(fromSanity.map((i) => i.slug));
  const items = [...fromSanity, ...staticInsights.filter((i) => !seen.has(i.slug))].sort((a, b) => b.date.localeCompare(a.date));
  return { items, isSample: false };
}

export type InsightDetail = Insight & { body: PortableTextBlock[] };

/** One article with its body, or null (the page then 404s). Sanity first, then the static articles. */
export async function getInsight(slug: string): Promise<InsightDetail | null> {
  const data = await sanityFetch<InsightDetail | null>({
    query: `*[_type == "insight" && slug.current == $slug][0]{
      ${INSIGHT_FIELDS},
      body[]{ ..., _type == "image" => { ..., "src": asset->url } }
    }`,
    params: { slug },
    tags: ["insight"],
  });
  if (data) return { ...data, image: { ...data.image, focus: data.image.focus ?? undefined }, body: data.body ?? [] };
  const local = staticInsights.find((i) => i.slug === slug);
  return local ? { ...local, body: articleBodies[slug] ?? [] } : null;
}

export async function getInsightSlugs(): Promise<string[]> {
  const data = await sanityFetch<string[]>({
    query: `*[_type == "insight" && defined(slug.current)].slug.current`,
    tags: ["insight"],
  });
  return [...new Set([...(data ?? []), ...staticInsights.map((i) => i.slug)])];
}

/** Home reviews. Needs at least 2 for the stack layout; fewer falls back to the static samples. */
export async function getReviews(): Promise<Review[]> {
  const data = await sanityFetch<Review[]>({
    query: `*[_type == "review"] | order(order asc){ quote, name, role, location, service, stars }`,
    tags: ["review"],
  });
  return data && data.length >= 2 ? data : reviewsSection.items;
}
