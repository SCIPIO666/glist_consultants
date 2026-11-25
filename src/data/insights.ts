/**
 * Insights (news and guides). IMPORTANT: every article below is a SAMPLE
 * PLACEHOLDER written to show the layout. Titles, descriptions and dates are
 * stand-ins, and nothing here states real tax rates, deadlines or legal rules.
 * Replace with the client's real articles (or Sanity) before launch, then set
 * `insightsAreSamples` to false.
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

export const insightsAreSamples = true;

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
  lead: "Plain-English guides on tax, payroll, bookkeeping, property and personal finance, written to help you decide with confidence.",
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
    slug: "staying-ahead-of-kra-deadlines",
    title: "Staying ahead of KRA deadlines: a simple filing calendar",
    excerpt:
      "A simple way to list the filings and payments your business repeats every month and every year, so none of them sneaks up on you.",
    date: "2026-11-12",
    category: "compliance-reminders",
    service: "taxation",
    image: { src: "/pexels-artempodrez-6779714.webp", alt: "Accounting papers, a calculator and charts laid out on a desk" },
    readMinutes: 6,
  },
  {
    slug: "reading-a-tax-change-without-the-jargon",
    title: "How to read a tax change without the jargon",
    excerpt:
      "New rules can sound alarming. Here is a calm way to work out whether a change affects you, and what to ask before you act.",
    date: "2026-10-28",
    category: "tax-updates",
    service: "taxation",
    image: { src: "/kelly-sikkema-M98NRBuzbpc-unsplash.webp", alt: "A tax form, calculator and coffee on a dark desk" },
    readMinutes: 5,
  },
  {
    slug: "payroll-basics-every-employer-should-know",
    title: "Payroll basics every employer should know",
    excerpt:
      "From contracts to payslips to monthly statutory payments: the building blocks of a payroll you can trust.",
    date: "2026-10-14",
    category: "business-tips",
    service: "payroll",
    image: { src: "/pexels-tima-miroshnichenko-6694475.webp", alt: "A man organising paperwork at a desk beside a tablet" },
    readMinutes: 7,
  },
  {
    slug: "questions-to-ask-before-you-register-a-business",
    title: "Questions to ask before you register a business",
    excerpt:
      "Name, structure, tax registrations and licences: the questions worth answering first so your launch is tidy.",
    date: "2026-09-30",
    category: "business-tips",
    service: "registrations",
    image: { src: "/pexels-gustavo-fring-5934189.webp", alt: "A smiling business owner holding an open-for-business sign", focus: "50% 18%" },
    readMinutes: 5,
  },
  {
    slug: "monthly-bookkeeping-beats-the-year-end-scramble",
    title: "Why monthly bookkeeping beats the year-end scramble",
    excerpt: "Small, regular updates keep your books accurate, your decisions informed and your year-end calm.",
    date: "2026-09-16",
    category: "business-tips",
    service: "bookkeeping",
    image: { src: "/pexels-tima-miroshnichenko-6694569.webp", alt: "Cash, receipts, a calculator and a laptop on a busy desk" },
    readMinutes: 4,
  },
  {
    slug: "stock-counts-that-match-your-books",
    title: "Stock counts that actually match your books",
    excerpt: "How a regular, well-planned count exposes shrinkage early and keeps your stock figures honest.",
    date: "2026-09-02",
    category: "business-tips",
    service: "stock-taking",
    image: { src: "/cytonn-photography-l3MMvRYdPhc-unsplash.webp", alt: "A person typing on a laptop beside a phone" },
    readMinutes: 6,
  },
  {
    slug: "a-simple-monthly-budget-for-irregular-income",
    title: "A simple monthly budget for irregular income",
    excerpt:
      "When income moves around, a budget built on your lowest month gives you a steady floor to plan from.",
    date: "2026-08-19",
    category: "financial-literacy",
    service: "financial-advisory",
    image: { src: "/micheile-henderson-SoT4-mZhyhE-unsplash.webp", alt: "A seedling growing from a jar of coins" },
    readMinutes: 8,
  },
  {
    slug: "rental-income-records-every-landlord-should-keep",
    title: "Rental income: the records every landlord should keep",
    excerpt: "Receipts, statements and tenancy papers that make rental accounting, and tax time, far easier.",
    date: "2026-08-05",
    category: "compliance-reminders",
    service: "property-management",
    image: { src: "/pexels-towfiqu-barbhuiya-3440682-8732777.webp", alt: "A model house held in a hand beside a calculator" },
    readMinutes: 5,
  },
  {
    slug: "preparing-for-your-first-meeting-with-an-accountant",
    title: "How to prepare for your first meeting with an accountant",
    excerpt: "A short list of documents and questions that makes a first consultation faster and far more useful.",
    date: "2026-07-22",
    category: "business-tips",
    service: "financial-advisory",
    image: { src: "/christina-wocintechchat-com-m-rg1y72eKw6o-unsplash.webp", alt: "A team meeting around a table in a bright office" },
    readMinutes: 3,
  },
  {
    slug: "saving-with-a-purpose",
    title: "Saving with a purpose: three goals worth their own account",
    excerpt:
      "An emergency fund, short-term plans and long-term growth: keeping them apart makes progress easy to see.",
    date: "2026-07-08",
    category: "financial-literacy",
    service: "financial-advisory",
    image: { src: "/towfiqu-barbhuiya-nApaSgkzaxg-unsplash.webp", alt: "A person reviewing charts on a tablet with a calculator nearby" },
    readMinutes: 9,
  },
];

/** Newest first. */
export const insights: Insight[] = [...raw].sort((a, b) => b.date.localeCompare(a.date));

export function readingBucketOf(minutes: number) {
  return readingBuckets.find((b) => b.test(minutes))?.value ?? "standard";
}
