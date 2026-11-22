/**
 * About "How we work" process. DRAFT COPY: the brief describes the approach
 * (client-focused, reliable, practical) but not a step-by-step process, so these
 * four steps are written from it. Have the client approve or reorder them.
 */
export const aboutProcess = {
  title: "How we work",
  lead: "Whether it's a single tax return or managing your whole portfolio, we follow the same simple, reliable process.",
  image: { src: "/pages/about/process.webp", alt: "Financial papers, a phone and a calculator on a desk" },
  steps: [
    {
      heading: "We listen first",
      text: "We sit down with you to understand your business, your obligations, and where you want to go.",
    },
    {
      heading: "We make a plan",
      text: "We agree on what needs to be done, who's doing it, and the dates that matter, so nothing slips through the cracks.",
    },
    {
      heading: "We do the work",
      text: "We prepare, file, and manage everything on your behalf, to a professional standard.",
    },
    {
      heading: "We stick around",
      text: "We give you clear reports and practical advice as your business or property portfolio grows.",
    },
  ],
} as const;