/**
 * "Glist at a glance" strip: one card per in-page section of the About page.
 * DRAFT COPY: the brief gives no mission or vision statement, so those lines are
 * written from the brief's tagline and values. Have the client approve them.
 * `href` must match the id of the matching section (added in the next milestones).
 */
export type GlanceItem = {
  id: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
  href: string;
};

export const aboutGlance: { title: string; items: GlanceItem[] } = {
  title: "Glist at a glance",
  items: [
    {
      id: "background",
      title: "Background",
      text: "A  financial and property consultancy for individuals, startups, SMEs and established companies.",
      image: { src: "/pages/about/glance/pexels-2160634325-41167700.webp", alt: "Sunlit modern building corner against a blue sky" },
      href: "#background",
    },
    {
      id: "mission",
      title: "Mission",
      text: "To give clients dependable, timely help with their taxes, books, staff and property.",
      image: { src: "/pages/about/glance/pexels-abdullah-baskaya-383799394-31993929.webp", alt: "Glass office tower rising into a pale sky" },
      href: "#mission",
    },
    {
      id: "vision",
      title: "Vision",
      text: "To be the consultancy people trust when their business needs to grow.",
      image: { src: "/pages/about/glance/pexels-david-underland-31067207.webp", alt: "Warm timber building edge against deep blue" },
      href: "#vision",
    },
    {
      id: "values",
      title: "Values",
      text: "Professionalism, integrity and reliability, and a real interest in our clients' growth.",
      image: { src: "/pages/about/glance/pexels-henry-acevedo-382866382-25812173.webp", alt: "White tiered building against a blue sky" },
      href: "#values",
    },
  ],
};
