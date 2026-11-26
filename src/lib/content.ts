import type { PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/sanity/fetch";
import { insights as staticInsights, type Insight } from "@/data/insights";
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

/** Newest first. `isSample` is true only while the static placeholder articles are in use. */
export async function getInsights(): Promise<{ items: Insight[]; isSample: boolean }> {
  const data = await sanityFetch<Insight[]>({
    query: `*[_type == "insight" && defined(slug.current)] | order(date desc){ ${INSIGHT_FIELDS} }`,
    tags: ["insight"],
  });
  if (data) {
    return { items: data.map((i) => ({ ...i, image: { ...i.image, focus: i.image.focus ?? undefined } })), isSample: false };
  }
  return { items: staticInsights, isSample: true };
}

export type InsightDetail = Insight & { body: PortableTextBlock[] };

/** One article with its body, or null (the page then 404s). Static placeholders have no body. */
export async function getInsight(slug: string): Promise<InsightDetail | null> {
  const data = await sanityFetch<InsightDetail | null>({
    query: `*[_type == "insight" && slug.current == $slug][0]{
      ${INSIGHT_FIELDS},
      body[]{ ..., _type == "image" => { ..., "src": asset->url } }
    }`,
    params: { slug },
    tags: ["insight"],
  });
  if (!data) return null;
  return { ...data, image: { ...data.image, focus: data.image.focus ?? undefined }, body: data.body ?? [] };
}

export async function getInsightSlugs(): Promise<string[]> {
  const data = await sanityFetch<string[]>({
    query: `*[_type == "insight" && defined(slug.current)].slug.current`,
    tags: ["insight"],
  });
  return data ?? [];
}

/** Home reviews. Needs at least 2 for the stack layout; fewer falls back to the static samples. */
export async function getReviews(): Promise<Review[]> {
  const data = await sanityFetch<Review[]>({
    query: `*[_type == "review"] | order(order asc){ quote, name, role, location, service, stars }`,
    tags: ["review"],
  });
  return data && data.length >= 2 ? data : reviewsSection.items;
}
