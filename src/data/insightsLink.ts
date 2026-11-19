/**
 * Home "Insights" link block (just before the final CTA). The four topics come
 * from the brief's Resources / Insights page: tax updates, compliance reminders,
 * financial literacy and business tips. Links go to the insights page filtered by
 * topic; the page itself is built in a later milestone.
 */
export type InsightTopic = {
  slug: string;
  title: string;
  blurb: string;
  /** Tailwind classes for the panel colour + text (kept whole so Tailwind sees them). */
  panel: string;
  /** Colour of the arrow disc on hover. */
  disc: string;
};

export const insightsLink: {
  eyebrow: string;
  title: string;
  lead: string;
  cta: { label: string; href: string };
  bgImage: string;
  topics: InsightTopic[];
} = {
  eyebrow: "Resources & insights",
  title: "Stay a step ahead of the deadline.",
  lead: "Plain-language updates on tax, compliance and money, so nothing catches you by surprise.",
  cta: { label: "All insights", href: "/insights" },
  bgImage: "/pages/home/insight-bg/bg.webp",
  topics: [
    {
      slug: "tax-updates",
      title: "Tax updates",
      blurb: "What changes in Kenyan tax rules mean for your business and your pocket.",
      panel: "bg-brand text-white",
      disc: "group-hover:bg-white group-hover:text-brand",
    },
    {
      slug: "compliance-reminders",
      title: "Compliance reminders",
      blurb: "Filing dates and statutory deadlines worth putting in your diary.",
      panel: "bg-cta text-white",
      disc: "group-hover:bg-white group-hover:text-cta",
    },
    {
      slug: "financial-literacy",
      title: "Financial literacy",
      blurb: "Budgeting, saving and debt explained without the jargon.",
      panel: "bg-gold text-night-deep",
      disc: "group-hover:bg-night-deep group-hover:text-gold",
    },
    {
      slug: "business-tips",
      title: "Business tips",
      blurb: "Practical ideas on records, payroll and growth for SMEs and landlords.",
      panel: "bg-night-card text-white",
      disc: "group-hover:bg-gold group-hover:text-night-deep",
    },
  ],
};
