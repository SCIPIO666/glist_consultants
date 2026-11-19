/**
 * About page copy. Wording follows the client brief (sections 1 and 4).
 * Edit here; layout lives in components/about.
 */
export const aboutHero = {
  breadcrumb: "About Us",
  eyebrow: "About Glist Consultants",
  titleLines: ["The team behind", "your numbers."],
  lead: "Glist Consultants is a professional business, financial and property consultancy. We provide reliable, practical and client-focused solutions to individuals, entrepreneurs, startups, SMEs and established businesses.",
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
    "Meet Glist Consultants: a professional business, financial and property consultancy in Kenya offering tax, payroll, registration, bookkeeping, stock taking, personal financial advisory and rental property management.",
} as const;

export const aboutBackground = {
  eyebrow: "Who we are",
  titleBefore: "A consultancy built around the people it",
  titleMark: "serves.",
  paragraphs: [
    "We support our clients in navigating financial obligations, meeting statutory compliance requirements, managing business operations and making informed financial decisions.",
    "Our approach is built on professionalism, integrity, reliability and a commitment to helping our clients achieve sustainable growth.",
  ],
  clientsHeading: "Who we work with",
  clients: [
    "Individuals and salaried professionals",
    "Entrepreneurs and startups",
    "Small and medium-sized enterprises (SMEs)",
    "Established companies and institutions",
    "Landlords and property investors",
    "Businesses seeking accounting, payroll and tax compliance support",
  ],
  image: {
    src: "/pexels-tima-miroshnichenko-6694475.webp",
    alt: "A consultant reviewing financial documents at a desk",
    position: "50% 40%",
  },
  badge: "Guiding Success, Illuminating Paths.",
  cta: { label: "See what we do", href: "/services" },
} as const;
