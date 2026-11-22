import { services } from "@/data/services";

/**
 * Home stats (the rolling "credits" screen).
 * Tailored to reflect the depth, compliance focus, and breadth of Glist Consultants' 
 * offerings, drawing inspiration from professional tax/legal advisory language.
 */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

const taskCount = services.reduce((sum, s) => sum + s.items.length, 0);
const taxTasks = services.find((s) => s.slug === "taxation-and-tax-compliance")?.items.length ?? 0;
const payrollTasks = services.find((s) => s.slug === "payroll-management-services")?.items.length ?? 0;

export const statsSection: { srLabel: string; stats: Stat[] } = {
  srLabel: "Glist Consultants in numbers",
  stats: [
    {
      value: 7,
      label: "Integrated Service Lines",
      note: "Tax, payroll, registrations, accounting, stocktaking, personal finance, and property management — under one roof.",
    },
    {
      value: taskCount,
      label: "Actionable Deliverables",
      note: "From daily bookkeeping entries to comprehensive unqualified financial statements.",
    },
    {
      value: taxTasks + payrollTasks,
      label: "Statutory Touchpoints",
      note: "Covering KRA, PAYE, VAT, WHT, NSSF, NHIF, NITA, AHL, and eTIMS compliance.",
    },
    {
      value: 100,
      suffix: "%",
      label: "Statutory Compliance Focus",
      note: "Aligning your business with the Income Tax Act, VAT Act, and relevant regulatory frameworks.",
    },
    {
      value: 12,
      label: "Monthly Cycles Managed",
      note: "Year-round payroll processing, tax filings, and management reporting to keep you audit-ready.",
    },
    {
      value: 360,
      suffix: "°",
      label: "Landlord & Property Support",
      note: "Comprehensive management from tenant sourcing and rent collection to maintenance coordination.",
    },
    {
      value: 1,
      label: "Dedicated Partner",
      note: "A client-focused approach dedicated to your long-term growth, from startup to established enterprise.",
    },
  ],
};