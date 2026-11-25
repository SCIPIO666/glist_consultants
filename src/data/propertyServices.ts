/** Property Management, section 3: the services listing. */
export const propertyServices = {
  title: "What a good property manager does",
  text: "A full-service manager covers tenant sourcing and vetting, rent collection and remittance, maintenance coordination, monthly financial reporting and compliance, keeping your property occupied and your income predictable.",
  cta: { label: "Book a consultation", href: "/contact?service=property-management" },
  items: [
    { title: "Property marketing", text: "Your property advertised well, for rent or for sale, so the right people see it quickly." },
    { title: "Tenant screening and lease preparation", text: "Applicants vetted and tenancy agreements prepared, so you start with a reliable tenant." },
    { title: "Rent and service charge collection", text: "Every payment collected, tracked and remitted to you, with arrears followed up promptly." },
    { title: "Maintenance, repairs and remodelling", text: "Trusted help coordinated for routine upkeep, urgent repairs and upgrades, with you kept informed." },
    { title: "Ongoing communication", text: "One steady line to you and your tenants, so small issues never become disputes." },
    { title: "Property inspections", text: "Regular condition checks that catch problems early and protect the value of the building." },
    { title: "Tenancy administration", text: "Renewals, notices and records kept in order and compliant." },
    { title: "Monthly income reporting", text: "A clear statement of what came in and what went out, ready for your records and your taxes." },
  ],
} as const;
