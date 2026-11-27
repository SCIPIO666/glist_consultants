/**
 * Insights (news and guides). These are the client's own four articles, moved over from
 * their Wix blog (full text lives in data/insightBodies.ts). Insurance content is left out
 * on purpose: insurance will be a separate business and website.
 *
 * Dates: the Wix blog showed only "Jan 23 / Jan 27 / Jan 28" with no year, so 2026 is assumed.
 * Cover photos are stock images already in the project (the Wix photos were not supplied).
 *
 * Contracts used elsewhere on the site (keep them stable):
 *   - category values: tax-updates | compliance-reminders | financial-literacy | business-tips
 *   - `service` is a slug from data/services.ts
 *   - article URL: /insights/<slug>
 */
export type InsightCategory = "tax-updates" | "compliance-reminders" | "financial-literacy" | "business-tips";

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  category: InsightCategory;
  /** Slug from data/services.ts, used by the Service filter. */
  service: string;
  /** `focus` is a CSS object-position (e.g. "50% 20%") to keep faces in frame when a photo is cropped. */
  image: { src: string; alt: string; focus?: string };
  readMinutes: number;
};

export const insightsAreSamples = false;

export const categories: { value: InsightCategory; label: string }[] = [
  { value: "tax-updates", label: "Tax updates" },
  { value: "compliance-reminders", label: "Compliance reminders" },
  { value: "financial-literacy", label: "Financial literacy" },
  { value: "business-tips", label: "Business tips" },
];

/** Reading-time filter. `test` receives the article's minutes. */
export const readingBuckets: { value: string; label: string; test: (min: number) => boolean }[] = [
  { value: "quick", label: "Quick read (under 5 min)", test: (m) => m < 5 },
  { value: "standard", label: "Standard (5 to 7 min)", test: (m) => m >= 5 && m <= 7 },
  { value: "deep", label: "Deep dive (8 min +)", test: (m) => m >= 8 },
];

export const insightsPage = {
  title: "News and Insights",
  lead: "Articles and guides on tax, payroll, bookkeeping, property and personal finance, written to help you make better decisions.",
  filterTitle: "Filter articles",
  groups: { service: "Service", category: "Category", reading: "Reading time" },
  readLabel: "Read more",
  emptyTitle: "No articles match these filters.",
  emptyHint: "Try removing a filter to see more.",
  disclaimer: "General information only, not professional advice. Contact us for guidance on your situation.",
} as const;

export const insightsMeta = {
  title: "News and Insights",
  description:
    "Plain-English articles from Glist Consultants on tax compliance, payroll, bookkeeping, stock taking, personal finance and rental property management in Kenya.",
} as const;

export function formatInsightDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso + "T00:00:00Z"),
  );
}

/** "November 2026": the short date shown on cards. */
export function formatInsightMonth(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));
}

const raw: Insight[] = [
  {
    slug: "mastering-the-art-of-saving-building-your-dream-life-with-financial-discipline",
    title: "Mastering the Art of Saving: Building Your Dream Life with Financial Discipline",
    excerpt:
      "Practical steps to save for your first car, education and your first home, with advice for common financial goals in Kenya.",
    date: "2026-01-28",
    category: "financial-literacy",
    service: "financial-advisory",
    image: { src: "/micheile-henderson-SoT4-mZhyhE-unsplash.webp", alt: "A seedling growing from a jar of coins" },
    readMinutes: 3,
  },
  {
    slug: "simplify-payroll-compliance-and-boost-business-growth-with-glists-accurate-solutions",
    title: "Simplify Payroll Compliance and Boost Business Growth with Glist's Accurate Solutions",
    excerpt:
      "How outsourcing payroll gives you accurate payslips, on-time processing and met tax obligations, and helps you predict labour costs and get your time back.",
    date: "2026-01-27",
    category: "business-tips",
    service: "payroll",
    image: { src: "/pexels-tima-miroshnichenko-6694475.webp", alt: "A man organising paperwork at a desk beside a tablet" },
    readMinutes: 3,
  },
  {
    slug: "understanding-turnover-tax-kenya-a-comprehensive-guide-for-businesses",
    title: "Understanding Turnover Tax Kenya: A Comprehensive Guide for Businesses",
    excerpt:
      "How turnover tax works for small businesses in Kenya, who qualifies, how to register and file, and worked examples.",
    date: "2026-01-23",
    category: "tax-updates",
    service: "taxation",
    image: { src: "/pexels-artempodrez-6779714.webp", alt: "Accounting papers, a calculator and charts laid out on a desk" },
    readMinutes: 4,
  },
  {
    slug: "maximize-your-real-estate-investments-in-kenya",
    title: "Maximize Your Real Estate Investments in Kenya",
    excerpt:
      "Tips for investors on reading local market trends, choosing the right property type and using professional management to protect your returns.",
    date: "2026-01-23",
    category: "business-tips",
    service: "property-management",
    image: { src: "/pexels-towfiqu-barbhuiya-3440682-8732777.webp", alt: "A model house held in a hand beside a calculator" },
    readMinutes: 2,
  },
];

/** Newest first. */
export const insights: Insight[] = [...raw].sort((a, b) => b.date.localeCompare(a.date));

export function readingBucketOf(minutes: number) {
  return readingBuckets.find((b) => b.test(minutes))?.value ?? "standard";
}
