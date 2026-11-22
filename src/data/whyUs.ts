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
      title: "We keep you compliant",
      text: "We track your tax obligations against the Income Tax Act and VAT Act, so you avoid penalties and stay off KRA's radar.",
    },
    {
      title: "We deal with the authorities",
      text: "If KRA comes knocking, we handle it. From routine health checks to objections and appeals, we represent your interests.",
    },
    {
      title: "One team, all your numbers",
      text: "Payroll, bookkeeping, and tax under one roof means no gaps, no miscommunications, and no dropped balls.",
    },
    {
      title: "We spot problems early",
      text: "We review your processes to find compliance gaps before they become expensive problems, and we train your team to stay sharp.",
    },
    {
      title: "Your records are audit-ready",
      text: "We keep meticulous records—from eTIMS invoices to IFRS-aligned statements—so you're always prepared.",
    },
    {
      title: "We grow as you grow",
      text: "Whether you're a startup or restructuring for efficiency, our advice evolves as your business does.",
    },
  ],
};