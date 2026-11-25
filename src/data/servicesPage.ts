/**
 * Services page copy and images. The seven services themselves (titles, intros, task
 * lists) come from data/services.ts, so there is one place to edit them.
 *
 * Images: the rail cards reuse each service's home-page photo (`services[i].image`).
 * The listing rows use the larger photos below, which live in public/pages/services.
 */
export const servicesHero = {
  title: "Our services",
  lead: "Explore our expertise.",
  cta: { label: "Book a consultation", href: "/contact" },
  image: "/pages/services/hero/hero.webp",
} as const;

export const servicesIntro = {
  title: "We keep the work behind your money in order",
  lead: "Tax, payroll, registrations, books, stock, personal finance and rentals, all in one place.",
  link: { label: "Explore our services", href: "#service-list" },
  srRailLabel: "Jump to a service",
} as const;

/** Rail card shapes, in service order: width and height in "units" (1 unit scales with the screen). */
export const railShapes = [
  { w: 34, h: 24 },
  { w: 20, h: 17 },
  { w: 22, h: 30 },
  { w: 30, h: 20 },
  { w: 21, h: 27 },
  { w: 28, h: 22 },
  { w: 24, h: 31 },
] as const;

/** Listing photo per service slug. */
export const listingImages: Record<string, { src: string; alt: string }> = {
  taxation: { src: "/pages/services/taxes.webp", alt: "Tax documents and a calculator on a desk" },
  payroll: { src: "/pages/services/accounts.webp", alt: "Calculator and payroll reports on a desk" },
  registrations: { src: "/pages/services/registrations.webp", alt: "Business owner holding registration documents" },
  bookkeeping: { src: "/pages/services/books.webp", alt: "Ledgers, laptop and phone on a desk" },
  "stock-taking": { src: "/pages/services/inventory.webp", alt: "Woman counting stock in a storeroom" },
  "financial-advisory": { src: "/pages/services/advisory.webp", alt: "Adviser thinking through a client's finances" },
  "property-management": { src: "/pages/services/rental.webp", alt: "Apartment block managed for its landlord" },
};

export const listingCopy = {
  srLabel: "All services",
  enquire: "Enquire about this service",
};
