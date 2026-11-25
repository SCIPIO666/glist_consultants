import type { Metadata } from "next";
import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { insightsMeta } from "@/data/insights";

export const metadata: Metadata = {
  title: insightsMeta.title,
  description: insightsMeta.description,
  alternates: { canonical: "/insights" },
  openGraph: { title: insightsMeta.title, description: insightsMeta.description, url: "/insights" },
};

/**
 * INSIGHTS (list). One long list of wide article cards with sticky checklist filters.
 * Cards link to /insights/<slug>, which does not exist yet (the article page is a later step).
 */
export default function InsightsPage() {
  return (
    <main>
      <InsightsExplorer />
    </main>
  );
}
