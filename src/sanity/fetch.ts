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
    return await client.fetch<T>(query, params, { next: { revalidate: 3600, tags } });
  } catch (error) {
    console.error("[sanity] fetch failed, using static content:", error);
    return null;
  }
}
