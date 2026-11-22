import { cn } from "@/lib/cn";

const gold = "var(--color-gold)";
const dark = "var(--color-night-deep)";

/**
 * Hand-built line icons for the seven services (48 x 48 grid).
 * Lines use currentColor so they can turn white on hover; the small solid
 * shapes are the gold accent.
 */
const icons: Record<string, React.ReactNode> = {
  taxation: (
    <>
      <path d="M13 6h16l8 8v28H13z" />
      <path d="M29 6v8h8" />
      <path d="m31 24-12 12" />
      <circle cx="20" cy="25" r="2.6" fill={gold} />
      <circle cx="30" cy="35" r="2.6" fill={gold} />
    </>
  ),
  payroll: (
    <>
      <rect x="5" y="13" width="38" height="23" rx="3" />
      <circle cx="24" cy="24.5" r="5.5" fill={gold} stroke={dark} />
      <path d="M11 20v9M37 20v9" />
    </>
  ),
  registrations: (
    <>
      <rect x="10" y="6" width="28" height="36" rx="3" />
      <path d="M17 15h14M17 21h14" />
      <circle cx="30" cy="34" r="7" fill={gold} stroke={dark} />
      <path d="m26.8 34 2.2 2.3 4.2-4.6" stroke={dark} />
    </>
  ),
  bookkeeping: (
    <>
      <path d="M24 12c-4.5-3-10.5-4-17-3v28c6.5-1 12.5 0 17 3 4.5-3 10.5-4 17-3V9c-6.5-1-12.5 0-17 3z" />
      <path d="M24 12v28" />
      <path d="M13 18h6M13 24h6M29 18h6M29 24h6" />
      <path d="M31 9v9l3-2 3 2V9" fill={gold} stroke="none" />
    </>
  ),
  "stock-taking": (
    <>
      <path d="M24 5 41 14v20L24 43 7 34V14z" />
      <path d="M24 5 41 14 24 23 7 14z" fill={gold} stroke={dark} />
      <path d="M24 23v20" />
    </>
  ),
  "financial-advisory": (
    <>
      <path d="M5 42h38" />
      <rect x="9" y="29" width="7" height="13" rx="1.5" fill={gold} stroke="none" />
      <rect x="20.5" y="21" width="7" height="21" rx="1.5" fill={gold} stroke="none" />
      <rect x="32" y="26" width="7" height="16" rx="1.5" fill={gold} stroke="none" />
      <path d="m8 18 9-7 8 6 14-11" />
      <path d="M32 6h7v7" />
    </>
  ),
  "property-management": (
    <>
      <path d="m5 22 19-16 19 16" />
      <path d="M10 19v23h28V19" />
      <rect x="20" y="28" width="8" height="14" rx="1.5" fill={gold} stroke={dark} />
    </>
  ),
};

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("overflow-visible", className)}
    >
      {icons[slug] ?? icons.taxation}
    </svg>
  );
}
