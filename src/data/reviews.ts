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
  label: string;
  /** 7 to 10 words. The accent phrase gets the gradient. */
  heading: string;
  headingAccent: string;
  cta: { label: string; href: string };
  items: Review[];
} = {
  label: "Client Outcomes",
  heading: "Regulatory exposure mitigated, operations streamlined, and enterprises",
  headingAccent: "positioned to scale.",
  cta: { label: "Book a consultation", href: "/contact" },
  items: [
    {
      quote:
        "The transition was seamless. Rent is collected on time, and the monthly reporting gives me complete visibility into my property's yield. I no longer deal with tenant friction.",
      name: "Amina W.",
      role: "Property Investor",
      location: "Kilimani, Nairobi",
      service: "Rental Property Management",
      stars: 5,
    },
    {
      quote:
        "Their team audited our tax processes and identified compliance gaps we didn't know existed. Filing is now proactive, and we are fully prepared for any KRA review.",
      name: "Peter K.",
      role: "Managing Director",
      location: "Thika",
      service: "Taxation and Tax Compliance",
      stars: 5,
    },
    {
      quote:
        "From incorporation to setting up our eTIMS-compliant invoicing and IFRS reporting structure, Glist provided the technical expertise a startup needs to scale securely.",
      name: "Grace N.",
      role: "Startup Founder",
      location: "Westlands, Nairobi",
      service: "Registrations and Bookkeeping",
      stars: 5,
    },
    {
      quote:
        "A rigorous and structured financial plan. They didn't just look at my budget; they helped me restructure my debt and build a realistic strategy for wealth accumulation.",
      name: "Daniel O.",
      role: "Salaried Professional",
      location: "Nakuru",
      service: "Personal Financial Advisory",
      stars: 5,
    },
  ],
};