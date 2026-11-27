/**
 * About page content sections (Background, Mission, Vision, Values), each with
 * a fixed vertical title and a list of headed paragraphs.
 * Background items and Values come straight from the client brief.
 * DRAFT COPY: Mission and Vision items are written from the brief's tagline and
 * values (the brief has no mission/vision text). Have the client approve them.
 * `id` matches the links in the "Glist at a glance" strip.
 */
export type AboutItem = { heading: string; text: string };
export type AboutSectionData = { id: string; title: string; items: AboutItem[] };

export const aboutSections: AboutSectionData[] = [
  {
    id: "background",
    title: "Our background",
    items: [
      {
        heading: "Who we are",
        text: "Glist Consultants is a business, financial and property consultancy in Kenya. We give individuals, entrepreneurs, startups, SMEs and established businesses practical, dependable help.",
      },
      {
        heading: "What we do",
        text: "We help our clients keep up with their financial obligations, meet statutory requirements, run their operations and make sound financial decisions.",
      },
      {
        heading: "Who we serve",
        text: "Individuals and salaried professionals, entrepreneurs and startups, SMEs, established companies and institutions, and landlords and property investors.",
      },
    ],
  },
  {
    id: "mission",
    title: "Our mission",
    items: [
      {
        heading: "Reliable support",
        text: "To give clients dependable, timely help with the obligations that cannot wait, such as tax, payroll, registrations and records.",
      },
      {
        heading: "Practical solutions",
        text: "To answer real business and financial needs in plain language, with clear next steps instead of theory.",
      },
      {
        heading: "Lasting partnership",
        text: "To work alongside our clients as their businesses and property portfolios grow.",
      },
    ],
  },
  {
    id: "vision",
    title: "Our vision",
    items: [
      {
        heading: "Illuminating paths",
        text: "To be the consultancy people trust to make tax and statutory rules clear.",
      },
      {
        heading: "Sustainable growth",
        text: "To see every client we serve grow with confidence, compliance and clarity about their numbers.",
      },
    ],
  },
  {
    id: "values",
    title: "Our values",
    items: [
      { heading: "Professionalism", text: "We keep our standards high." },
      { heading: "Reliability", text: "We are dependable and we deliver on time." },
      { heading: "Practical solutions", text: "We solve real business and money problems." },
      { heading: "Client-focused approach", text: "We take time to understand what each client needs." },
      { heading: "Convenience", text: "Multiple business, financial and property services under one roof." },
      { heading: "Commitment to growth", text: "We stay alongside our clients as they grow." },
    ],
  },
];
