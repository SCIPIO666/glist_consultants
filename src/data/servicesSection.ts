/**
 * Home services section copy. The seven wedges themselves come from
 * data/services.ts so titles, links and photos stay in one place.
 *
 * Minimal on purpose: a title and one button. No eyebrow, no description.
 */
export const servicesSection = {
  titleLines: ["Our", "services"],
  cta: { label: "Book a consultation", href: "/contact" },
  /** Short names for the wedges, split into lines. Keyed by service slug. */
  wheelLabels: {
    taxation: ["Taxation"],
    payroll: ["Payroll"],
    registrations: ["Registrations"],
    bookkeeping: ["Bookkeeping"],
    "stock-taking": ["Stock", "taking"],
    "financial-advisory": ["Financial", "advisory"],
    "property-management": ["Property", "management"],
  } as Record<string, string[]>,
} as const;
