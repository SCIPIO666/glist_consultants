/**
 * Home reviews. IMPORTANT: the four reviews below are SAMPLE PLACEHOLDERS written
 * to show the layout. They are not from real clients. Before the site goes live,
 * replace each one with a genuine testimonial (with the client's permission),
 * then set `reviewsAreSamples` to false. While it is true, a reminder badge shows
 * in development (never in production builds).
 */
export type Review = {
  quote: string;
  name: string;
  role: string;
  location: string;
  service: string;
  stars: number;
};

export const reviewsAreSamples = true;

export const reviewsSection: {
  eyebrow: string;
  titleBefore: string;
  titleMark: string;
  titleAfter: string;
  lead: string;
  cta: { label: string; href: string };
  items: Review[];
} = {
  eyebrow: "Client reviews",
  titleBefore: "The",
  titleMark: "proof",
  titleAfter: " is in the paperwork.",
  lead: "Landlords, founders and families on what changed once the numbers were in our hands.",
  cta: { label: "Book a consultation", href: "/contact" },
  items: [
    {
      quote:
        "Rent now arrives on time and I get a clear monthly statement. I stopped chasing tenants the week Glist took over.",
      name: "Amina W.",
      role: "Landlord",
      location: "Kilimani, Nairobi",
      service: "Rental property management",
      stars: 5,
    },
    {
      quote:
        "My returns are filed before the deadline and I finally understand what I owe and why. No more last-day panic.",
      name: "Peter K.",
      role: "Shop owner",
      location: "Thika",
      service: "Taxation and tax compliance",
      stars: 5,
    },
    {
      quote:
        "They registered the company, set up our books and walked us through every step in plain language.",
      name: "Grace N.",
      role: "Startup founder",
      location: "Westlands, Nairobi",
      service: "Registration and bookkeeping",
      stars: 5,
    },
    {
      quote:
        "A practical budget and a plan to clear my debts. For the first time I know where my salary goes each month.",
      name: "Daniel O.",
      role: "Salaried professional",
      location: "Nakuru",
      service: "Personal financial advisory",
      stars: 5,
    },
  ],
};
