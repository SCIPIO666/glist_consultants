/**
 * About page copy. Wording follows the client brief (sections 1 and 4).
 * Edit here; layout lives in components/about.
 */
export const aboutHero = {
  breadcrumb: "About Us",
  eyebrow: "About Glist Consultants",
  titleLines: ["Guiding success,", "illuminating paths."],
  lead: "A business, financial and property consultancy in Kenya. We give individuals, entrepreneurs, startups, SMEs and established businesses practical, dependable help.",
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
    "Glist Consultants is a business, financial and property consultancy in Kenya. We offer tax, payroll, registration, bookkeeping, stock taking, personal financial advisory and rental property management.",
} as const;

export const aboutBackground = {
  eyebrow: "Who we are",
  titleBefore: "Your growth. Our commitment.",
  titleMark: "Shared success.",
  paragraphs: [
    "We help our clients keep up with their financial obligations, meet statutory requirements, run their operations and make sound financial decisions.",
    "We work with professionalism and integrity, and we want our clients to grow steadily.",
  ],
  clientsHeading: "Who we work with",
  clients: [
    "Individuals and salaried professionals",
    "Entrepreneurs and startups",
    "Small and medium-sized enterprises (SMEs)",
    "Established companies and institutions",
    "Landlords and property investors",
    "Businesses that need accounting, payroll and tax compliance help",
  ],
  image: {
    src: "/pexels-tima-miroshnichenko-6694475.webp",
    alt: "A consultant reviewing financial documents at a desk",
    position: "50% 40%",
  },
  badge: "Guiding Success, Illuminating Paths.",
  cta: { label: "Explore our services", href: "/services" },
} as const;