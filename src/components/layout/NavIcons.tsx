import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const Home = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 11.2 12 3.5l9 7.7" />
    <path d="M5.5 10v10h13V10" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);
const About = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20v-1.2A5.3 5.3 0 0 1 7.8 13.5h2.4a5.3 5.3 0 0 1 5.3 5.3V20" />
    <path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18.5 13.7a5.3 5.3 0 0 1 3 5.1V20" />
  </svg>
);
const Services = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </svg>
);
const Property = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21" />
    <path d="M15 10h3.5A1.5 1.5 0 0 1 20 11.5V21M2.5 21h19" />
    <path d="M8 8h3M8 12h3M8 16h3" />
  </svg>
);
const Insights = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.2 1.1 2.2h5c0-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);
const Contact = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20.5 15.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.7 2 2 0 0 1 5.5 3.5h3l1.7 4.2-2.1 1.3a11 11 0 0 0 5.4 5.4l1.3-2.1 4.2 1.7Z" />
  </svg>
);

const byHref: Record<string, (p: P) => React.JSX.Element> = {
  "/": Home,
  "/about": About,
  "/services": Services,
  "/property-management": Property,
  "/insights": Insights,
  "/contact": Contact,
};

/** The icon for a nav link, by its href. Falls back to the home icon. */
export function NavIcon({ href, ...p }: { href: string } & P) {
  const Icon = byHref[href] ?? Home;
  return <Icon {...p} />;
}
