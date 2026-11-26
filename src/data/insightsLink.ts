/**
 * Home insights teaser (just before the final CTA): ONE card for the latest insight.
 * For now it is written by hand. When the Insights page exists, point it at the newest
 * post (title, topic, date, link, image) instead. Sample content: replace before launch.
 */
export const insightsLink = {
  title: "News and insights",
  allLink: { label: "Our latest insights", href: "/insights" },
  card: {
    image: "/pages/home/insight-bg/bg.webp",
    imageAlt: "Smiling client reviewing a financial summary on a laptop",
    topic: "Tax updates",
    date: "20 November 2026",
    title: "The filing dates worth putting in your diary",
    href: "/insights",
    readMore: "Read more",
  },
} as const;
