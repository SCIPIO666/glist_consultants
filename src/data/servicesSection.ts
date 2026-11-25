/**
 * Home services section copy. The seven panels come from data/services.ts so
 * titles and photos stay in one place; `wheelLabels` are the short names printed
 * on the wheel (the full titles show on the Services page).
 */
export const servicesSection = {
  title: "Our services",
  cta: { label: "Book a consultation", href: "/contact" },
  srListLabel: "Our seven services",
  wheelLabels: {
    taxation: "Taxation",
    payroll: "Payroll",
    registrations: "Registrations",
    bookkeeping: "Bookkeeping",
    "stock-taking": "Stock taking",
    "financial-advisory": "Financial advisory",
    "property-management": "Property management",
  } as Record<string, string>,
} as const;
