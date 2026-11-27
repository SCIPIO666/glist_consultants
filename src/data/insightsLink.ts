/**
 * Home insights teaser (just before the final CTA): ONE card for the latest insight.
 * For now it is written by hand. When the Insights page exists, point it at the newest
 * post (title, topic, date, link, image) instead. Sample content: replace before launch.
 * (HomeInsights now passes the newest real article, so this card is only the fallback.)
 */
export const insightsLink = {
  title: "News and insights",
  allLink: { label: "Our latest insights", href: "/insights" },
  card: {
    image: "/pages/home/insight-bg/bg.webp",
    imageAlt: "Smiling client reviewing a financial summary on a laptop",
    topic: "Tax updates",
    date: "23 January 2026",
    title: "Understanding Turnover Tax Kenya: A Comprehensive Guide for Businesses",
    href: "/insights/understanding-turnover-tax-kenya-a-comprehensive-guide-for-businesses",
    readMore: "Read more",
  },
} as const;
