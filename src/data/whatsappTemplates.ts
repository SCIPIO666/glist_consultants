import { whatsappUrl } from "@/lib/site";

/**
 * Prefilled WhatsApp messages, one per service (keyed by the slug in data/services.ts).
 * Edit the wording here; every WhatsApp button for a service uses it.
 */
export const whatsappTemplates: Record<string, string> = {
  taxation:
    "Hello Glist Consultants, I would like help with taxation and tax compliance (KRA returns, tax registration or tax advice). Please let me know how we can get started.",
  payroll:
    "Hello Glist Consultants, I would like to enquire about your payroll management services (payroll processing, payslips and statutory deductions). Please share how it works and the cost.",
  registrations:
    "Hello Glist Consultants, I would like help with business and statutory registrations (business name or company registration, KRA PIN and licences). Please tell me what you need from me.",
  bookkeeping:
    "Hello Glist Consultants, I am interested in your bookkeeping and accounting services. Please tell me how you work and what you charge.",
  "stock-taking":
    "Hello Glist Consultants, I would like to enquire about stock taking and inventory management for my business. Please share how it works and the cost.",
  "financial-advisory":
    "Hello Glist Consultants, I would like to book a personal financial advisory session (budgeting, savings or investments). Please tell me the next step.",
  "property-management":
    "Hello Glist Consultants, I would like to enquire about rental property management (tenants, rent collection and maintenance). Please let me know how we can get started.",
};

/** WhatsApp link for a service. `topic` adds the specific item the visitor was looking at. */
export function serviceWhatsappUrl(slug: string, topic?: string) {
  const base = whatsappTemplates[slug];
  if (!base) return whatsappUrl();
  return whatsappUrl(topic ? `${base} I am especially interested in: ${topic}.` : base);
}

/**
 * Message pre-filled in the contact form when a visitor arrives from a service
 * (/contact?service=<slug>). They can edit it before sending.
 */
export const emailTemplates: Record<string, string> = {
  taxation:
    "Hello Glist Consultants,\n\nI would like help with taxation and tax compliance (KRA returns, tax registration or tax advice).\n\nAbout my situation: \n\nPlease contact me so we can discuss the next steps.\n\nThank you.",
  payroll:
    "Hello Glist Consultants,\n\nI would like to enquire about your payroll management services (payroll processing, payslips and statutory deductions).\n\nNumber of employees: \n\nPlease share how it works and the cost.\n\nThank you.",
  registrations:
    "Hello Glist Consultants,\n\nI would like help with business and statutory registrations (business name or company registration, KRA PIN and licences).\n\nWhat I want to register: \n\nPlease tell me what you need from me.\n\nThank you.",
  bookkeeping:
    "Hello Glist Consultants,\n\nI am interested in your bookkeeping and accounting services.\n\nType of business: \n\nPlease tell me how you work and what you charge.\n\nThank you.",
  "stock-taking":
    "Hello Glist Consultants,\n\nI would like to enquire about stock taking and inventory management for my business.\n\nType of business and location: \n\nPlease share how it works and the cost.\n\nThank you.",
  "financial-advisory":
    "Hello Glist Consultants,\n\nI would like to book a personal financial advisory session (budgeting, savings or investments).\n\nWhat I would like help with: \n\nPlease tell me the next step.\n\nThank you.",
  "property-management":
    "Hello Glist Consultants,\n\nI would like to enquire about rental property management (tenants, rent collection and maintenance).\n\nNumber of units and location: \n\nPlease let me know how we can get started.\n\nThank you.",
};
