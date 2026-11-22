/**
 * About "How we work" process. DRAFT COPY: the brief describes the approach
 * (client-focused, reliable, practical) but not a step-by-step process, so these
 * four steps are written from it. Have the client approve or reorder them.
 */
export const aboutProcess = {
  title: "Our Engagement Methodology",
  lead: "Every engagement—whether a targeted tax health check or comprehensive cross-functional management—follows a disciplined, four-phase approach.",
  image: { src: "/pages/about/process.webp", alt: "Financial papers, a phone and a calculator on a desk" },
  steps: [
    {
      heading: "01. Diagnostic Assessment",
      text: "We conduct a comprehensive review of your current operations, identifying regulatory exposures, compliance gaps, and opportunities for tax-efficient structuring.",
    },
    {
      heading: "02. Strategic Architecture",
      text: "We define the scope of engagement, establish clear timelines for all statutory and management deliverables, and align our advisory with your broader commercial objectives.",
    },
    {
      heading: "03. Rigorous Execution",
      text: "Our team assumes responsibility for the meticulous preparation, filing, and reconciliation of your accounts—ensuring total alignment with KRA, IFRS, and all relevant regulatory frameworks.",
    },
    {
      heading: "04. Continuous Advisory",
      text: "We provide ongoing transparency through detailed management reporting, proactively updating you on legislative shifts and advising on strategic growth milestones.",
    },
  ],
} as const;