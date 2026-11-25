/**
 * Home "Why choose us" copy. Edit the words here; layout lives in components/home/why.
 * The reasons are drawn from the six commitments in the client brief
 * (professionalism, reliability, practical solutions, client focus, convenience, growth).
 * Keep claims honest: no invented statistics or client counts.
 *
 * The reasons screen is minimal on purpose: a title and one button on the left,
 * six numbered reasons on the right. No eyebrow, no description.
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
      title: "Statutory compliance, safeguarded",
      text: "We meticulously review your tax processes against the Income Tax Act and VAT Act, ensuring your business avoids penalties and regulatory exposure.",
    },
    {
      title: "Revenue authority representation",
      text: "From routine KRA health checks to handling objections and appeals at the Tax Appeals Tribunal, we stand between you and the authorities.",
    },
    {
      title: "Cross-functional financial visibility",
      text: "Unify your payroll, bookkeeping, and tax compliance under one team. We bridge the gap between daily operations and strategic financial planning.",
    },
    {
      title: "Proactive risk mitigation",
      text: "We identify compliance gaps and knowledge shortfalls within your organization before they become costly liabilities, offering tailored training and solutions.",
    },
    {
      title: "Audit-ready records, always",
      text: "Dependable, timely support with meticulous record-keeping. Whether you need eTIMS-compliant invoicing or IFRS-aligned financial statements, your books are prepared.",
    },
    {
      title: "Tailored for your next stage of growth",
      text: "Whether you are a startup navigating pre-setup consultancy or an established enterprise restructuring for efficiency, we adapt our advisory to your lifecycle.",
    },
  ],
};