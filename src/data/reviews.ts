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
  /** Shown as dd/mm/yyyy under the card. Use the real date of the review. */
  date: string;
  /** Not printed on the card, but kept so each review can be matched to a service later. */
  location: string;
  service: string;
  stars: number;
};

export const reviewsAreSamples = true;

export const reviewsSection: {
  label: string;
  /** Fixed heading, 7 to 10 words. */
  title: string;
  cta: { label: string; href: string };
  items: Review[];
} = {
  label: "Testimonials",
  title: "Words from the clients whose numbers we keep in order.",
  cta: { label: "Book a consultation", href: "/contact" },
  items: [
    {
      quote:
        "Rent now arrives on time and I get a clear monthly statement. I stopped chasing tenants the week Glist took over. Even the repair bills come with receipts I can understand.",
      name: "Wanjiru Mwangi",
      date: "14/09/2026",
      location: "Kilimani, Nairobi",
      service: "Rental property management",
      stars: 5,
    },
    {
      quote:
        "My returns are filed before the deadline and I finally understand what I owe and why. No more last-day panic on iTax. I just send my records and it is done.",
      name: "Brian Otieno",
      date: "02/10/2026",
      location: "Kisumu",
      service: "Taxation and tax compliance",
      stars: 5,
    },
    {
      quote:
        "They registered the company, set up our books and walked us through every step in plain language. We got our KRA PIN and our eGP account in the same week.",
      name: "Fatuma Hassan",
      date: "21/10/2026",
      location: "Mombasa",
      service: "Registration and bookkeeping",
      stars: 5,
    },
    {
      quote:
        "A practical budget and a plan to clear my debts. For the first time I know where my salary goes each month, and my payslips are always accurate and on time.",
      name: "Kevin Kiprop",
      date: "05/11/2026",
      location: "Eldoret",
      service: "Personal financial advisory",
      stars: 5,
    },
  ],
};
