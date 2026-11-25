import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const icon = (children: ReactNode) =>
  function Icon(p: P) {
    return (
      <svg {...base} {...p}>
        {children}
      </svg>
    );
  };

/** One neat line icon per service, keyed by service slug. They use currentColor. */
export const serviceIcons: Record<string, (p: P) => ReactNode> = {
  taxation: icon(
    <>
      <path d="M19 5 5 19" />
      <circle cx="7.2" cy="7.2" r="2.3" />
      <circle cx="16.8" cy="16.8" r="2.3" />
    </>,
  ),
  payroll: icon(
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6.5 9.5v.01M17.5 14.5v.01" />
    </>,
  ),
  registrations: icon(
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="m9 14.5 2 2 4-4" />
    </>,
  ),
  bookkeeping: icon(
    <>
      <path d="M12 6.5C10.5 5.2 8.5 4.5 6 4.5v13c2.5 0 4.5.7 6 2 1.5-1.3 3.5-2 6-2v-13c-2.5 0-4.5.7-6 2Z" />
      <path d="M12 6.5v13" />
    </>,
  ),
  "stock-taking": icon(
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5Z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </>,
  ),
  "financial-advisory": icon(
    <>
      <path d="M3 17.5 8.5 12l4 4L20 8.5" />
      <path d="M15 8h5v5" />
    </>,
  ),
  "property-management": icon(
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v10h13V10" />
      <path d="M10 20v-5h4v5" />
    </>,
  ),
};
