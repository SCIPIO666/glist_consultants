import { services } from "@/data/services";

/**
 * Home stats. Only figures that can be checked are used here, so nothing on the
 * site is invented. When the client supplies real figures (clients served,
 * filings per year, KSh processed...) add them to this list and they appear
 * automatically in the scrolling credits.
 */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

/** Every bullet across the seven service categories, straight from the brief. */
const taskCount = services.reduce((sum, s) => sum + s.items.length, 0);

export const statsSection: { srLabel: string; stats: Stat[] } = {
  srLabel: "Glist Consultants in numbers",
  stats: [
    {
      value: services.length,
      label: "Service lines",
      note: "Tax, payroll, registrations, books, stock, personal finance and rentals.",
    },
    {
      value: taskCount,
      label: "Specific tasks covered",
      note: "From VAT filing to rent arrears follow-up, listed on our services page.",
    },
    {
      value: 12,
      label: "Payroll cycles a year",
      note: "Every month's PAYE and statutory deductions computed and filed on time.",
    },
    {
      value: 2400,
      prefix: "KSh ",
      label: "Monthly personal relief",
      note: "The PAYE relief we apply when computing your payroll. Check current KRA rules.",
    },
  ],
};
