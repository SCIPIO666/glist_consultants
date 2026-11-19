/**
 * Home intro content. Edit the words here; layout lives in components/home/intro.
 * Later this can move to Sanity "homePage" if the client wants to edit it.
 */

export const introOpening = {
  eyebrow: "What is Glist",
  /** The big word. A gold dot is added after it. */
  word: "Clarity",
} as const;

/**
 * Wrap a word in *asterisks* to have it hand-circled as it is read.
 * Keep starred phrases short (one or two words) so they never wrap badly.
 */
export const introDescription =
  "Glist Consultants is a  financial expertise company. We give individuals, entrepreneurs and growing businesses *reliable*, practical support with tax, payroll, registrations, books and property management, so you stay *compliant*, decide with confidence and focus on *growth*.";

export const introGraph = {
  /** Two lines. The second line gets the hand-drawn underline. */
  taglineTop: "Get the numbers right,",
  taglineAccent: "and growth follows.",
  /** Small caption under the chart. Keep it honest: this chart is an illustration, not real data. */
  caption: "YOY growth",
  srSummary: "Illustrative chart: business revenue rises steadily over five years, dips once, then climbs sharply.",
  /** Bottom to top. */
  yLabels: ["0", "1M", "2M", "3M", "4M"],
  yTitle: "Annual revenue (KSh)",
  /** Left to right. */
  xLabels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
} as const;

/**
 * The hand-drawn growth line, as [x, y] pairs in 0..1 (y = 1 is the top of the chart).
 * Smoothed into a curve at runtime. The small wobble is what makes it look hand-drawn.
 */
export const introGraphPoints: [number, number][] = [
  [0.0, 0.04], [0.017, 0.042], [0.031, 0.044], [0.046, 0.048], [0.063, 0.05], [0.077, 0.055],
  [0.092, 0.053], [0.11, 0.06], [0.127, 0.056], [0.141, 0.07], [0.155, 0.072], [0.172, 0.071],
  [0.186, 0.077], [0.201, 0.084], [0.219, 0.089], [0.234, 0.1], [0.25, 0.108], [0.265, 0.12],
  [0.283, 0.128], [0.298, 0.151], [0.312, 0.159], [0.327, 0.161], [0.345, 0.166], [0.361, 0.183],
  [0.377, 0.201], [0.389, 0.229], [0.408, 0.241], [0.424, 0.265], [0.436, 0.28], [0.454, 0.294],
  [0.467, 0.298], [0.486, 0.314], [0.498, 0.337], [0.514, 0.342], [0.532, 0.347], [0.547, 0.344],
  [0.561, 0.344], [0.577, 0.345], [0.592, 0.328], [0.608, 0.297], [0.627, 0.264], [0.64, 0.25],
  [0.655, 0.243], [0.673, 0.234], [0.686, 0.241], [0.702, 0.25], [0.72, 0.235], [0.734, 0.251],
  [0.748, 0.271], [0.765, 0.311], [0.781, 0.334], [0.799, 0.35], [0.813, 0.39], [0.827, 0.449],
  [0.845, 0.479], [0.858, 0.527], [0.876, 0.552], [0.889, 0.634], [0.908, 0.696], [0.922, 0.727],
  [0.936, 0.774], [0.952, 0.874], [0.968, 0.892], [0.985, 0.811], [1.0, 0.924],
];

export const introClose = {
  /** No eyebrow on this screen, by design. */
  title: "For people building something that lasts.",
  paragraphs: [
    "Glist handles all the numbers ,from tax compliance to managing your payroll,fast tracking all business registrations and licensing,handling your bookkeeping and accounts, managing your inventory,providing personal financial advice and managing rental property  under one roof of experts.We make it easy for  individuals, entrepreneurs and established businesses to decide with confidence.",
    "We crunch the numbers. You focus on growth.",
  ],
  cta: { label: "About Glist", href: "/about" },
} as const;
