/**
 * The seven service categories, copied from the client brief.
 * Static for now; Sanity will replace this later with the same shape.
 */
export type Service = {
  slug: string;
  letter: string;
  title: string;
  short: string; // one line for cards
  intro: string; // paragraph for the services page
  items: string[];
  image: string; // /public path
};

export const services: Service[] = [
  {
    slug: "taxation",
    letter: "A",
    title: "Taxation and Tax Compliance",
    short: "Registration, filing, and KRA compliance for individuals and businesses.",
    intro:
      "We take the stress out of tax. From VAT and PAYE to your annual returns, we make sure you're compliant with KRA and avoid penalties.",
    items: [
      "Value Added Tax (VAT) registration, filing and compliance.",
      "Withholding Tax computations, filing and compliance.",
      "Turnover Tax (TOT) registration and filing.",
      "Rental Income Tax registration, filing and compliance.",
      "Excise Duty advisory and compliance.",
      "Individual and business tax returns.",
      "KRA tax compliance support and advisory.",
    ],
    image: "/pages/home/services-intro/taxes.webp",
  },
  {
    slug: "payroll",
    letter: "B",
    title: "Payroll Management Services",
    short: "Accurate monthly payroll, PAYE and statutory remittances.",
    intro:
      "Payroll management is like a back-office bodyguard. You send us your staff details; we calculate everything correctly and on time, prepare the payslips and file the statutory deductions.",
    items: [
      "Monthly payroll processing.",
      "PAYE computations and filing.",
      "Preparation of employee payslips.",
      "Statutory deductions and remittances.",
      "Payroll reconciliations and reporting.",
      "Payroll records management.",
    ],
    image: "/pages/home/services-intro/payroll.webp",
  },
  {
    slug: "registrations",
    letter: "C",
    title: "Business and Statutory Registrations",
    short: "KRA PIN, company registration, eGP and IFMIS setup.",
    intro:
      "Starting something new? We help you cross the starting line. We handle your company registration, KRA PIN, and all the necessary government platform registrations.",
    items: [
      "KRA PIN registration.",
      "Company registration.",
      "Business name registration.",
      "e-Government Procurement (eGP) supplier registration.",
      "IFMIS supplier registration.",
      "Business registration guidance and support.",
    ],
    image: "/pages/home/services-intro/business.webp",
  },
  {
    slug: "bookkeeping",
    letter: "D",
    title: "Bookkeeping and Accounting",
    short: "Clean records, reconciliations, and reports you can trust.",
    intro:
      "Is your business making money? Don't guess, know your numbers. We keep your records accurate, reconcile your bank accounts and give you financial reports you can read.",
    items: [
      "Day-to-day bookkeeping.",
      "Preparation and maintenance of financial records.",
      "Bank reconciliations.",
      "Accounts payable and receivable records.",
      "Financial statements and management reports.",
      "Accounting records review and support.",
    ],
    image: "/pages/home/services-intro/books.webp",
  },
  {
    slug: "stock-taking",
    letter: "E",
    title: "Stock Taking and Inventory Management",
    short: "Verified stock records and clear reporting on variances.",
    intro:
      "We do the physical counting so you know exactly what's on your shelves. We'll help you spot discrepancies, track stock movement, and keep accurate inventory records.",
    items: [
      "Physical stocktaking.",
      "Inventory verification.",
      "Stock reconciliation.",
      "Inventory records management.",
      "Stock movement reporting.",
      "Identification and reporting of stock variances.",
    ],
    image: "/pages/home/services-intro/inventory.webp",
  },
  {
    slug: "financial-advisory",
    letter: "F",
    title: "Personal Financial Advisory",
    short: "Practical, personalised guidance for everyday money decisions.",
    intro:
      "We help you get a handle on your personal finances. Whether you're trying to stick to a budget, get out of debt, or plan for the future, we'll give you practical steps to follow.",
    items: [
      "Personal financial planning.",
      "Budgeting and expenditure management.",
      "Savings and investment guidance.",
      "Debt management strategies.",
      "Financial literacy and education.",
      "Personal wealth management guidance.",
    ],
    image: "/pages/home/services-intro/advisor.webp",
  },
  {
    slug: "property-management",
    letter: "G",
    title: "Rental Property Management",
    short: "Tenants, rent collection, and upkeep handled for you.",
    intro:
      "Reliable rental property management designed to improve occupancy, streamline rent collection and protect your property's value.",
    items: [
      "Tenant sourcing and placement.",
      "Rent collection and monitoring.",
      "Tenancy administration.",
      "Property inspections.",
      "Maintenance and repairs coordination.",
      "Rent arrears monitoring and follow-up.",
      "Landlord and tenant relations.",
      "Rental income records and reporting.",
    ],
    image: "/pages/home/services-intro/property-management.webp",
  },
];