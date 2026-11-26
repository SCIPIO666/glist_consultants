import type { Metadata } from "next";
import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { insightsMeta } from "@/data/insights";
import { getInsights } from "@/lib/content";

export const metadata: Metadata = {
  title: insightsMeta.title,
  description: insightsMeta.description,
  alternates: { canonical: "/insights" },
  openGraph: { title: insightsMeta.title, description: insightsMeta.description, url: "/insights" },
};

/**
 * INSIGHTS (list). One long list of wide article cards with sticky checklist filters.
 * Articles come from Sanity (static placeholders until it is configured); cards link to /insights/<slug>.
 */
export default async function InsightsPage() {
  const { items, isSample } = await getInsights();
  return (
    <main>
      <InsightsExplorer items={items} samples={isSample} />
    </main>
  );
}
