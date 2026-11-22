/**
 * About hero (futurecomes layout + periscope cursor reveal). Minimal wording on
 * purpose. The seven services come from the brief; the four groups below just
 * bundle them so the right-hand list stays short.
 */
export const aboutHero = {
  /** Screen-reader / SEO heading. The visible hero is the big "7 services" statement. */
  h1: "About Glist Consultants",
  number: "7",
  numberLabel: "services",
  connector: "in",
  caption: ["of practical", "business, financial", "and property support."],
  groups: [
    { title: "Tax & compliance", text: "Taxation, payroll, registrations", icon: "tax" },
    { title: "Accounts & records", text: "Bookkeeping, stock taking", icon: "books" },
    { title: "Personal advisory", text: "Budgets, savings, debt", icon: "advice" },
    { title: "Property", text: "Rental property management", icon: "property" },
  ],
  revealImage: { src: "/pages/about/hero.webp" },
} as const;

export type AboutHeroIcon = (typeof aboutHero.groups)[number]["icon"];



