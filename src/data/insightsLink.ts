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
  eyebrow: "Strategic Intelligence",
  title: "Anticipate regulatory shifts. Stay ahead of deadlines.",
  lead: "Actionable analysis on tax legislation, compliance frameworks, and financial strategy—delivered without the jargon.",
  cta: { label: "View all insights", href: "/insights" },
  bgImage: "/pages/home/insight-bg/bg.webp",
  topics: [
    {
      slug: "tax-updates",
      title: "Legislative Updates",
      blurb: "Analysis of shifting Kenyan tax laws and the direct impact on your bottom line.",
      panel: "bg-brand text-white",
      disc: "group-hover:bg-white group-hover:text-brand",
    },
    {
      slug: "compliance-reminders",
      title: "Statutory Deadlines",
      blurb: "Critical filing dates and regulatory milestones you cannot afford to miss.",
      panel: "bg-cta text-white",
      disc: "group-hover:bg-white group-hover:text-cta",
    },
    {
      slug: "financial-literacy",
      title: "Financial Strategy",
      blurb: "Frameworks for capital allocation, debt structuring, and wealth preservation.",
      panel: "bg-gold text-night-deep",
      disc: "group-hover:bg-night-deep group-hover:text-gold",
    },
    {
      slug: "business-tips",
      title: "Operational Advisory",
      blurb: "Strategic guidance on scaling operations, managing payroll, and corporate governance.",
      panel: "bg-night-card text-white",
      disc: "group-hover:bg-gold group-hover:text-night-deep",
    },
  ],
};