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
