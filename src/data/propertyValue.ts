/**
 * Property Management, section 4: value proposition.
 * Content selected and reworded from the reference site (residential, commercial and
 * service-charge angle only; sales and short-stay left out as per the brief).
 */
export const propertyValue = {
  title: "Property management without the stress.",
  image: { src: "/pages/property/pexels-mahmoud-zakariya-2154822140-34224687.webp", alt: "A managed residential estate with well-kept grounds", position: "50% 55%" },
  intro:
    "Glist manages residential, commercial and estate properties for owners who want steady rental income without the day-to-day work. Whether you own one apartment or a whole block, we handle tenants, rent, repairs and reporting.",
  challenges: [
    { title: "Legal, tenant and maintenance complexity", text: "Landlord and tenant law has to be followed to the letter. Good tenants take marketing and vetting to find. Repairs need trusted vendors on call." },
    { title: "Pricing that protects your income", text: "Set the rent too high and the unit sits empty. Set it too low and you lose income. We price to the market, so units fill fast and returns stay steady." },
  ],
  pointsLabel: "What we take care of",
  pointsTitle: "Four details that protect your property.",
  points: [
    { title: "Legal compliance", text: "Lease agreements, tenant disputes and landlord-tenant requirements handled correctly." },
    { title: "Maintenance and repairs", text: "Prompt upkeep and trusted vendors, so the property stays in top condition." },
    { title: "Rental income", text: "Competitive rates and consistent rent collection for steady returns." },
    { title: "Tenant screening", text: "Quality tenants found and placed quickly through thorough vetting and marketing." },
  ],
} as const;
