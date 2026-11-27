/**
 * Home "Why choose us" copy. Edit the words here; layout lives in components/home/why.
 * The reasons are drawn from the six commitments in the client brief
 * (professionalism, reliability, practical solutions, client focus, convenience, growth).
 * Keep claims honest: no invented statistics or client counts.
 *
 * Keep each `text` under about 55 characters: it sits in a compact pill (two lines).
 * End a title line with "?" to have the question mark drawn in red.
 */
export type WhyReason = {
  title: string;
  text: string;
};

export const whyReasons: {
  srLabel: string;
  /** One entry per line of the big title. */
  titleLines: string[];
  cta: { label: string; href: string };
  srListLabel: string;
  items: WhyReason[];
} = {
  srLabel: "Why choose Glist Consultants",
  titleLines: ["Why", "choose", "us?"],
  cta: { label: "About us", href: "/about" },
  srListLabel: "Reasons to choose Glist Consultants",
  items: [
    { title: "Professionalism", text: "We hold every job to a high standard." },
    { title: "Reliability", text: "Help that arrives on time, every time." },
    { title: "Convenience", text: "Business, financial and property services under one roof." },
    { title: "Client-focused", text: "We take time to understand what you need." },
  ],
};
