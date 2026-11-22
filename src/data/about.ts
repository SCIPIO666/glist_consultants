/**
 * About page copy. Wording follows the client brief (sections 1 and 4).
 * Edit here; layout lives in components/about.
 */
export const aboutHero = {
  breadcrumb: "About Us",
  eyebrow: "About Glist Consultants",
  titleLines: ["The strategic minds", "behind your numbers."],
  lead: "Glist Consultants is a professional business, financial, and property advisory firm. We deliver pragmatic, client-focused solutions that drive sustainable growth for startups, SMEs, and established enterprises.",
  primaryCta: { label: "Book a consultation", href: "/contact" },
  secondaryCta: { label: "Our services", href: "/services" },
  images: {
    main: { src: "/christina-wocintechchat-com-m-rg1y72eKw6o-unsplash.webp", alt: "A team meeting around a table in a bright office", position: "40% 50%" },
    small1: { src: "/pexels-pavel-danilyuk-7654167.webp", alt: "An accountant working through figures with a calculator", position: "50% 30%" },
    small2: { src: "/pexels-towfiqu-barbhuiya-3440682-8732777.webp", alt: "A property model held above a calculator", position: "45% 50%" },
  },
} as const;

export const aboutMeta = {
  title: "About Us",
  description:
    "Glist Consultants is a Kenyan advisory firm providing strategic tax, payroll, registration, accounting, and property management services to protect and grow your enterprise.",
} as const;

export const aboutBackground = {
  eyebrow: "Who we are",
  titleBefore: "A consultancy built to protect and propel the enterprises it",
  titleMark: "serves.",
  paragraphs: [
    "We navigate the complex intersection of regulatory compliance and business strategy. By managing your statutory obligations and financial operations, we free you to focus on core growth.",
    "Our practice is anchored in rigorous professionalism, absolute integrity, and a commitment to practical, actionable solutions that withstand scrutiny.",
  ],
  clientsHeading: "Who we advise",
  clients: [
    "Salaried professionals seeking wealth optimization",
    "Founders and scaling startups",
    "Small and medium-sized enterprises (SMEs)",
    "Established corporate entities and institutions",
    "Landlords and real estate investors",
    "Businesses requiring end-to-end compliance and accounting architecture",
  ],
  image: {
    src: "/pexels-tima-miroshnichenko-6694475.webp",
    alt: "A consultant reviewing financial documents at a desk",
    position: "50% 40%",
  },
  badge: "Guiding Success, Illuminating Paths.",
  cta: { label: "Explore our services", href: "/services" },
} as const;