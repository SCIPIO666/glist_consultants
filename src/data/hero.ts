/**
 * Home hero content. Edit copy here; layout lives in components/home/hero.
 * Later this can move to Sanity "homePage" if the client wants to edit it.
 */
const alt1 = "/pages/home/hero/alt1";
const alt2 = "/pages/home/hero/alt2";

export const hero = {
  eyebrow: "Accountancy | Taxation | Advisory",
  /** One entry per line; the second line is styled as the accent. */
  titleLines: ["Guiding ", "Success"],
  lead:
    "A business, financial and property consultancy. Let us handle the numbers so you can focus on growth.",
  primaryCta: { label: "Book a consultation", href: "/contact" },
  whatsappMessage: "Hello Glist Consultants, I would like to book a consultation.",
} as const;

/** Alt 1 (default): the semicircle backdrop and the loop of five coins. */
export const heroAlt1 = {
  background: `${alt1}/main-circle.webp`,
  coins: [
    { src: `${alt1}/loopcircle-1.webp`, alt: "Adviser working through accounts on a laptop", position: "45% 40%" },
    { src: `${alt1}/loopcircle-2.webp`, alt: "Client and adviser reviewing documents across a desk", position: "50% 40%" },
    { src: `${alt1}/loopcircle-3.webp`, alt: "Three people in a consultation meeting", position: "50% 58%" },
    { src: `${alt1}/loopcircle-4.webp`, alt: "Laptop, calculator and notes during a budgeting review", position: "50% 50%" },
    { src: `${alt1}/loopcircle-5.webp`, alt: "Smiling adviser presenting a financial summary", position: "50% 22%" },
  ],
} as const;

/** Alt 2: one big circle with smaller ones tucked behind it. */
export const heroAlt2 = {
  main: { src: `${alt2}/maincircle.webp`, alt: "Laptop, calculator and notes during a budgeting review", position: "50% 50%" },
  side: [
    { src: `${alt2}/circle1.webp`, alt: "Adviser carrying folders and a calculator", position: "50% 55%" },
    { src: `${alt2}/circle2.webp`, alt: "Man working through figures with a calculator", position: "50% 55%" },
    { src: `${alt2}/circle3.webp`, alt: "Man reading a financial document", position: "50% 55%" },
  ],
} as const;

/** The text loop under the coins. Mirrors the seven services in the brief. */
export const heroTicker = [
  "Tax compliance",
  "Payroll management",
  "Business registrations",
  "Bookkeeping and accounting",
  "Stock taking",
  "Personal financial advisory",
  "Rental property management",
] as const;