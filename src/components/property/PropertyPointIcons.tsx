import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Legal compliance: scales of justice. */
export const IconLegal = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M7 21h10M5 7h14" />
    <path d="M5 7 2.5 13.5a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6.5a3 3 0 0 0 5 0L19 7Z" />
  </svg>
);

/** Maintenance and repairs: a wrench. */
export const IconWrench = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  </svg>
);

/** Rental income: a banknote. */
export const IconIncome = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

/** Tenant screening: a person with a tick. */
export const IconTenant = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m16 11 2 2 4-4" />
  </svg>
);

export const pointIcons = [IconLegal, IconWrench, IconIncome, IconTenant];
