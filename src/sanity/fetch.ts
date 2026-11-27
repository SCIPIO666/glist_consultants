import { client } from "./client";
import { isSanityConfigured } from "./env";

/**
 * Fetch from Sanity, cached by Next and tagged so the publish webhook can refresh it.
 * Returns null when Sanity is not configured or the request fails, so callers can fall
 * back to the static content in src/data and the site never breaks.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    // Production: cached for an hour, refreshed instantly by the publish webhook.
    // Development: no caching, so an edit in the Studio shows on the next reload.
    const revalidate = process.env.NODE_ENV === "production" ? 3600 : 0;
    return await client.fetch<T>(query, params, { next: { revalidate, tags } });
  } catch (error) {
    console.error("[sanity] fetch failed, using static content:", error);
    return null;
  }
}
