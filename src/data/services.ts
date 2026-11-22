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
    short: "Strategic tax advisory and meticulous KRA statutory compliance.",
    intro:
      "We provide comprehensive tax advisory and compliance support, aligning your operations with the Income Tax Act and VAT Act to mitigate regulatory exposure.",
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
    short: "End-to-end payroll administration and statutory remittance.",
    intro:
      "We deliver rigorous payroll administration, ensuring accurate employee compensation and seamless compliance with all statutory deduction frameworks.",
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
    short: "Corporate structuring and critical government platform access.",
    intro:
      "We facilitate the essential legal and regulatory registrations required to establish and operationalize your business in Kenya.",
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
    short: "Audit-ready financial records and IFRS-aligned reporting.",
    intro:
      "We maintain meticulous financial records, providing the cross-functional visibility and management reports necessary for strategic decision-making.",
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
    short: "Accurate inventory verification and variance accountability.",
    intro:
      "We conduct thorough inventory audits and implement robust stock management systems to identify discrepancies and safeguard your assets.",
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
    short: "Strategic wealth management and financial literacy.",
    intro:
      "We provide tailored financial planning and advisory services, empowering individuals to optimize wealth and navigate complex financial decisions.",
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
    short: "Comprehensive asset management for landlords and investors.",
    intro:
      "We provide full-cycle property management solutions designed to optimize occupancy, ensure reliable rent collection, and protect asset value.",
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