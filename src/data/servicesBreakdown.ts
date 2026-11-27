/**
 * Services page donut: a short ring label and a one-sentence breakdown for every task
 * in data/services.ts, in the SAME ORDER as that task list (index i here = items[i]).
 *
 * The task names come from the client brief. The `detail` sentences are DRAFT COPY
 * written to explain each task in plain language: have the client confirm them.
 * If a service has no entry (or fewer entries), the donut falls back to the task text.
 */

import type { Shape } from "@/components/services/donutGeometry";
export type TaskBreakdown = { label: string; detail: string };

export const servicesBreakdown: Record<string, TaskBreakdown[]> = {
  taxation: [
    { label: "VAT", detail: "We register you for VAT, prepare and file your returns on time, and keep your records ready for any KRA review." },
    { label: "Withholding Tax", detail: "We compute the tax to withhold on supplier and service payments, file the returns and keep your certificates in order." },
    { label: "Turnover Tax", detail: "We register eligible small businesses for TOT, work out what is due on your turnover and file each return." },
    { label: "Rental Income Tax", detail: "We register landlords, compute rental income tax and file the returns so property income stays compliant." },
    { label: "Excise Duty", detail: "We advise whether excise duty applies to your goods or services and support correct computation and compliance." },
    { label: "Tax Returns", detail: "We prepare and file annual returns for individuals and businesses, claiming the reliefs and deductions you qualify for." },
    { label: "KRA Support", detail: "Ongoing help with your KRA account, including queries, notices, reconciliations and advice on staying compliant." },
  ],
  payroll: [
    { label: "Monthly Payroll", detail: "We compute every employee's pay each month from your attendance and pay data, ready for payday." },
    { label: "PAYE", detail: "We calculate PAYE correctly for each employee and file the monthly return before the deadline." },
    { label: "Payslips", detail: "Clear, accurate payslips for every employee, showing earnings and each deduction." },
    { label: "Statutory Deductions", detail: "We compute and remit statutory deductions to the right bodies and keep proof of every payment." },
    { label: "Reconciliations", detail: "We reconcile payroll to your books and prepare summary reports so you see the full cost of your staff." },
    { label: "Payroll Records", detail: "We keep organised payroll records and employee files, ready for audits or inspections." },
  ],
  registrations: [
    { label: "KRA PIN", detail: "We register individuals and businesses for a KRA PIN so you can transact and file your taxes." },
    { label: "Company", detail: "We guide and handle company incorporation, from the name search through to the registration documents." },
    { label: "Business Name", detail: "We register your business name for sole proprietors and partnerships and prepare the paperwork." },
    { label: "eGP Supplier", detail: "We set up your supplier account on the e-Government Procurement platform so you can access tenders." },
    { label: "IFMIS Supplier", detail: "We register you as a supplier on IFMIS so you can be paid for government work." },
    { label: "Guidance", detail: "Not sure which registrations you need? We explain the options and the order to do them in." },
  ],
  bookkeeping: [
    { label: "Daily Books", detail: "We record your daily sales, purchases and expenses so your books are always up to date." },
    { label: "Financial Records", detail: "We prepare and maintain complete, orderly records that support your returns and your decisions." },
    { label: "Bank Reconciliations", detail: "We match your books to bank and mobile money statements and chase down any differences." },
    { label: "Payables and Receivables", detail: "We track what you owe and what you are owed, so you always know your cash position." },
    { label: "Financial Reports", detail: "Clear financial statements and management reports that you can read and act on." },
    { label: "Records Review", detail: "We review your existing records, correct errors and support you where the books need attention." },
  ],
  "stock-taking": [
    { label: "Physical Count", detail: "We count your stock on site, item by item, and record the results." },
    { label: "Verification", detail: "We verify quantities and condition against your inventory records." },
    { label: "Reconciliation", detail: "We reconcile counted stock with your books and explain any differences." },
    { label: "Inventory Records", detail: "We organise and maintain inventory records so they reflect what is really on the shelf." },
    { label: "Movement Reports", detail: "Reports on stock coming in, going out and moving slowly, to guide your buying." },
    { label: "Variances", detail: "We identify and report stock variances and flag where losses or errors may be happening." },
  ],
  "financial-advisory": [
    { label: "Financial Planning", detail: "We turn your income, goals and obligations into a practical plan you can follow." },
    { label: "Budgeting", detail: "We build a realistic budget and help you keep your spending on track." },
    { label: "Savings and Investment", detail: "Guidance on building savings and understanding investment options that suit your goals." },
    { label: "Debt Management", detail: "Strategies to prioritise and pay down debt without losing control of your monthly cash flow." },
    { label: "Financial Literacy", detail: "Coaching in plain language, so you understand your money decisions and do not just follow instructions." },
    { label: "Wealth Guidance", detail: "Guidance on growing and protecting what you have built over the long term." },
  ],
  "property-management": [
    { label: "Tenant Sourcing", detail: "We advertise, screen and place suitable tenants in your property." },
    { label: "Rent Collection", detail: "We collect rent on time, track every payment and keep the landlord informed." },
    { label: "Tenancy Admin", detail: "Leases, deposits, notices and tenant files, handled and kept in order." },
    { label: "Inspections", detail: "Regular property inspections, with the findings reported back to you." },
    { label: "Maintenance", detail: "We coordinate repairs and maintenance with contractors and follow each job through." },
    { label: "Arrears Follow-up", detail: "We monitor late rent and follow up with tenants promptly and professionally." },
    { label: "Relations", detail: "A go-between who keeps landlord and tenant relations smooth." },
    { label: "Rental Reporting", detail: "Clear rental income records and reports for tax and planning." },
  ],
};

/**
 * Donut shape per service, to break the rhythm down the page. Options:
 * "top" | "bottom" | "left" | "right" (half donuts, named for where the ring sits),
 * "three-quarter-br" | "three-quarter-bl" (open corner) and "full".
 * Use the fuller shapes for services with more entries.
 */
export const donutShapes: Record<string, Shape> = {
  taxation: "three-quarter-br",
  payroll: "top",
  registrations: "left",
  bookkeeping: "bottom",
  "stock-taking": "right",
  "financial-advisory": "three-quarter-bl",
  "property-management": "full",
};

export const donutCopy = {
  hintMouse: "Hover a segment",
  hintTouch: "Tap a segment",
  position: (i: number, n: number) => `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`,
  enquire: "Enquire about this service",
};
