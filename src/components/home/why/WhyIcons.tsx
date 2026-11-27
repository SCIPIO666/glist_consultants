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

/** Advice you can act on: a lightbulb. */
export const IconAdvice = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.2 1.1 2.2h5c0-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);

/** Deadlines kept: a calendar with a tick. */
export const IconCalendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="m9 15.2 2.2 2.2 4.3-4.4" />
  </svg>
);

/** One roof, seven services: a house. */
export const IconRoof = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 11.2 12 3.5l9 7.7" />
    <path d="M5.5 10v10h13V10" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);

/** Built around you: a target with you at the centre. */
export const IconTarget = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" />
  </svg>
);

export const whyIcons = [IconAdvice, IconCalendar, IconRoof, IconTarget];
