/**
 * Home "Why choose us" copy. Edit the words here; layout lives in components/home/why.
 * The reasons are drawn from the six commitments in the client brief
 * (professionalism, reliability, practical solutions, client focus, convenience, growth).
 * Keep claims honest: no invented statistics or client counts.
 */
export type WhyReason = {
  tag: string;
  title: string;
  text: string;
};

export const whyReasons: {
  title: string;
  cta: { label: string; href: string };
  srListLabel: string;
  items: WhyReason[];
} = {
  title: "Why choose us",
  cta: { label: "More about Glist", href: "/about" },
  srListLabel: "Reasons to choose Glist Consultants",
  items: [
    {
      tag: "Practical",
      title: "Advice you can act on",
      text: "We solve the problem in front of you: the return to file, the payroll to run, the tenant to find. Plain language and clear next steps, never theory for its own sake.",
    },
    {
      tag: "Reliable",
      title: "Deadlines kept, records straight",
      text: "Statutory dates do not move, so we plan around them. You get dependable, timely support delivered to professional standards.",
    },
    {
      tag: "Convenient",
      title: "One roof, seven services",
      text: "Tax, payroll, registrations, books, stock, personal finance and rentals, all with one team that already knows your business.",
    },
    {
      tag: "Client-first",
      title: "Built around you",
      text: "We take the time to understand your situation before we advise, then work alongside you as your business or portfolio grows.",
    },
  ],
};
