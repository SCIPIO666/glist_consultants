/**
 * About "How we work" process. DRAFT COPY: the brief describes the approach
 * (client-focused, reliable, practical) but not a step-by-step process, so these
 * four steps are written from it. Have the client approve or reorder them.
 */
export const aboutProcess = {
  title: "How we work",
  lead: "Whether it is one tax return or a whole payroll, you tell us what you need and we take it from there.",
  image: { src: "/pages/about/process.webp", alt: "Financial papers, a phone and a calculator on a desk" },
  steps: [
    {
      heading: "Tell us what you need",
      text: "You share the details of your business, your staff, your property or your records. We take time to understand your situation.",
    },
    {
      heading: "We agree the plan",
      text: "We agree what needs to be done and the statutory dates that matter, so nothing is missed.",
    },
    {
      heading: "We handle the numbers",
      text: "We calculate, prepare, file and keep the records, to a professional standard and on time.",
    },
    {
      heading: "You focus on growth",
      text: "You get clear reports and practical advice, and we stay alongside you as you grow.",
    },
  ],
} as const;