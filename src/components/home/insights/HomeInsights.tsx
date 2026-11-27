import { InsightTeaser } from "./InsightTeaser";
import { categories, formatInsightDate } from "@/data/insights";
import { getInsights } from "@/lib/content";

/** Home insights block: a single teaser card for the newest article. */
export async function HomeInsights() {
  const { items } = await getInsights();
  const latest = items[0];
  if (!latest) return <InsightTeaser />;
  return (
    <InsightTeaser
      card={{
        image: latest.image.src,
        imageAlt: latest.image.alt,
        topic: categories.find((c) => c.value === latest.category)?.label ?? "Insights",
        date: formatInsightDate(latest.date),
        title: latest.title,
        href: `/insights/${latest.slug}`,
      }}
    />
  );
}
