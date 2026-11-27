/** Property Management, section 3: rental property management services. */
export const propertyServices = {
  title: "What a good property manager does",
  text: "A good property manager finds and vets tenants, collects and remits rent, coordinates maintenance and reports on the money every month, all within the law. Your property stays occupied and your income stays predictable.",
  cta: { label: "Book a consultation", href: "/contact?service=property-management" },
  items: [
    { title: "Property marketing and tenant sourcing", text: "We advertise your rental, handle enquiries and arrange viewings, so it spends less time empty." },
    { title: "Tenant screening and placement", text: "We check prospective tenants, help you choose and coordinate the move-in." },
    { title: "Lease preparation and tenancy administration", text: "We prepare tenancy agreements and keep renewals, notices and tenant records in order." },
    { title: "Rent and service charge collection", text: "We track rent and service charge payments, follow up on arrears and keep clear records of what was collected and remitted." },
    { title: "Property inspections", text: "We check the condition of the property, record any issues and flag maintenance before it turns into a bigger bill." },
    { title: "Maintenance, repairs and remodelling", text: "We arrange routine maintenance, urgent repairs and improvement works with service providers, and keep you informed." },
    { title: "Landlord and tenant relations", text: "One point of contact for owners and tenants, who handles requests and day-to-day concerns." },
    { title: "Rental income records and reporting", text: "We keep rental income records and send regular reports on collections, expenses and how the property is performing." },
  ],
} as const;
