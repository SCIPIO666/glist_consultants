import { services } from "@/data/services";

/**
 * Home stats (the rolling "credits" screen). Only figures that can be checked
 * against the client brief are used, so nothing on the site is invented.
 * When the client supplies real figures (clients served, filings per year,
 * KSh processed...) add them to this list and they join the roll automatically.
 *
 * Counts that come from other data files are computed, so they stay true when
 * the services change.
 */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

const taskCount = services.reduce((sum, s) => sum + s.items.length, 0);
const landlordTasks = services.find((s) => s.slug === "property-management")?.items.length ?? 0;

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
      note: "From VAT filing to rent arrears follow-up.",
    },
    {
      value: 6,
      label: "Kinds of client we serve",
      note: "Salaried professionals, startups, SMEs, established companies, landlords and more.",
    },
    {
      value: 12,
      label: "Payroll cycles a year",
      note: "Every month's PAYE and statutory deductions handled.",
    },
    {
      value: landlordTasks,
      label: "Services for landlords",
      note: "From tenant sourcing to rental income reporting.",
    },
    {
      value: 6,
      label: "Commitments we keep",
      note: "Professionalism, reliability, practical solutions, client focus, convenience and growth.",
    },
    {
      value: 1,
      label: "Team, one roof",
      note: "Business, financial and property services handled together.",
    },
  ],
};
