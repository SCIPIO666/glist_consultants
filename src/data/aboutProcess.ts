/**
 * About "How we work" process. DRAFT COPY: the brief describes the approach
 * (client-focused, reliable, practical) but not a step-by-step process, so these
 * four steps are written from it. Have the client approve or reorder them.
 */
export const aboutProcess = {
  title: "How we work",
  lead: "Every engagement, from a single tax return to a full rental portfolio, follows the same simple path.",
  image: { src: "/pages/about/process.webp", alt: "Financial papers, a phone and a calculator on a desk" },
  steps: [
    {
      heading: "Understand",
      text: "We start by listening: your business or household, your obligations and where you want to get to.",
    },
    {
      heading: "Plan",
      text: "We agree what needs doing, who does what and the dates that matter, so nothing slips past a deadline.",
    },
    {
      heading: "Deliver",
      text: "We prepare, file, reconcile and manage on your behalf, to professional standards.",
    },
    {
      heading: "Grow together",
      text: "We stay alongside you with clear reporting and practical advice as your business or portfolio grows.",
    },
  ],
} as const;
