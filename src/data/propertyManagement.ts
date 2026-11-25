/**
 * Property Management page copy. The page follows the structure of the reference site,
 * section by section, with Glist's own wording. The eight tasks come from the brief
 * (data/services.ts, "property-management"); the blurbs below explain each in one line.
 *
 * SAMPLE CONTENT (flagged): the testimonials and the three news items are placeholders
 * to show the layout. Replace them with real ones before launch.
 */
export const propertyMeta = {
  title: "Rental Property Management",
  description:
    "Rental property management in Kenya: tenant sourcing, rent collection, inspections, maintenance coordination and clear income reporting for landlords.",
} as const;

export const propertyHero = {
  titleStrong: "We run your rentals",
  titleRest: "so you don't have to.",
  lead: "Tenants, rent and repairs take real time. Hand them to one dependable team and keep the income.",
  cta: { label: "Get help now", href: "#enquire" },
  image: "/pages/services/rental.webp",
} as const;

/** Section 2: the three big cards (the reference shows settlement figures; we have no real figures, so we show the job). */
export const propertyPillars = {
  title: "When managing tenants gets heavy, hand it to Glist.",
  cta: { label: "All services", href: "/services#property-management" },
  items: [
    { word: "Find", label: "The right tenant", text: "We source, screen and place tenants so your units are not sitting empty." },
    { word: "Collect", label: "Rent on time", text: "We monitor payments, follow up on arrears and keep clean records of every shilling." },
    { word: "Maintain", label: "The property", text: "We inspect, coordinate repairs and protect the value of what you own." },
  ],
} as const;

/** Section 3: the enquiry form (shares the contact form). */
export const propertyEnquiry = {
  id: "enquire",
  eyebrow: "No obligation",
  title: "Tell us about your property.",
  text: "Share a few details and a member of the team will get back to you. It costs nothing to ask.",
  defaultServiceSlug: "property-management",
} as const;

/** Section 4: three feature cards (numbered). `image` is optional: without one the card shows a gradient. */
export const propertyFocus = {
  title: "We can help with every part of letting a property.",
  cta: { label: "All our services", href: "/services#property-management" },
  items: [
    { title: "Tenant placement", text: "From the first viewing to a signed tenancy.", href: "/services#property-management", image: "/pages/services/rental.webp" },
    { title: "Rent and arrears", text: "Collection, monitoring and polite, firm follow-up.", href: "/services#property-management", image: "/pages/home/services-intro/property-management.webp" },
    { title: "Inspections and repairs", text: "Regular checks and trusted help when something breaks.", href: "/services#property-management", image: "" },
  ],
} as const;

/** Section 5: about (image left, text right). */
export const propertyAbout = {
  title: "When your rental becomes a second job, Glist is your first call.",
  text: "Glist Consultants gives property owners and landlords reliable rental management, built to improve occupancy, streamline rent collection and protect property value. You stay the owner. We handle the daily work.",
  cta: { label: "About us", href: "/about" },
  image: "/pages/home/services-intro/property-management.webp",
  imageAlt: "An apartment block managed on behalf of its landlord",
} as const;

/** Section 6: mission, over a photo. */
export const propertyMission = {
  label: "Our approach",
  text: "We understand what a landlord loses sleep over: empty units, late rent and surprise repairs. So we work to a simple routine of finding good tenants, tracking every payment and keeping the building in shape.",
  image: "/pages/services/rental.webp",
} as const;

/** Section 7: three numbered check-offs. */
export const propertyWhy = {
  title: "When you hire us, consider these to-dos checked off.",
  items: [
    { title: "Tenant sourcing and placement", text: "We advertise, show, screen and place tenants, then handle the tenancy paperwork." },
    { title: "Rent collection and arrears follow-up", text: "We monitor every payment and chase arrears so you do not have to." },
    { title: "Inspections, repairs and reporting", text: "We inspect the property, coordinate repairs and send you clear income records." },
  ],
} as const;

/** Section 8: the eight tasks as cards. */
export const propertyTasks = {
  title: "Rental trouble? Glist is on your side.",
  cta: { label: "All services", href: "/services" },
  items: [
    { title: "Tenant sourcing and placement", text: "Finding, screening and placing the right tenant." },
    { title: "Rent collection and monitoring", text: "Tracking every payment against what is due." },
    { title: "Tenancy administration", text: "Agreements, renewals and notices kept in order." },
    { title: "Property inspections", text: "Regular checks that catch problems early." },
    { title: "Maintenance and repairs", text: "Coordinating trusted help and keeping you informed." },
    { title: "Rent arrears follow-up", text: "Monitoring late rent and acting on it promptly." },
    { title: "Landlord and tenant relations", text: "A calm go-between, so relationships stay good." },
    { title: "Income records and reporting", text: "Clear statements of what came in and what went out." },
  ],
} as const;

/** Section 9: testimonials (SAMPLE, replace before launch). */
export const propertyTestimonials = {
  title: "Get out of landlord limbo and get on with your life.",
  cta: { label: "Book a consultation", href: "/contact" },
  areSamples: true,
  items: [
    {
      quote: "Rent now arrives on time and I get a clear monthly statement. I stopped chasing tenants the week Glist took over.",
      name: "Wanjiru Mwangi",
      date: "14/09/2026",
    },
    {
      quote: "A unit that sat empty for months was let within weeks. The tenant was properly screened and the paperwork was done for me.",
      name: "Hassan Abdi",
      date: "29/09/2026",
    },
    {
      quote: "When a pipe burst on a Sunday they had a repairer there and kept me updated. I never had to leave my own job.",
      name: "Mercy Chebet",
      date: "18/10/2026",
    },
  ],
} as const;

/** Section 10: recent news (SAMPLE titles, replace with real insights). */
export const propertyNews = {
  title: "Recent news",
  all: { label: "All news", href: "/insights" },
  items: [
    { title: "What a good tenancy agreement should cover", excerpt: "The clauses landlords most often wish they had written down.", date: "20 November 2026", href: "/insights" },
    { title: "Handling rent arrears without losing the tenant", excerpt: "A calm, step-by-step approach to late payment.", date: "12 November 2026", href: "/insights" },
    { title: "Keeping rental income records ready for tax", excerpt: "What to keep, and when, so filing is quick.", date: "4 November 2026", href: "/insights" },
  ],
} as const;

/** Section 11 and 12: final call to action and quick question strip. */
export const propertyClosing = {
  title: "Your tenant worries end here.",
  text: "Tell us about your property and we will explain how we can take the daily work off your hands.",
  cta: { label: "Book a consultation", href: "/contact?service=property-management" },
  question: { title: "Have a question?", text: "Call, message or email us. We are happy to talk it through." },
  image: "/pages/home/insight-bg/bg.webp",
} as const;
