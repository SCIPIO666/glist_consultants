/**
 * Global site facts. Edit here (or later, pull from Sanity "siteSettings").
 */
const phoneLocal = "0717810716";
const phoneIntl = "254717810716"; // wa.me needs the country code, no "+" or leading 0

export const site = {
  name: "Glist Consultants",
  shortName: "Glist",
  tagline: "Guiding Success, Illuminating Paths.",
  descriptor: "Accountancy | Taxation | Advisory",
  description:
    "Glist Consultants is a business, financial and property consultancy in Kenya: tax compliance, payroll, business registration, bookkeeping, stock taking, personal financial advisory and rental property management.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_KE",
  phone: { display: phoneLocal, tel: `+${phoneIntl}`, whatsapp: phoneIntl },
  email: "glist.consultants@gmail.com",
  /** Fill these in when the client supplies them; empty ones are skipped. */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    tiktok: "",
  },
} as const;

/** Build a WhatsApp deep link with a prefilled message. */
export function whatsappUrl(message = "Hello Glist Consultants, I would like to make an enquiry.") {
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Property Management", href: "/property-management" },
  { label: "Insights", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
] as const;
