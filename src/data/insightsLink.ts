/**
 * Home "News and Insights" teaser: ONE featured card, not a list.
 * PLACEHOLDER: the article below is a stand-in until the Insights page / Sanity
 * can supply the latest post. Replace `featured` (title, date, image, href) then;
 * later this file can be fed from the newest published insight automatically.
 */
export const insightsLink: {
  title: string;
  linkLabel: string;
  linkHref: string;
  featured: {
    date: string;
    title: string;
    cta: string;
    href: string;
    image: { src: string; alt: string };
  };
} = {
  title: "News and Insights",
  linkLabel: "Our latest insights",
  linkHref: "/insights",
  featured: {
    date: "November 2026",
    title: "Staying ahead of KRA deadlines: a simple filing calendar",
    cta: "Read more",
    href: "/insights",
    image: {
      src: "/pexels-artempodrez-6779714.webp",
      alt: "Accounting papers, a calculator and charts laid out on a desk",
    },
  },
};
