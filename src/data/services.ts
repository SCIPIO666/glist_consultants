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
    short: "Registration, filing and KRA compliance for individuals and businesses.",
    intro:
      "We provide tax advisory, registration, filing and compliance support to individuals and businesses, helping them meet their statutory tax obligations.",
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
      "We provide efficient and reliable payroll administration solutions to businesses, ensuring accurate employee payments and compliance with statutory requirements.",
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
    short: "KRA PIN, company and business name, eGP and IFMIS registrations.",
    intro:
      "We help individuals and businesses complete essential registrations and access relevant government platforms.",
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
    short: "Clean records, reconciliations and reports you can trust.",
    intro:
      "We help businesses maintain accurate financial records and gain better visibility into their financial performance.",
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
      "We assist businesses in maintaining accurate inventory records, improving stock accountability and identifying discrepancies.",
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
      "We empower individuals to make informed financial decisions through practical and personalised financial guidance.",
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
    short: "Tenants, rent collection and upkeep handled for landlords.",
    intro:
      "We provide property owners and landlords with reliable rental property management solutions designed to improve occupancy, streamline rent collection and protect property value.",
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
