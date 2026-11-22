/**
 * Contact page copy + form options. Contact details live in lib/site.ts.
 * Wording is deliberately short: the page is the form and nothing else.
 */
export const contactMeta = {
  title: "Contact Us",
  description:
    "Send Glist Consultants an enquiry about tax compliance, payroll, business registration, bookkeeping, stock taking, personal financial advisory or rental property management.",
} as const;

export const contactForm = {
  eyebrow: "Contact us",
  titleBefore: "Let us handle the",
  titleMark: "numbers.",
  fields: {
    name: { label: "Full name", placeholder: "Your name" },
    email: { label: "Email address", placeholder: "you@example.com" },
    phone: { label: "Phone / WhatsApp", placeholder: "07XX XXX XXX" },
    service: { label: "Service of interest", placeholder: "Select a service" },
    message: { label: "How can we help?", placeholder: "Tell us a little about what you need." },
  },
  submit: "Send enquiry",
  sending: "Sending…",
  whatsapp: "Chat on WhatsApp",
  success: {
    title: "Thank you, we have your enquiry.",
    text: "A member of our team will reply shortly. For something urgent, message us on WhatsApp.",
    again: "Send another enquiry",
  },
  error: "We could not send your message just now. Please try again, or reach us on WhatsApp.",
  /** Shown once in the privacy line under the button. */
  note: "We only use your details to respond to this enquiry.",
} as const;

export const contactPortrait = {
  src: "/pages/contact/contact-person.webp",
  alt: "A Glist Consultants advisor in a navy suit with arms folded",
  width: 776,
  height: 1496,
} as const;
