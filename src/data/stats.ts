import { services } from "@/data/services";

/**
 * Home stats (the rolling "credits" screen).
 * Tailored to reflect the depth, compliance focus, and breadth of Glist Consultants'
 * offerings.
 */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

const taskCount = services.reduce((sum, s) => sum + s.items.length, 0);
const taxTasks = services.find((s) => s.slug === "taxation")?.items.length ?? 0;
const payrollTasks = services.find((s) => s.slug === "payroll")?.items.length ?? 0;

export const statsSection: { srLabel: string; stats: Stat[] } = {
  srLabel: "Glist Consultants in numbers",
  stats: [
    {
      value: 7,
      label: "Service lines",
      note: "Tax, payroll, registrations, books, stock, personal finance, and property—all in one place.",
    },
    {
      value: taskCount,
      label: "Specific tasks handled",
      note: "From your daily bookkeeping to filing your annual returns.",
    },
    {
      value: taxTasks + payrollTasks,
      label: "Statutory touchpoints",
      note: "We keep you compliant with KRA, NSSF, NHIF, NITA, AHL, and eTIMS.",
    },
    {
      value: 100,
      suffix: "%",
      label: "Focus on compliance",
      note: "We stay up to date with the Income Tax Act and VAT Act so you don't have to.",
    },
    {
      value: 12,
      label: "Monthly cycles managed",
      note: "Year-round payroll processing, tax filing, and reporting that keeps you audit-ready.",
    },
    {
      value: 360,
      suffix: "°",
      label: "Landlord support",
      note: "Everything from finding tenants to collecting rent and coordinating repairs.",
    },
    {
      value: 1,
      label: "Dedicated partner",
      note: "One team that knows your business, from startup to established enterprise.",
    },
  ],
};