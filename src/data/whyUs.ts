/**
 * Home "Why choose us" copy. Edit the words here; layout lives in components/home/why.
 * The reasons are drawn from the six commitments in the client brief
 * (professionalism, reliability, practical solutions, client focus, convenience, growth).
 * Keep claims honest: no invented statistics or client counts.
 *
 * The reasons screen is minimal on purpose: a title and one button on the left,
 * four numbered reasons on the right. No eyebrow, no description.
 */
export type WhyReason = {
  title: string;
  text: string;
};

export const whyReasons: {
  /** One entry per line of the big title. */
  titleLines: string[];
  cta: { label: string; href: string };
  srListLabel: string;
  items: WhyReason[];
} = {
  titleLines: ["Why", "choose", "us"],
  cta: { label: "About us", href: "/about" },
  srListLabel: "Reasons to choose Glist Consultants",
  items: [
    {
      title: "Advice you can act on",
      text: "We solve the problem in front of you: the return to file, the payroll to run, the tenant to find. Plain language, clear next steps.",
    },
    {
      title: "Deadlines kept, records straight",
      text: "Statutory dates do not move, so we plan around them. Dependable, timely support delivered to professional standards.",
    },
    {
      title: "One roof, seven services",
      text: "Tax, payroll, registrations, books, stock, personal finance and rentals, with one team that already knows your business.",
    },
    {
      title: "Built around you",
      text: "We take the time to understand your situation before we advise, then work alongside you as you grow.",
    },
  ],
};
