import type { SVGProps } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

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

const Facebook = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 21v-7.5h2.6l.5-3H14V8.7c0-1 .4-1.6 1.7-1.6h1.5V4.4C16.8 4.3 15.9 4.2 15 4.2c-2.4 0-4 1.4-4 4.1v2.2H8.5v3H11V21" />
  </svg>
);
const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);
const LinkedIn = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 10v8M6.5 6.4v.2M10.8 18v-8m0 3.4c0-2 1.3-3.6 3.2-3.6s3.1 1.3 3.1 3.7V18" />
  </svg>
);
const XLogo = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 4h4l11 16h-4L4.5 4Z" />
    <path d="m4.8 20 6.4-7.3M12.9 11.3 19.2 4" />
  </svg>
);
const TikTok = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 3.5v11.2a3.6 3.6 0 1 1-3.6-3.6" />
    <path d="M14 3.5c.3 2.4 1.9 4 4.6 4.2" />
  </svg>
);

const PLATFORMS = {
  facebook: { label: "Facebook", Icon: Facebook },
  instagram: { label: "Instagram", Icon: Instagram },
  linkedin: { label: "LinkedIn", Icon: LinkedIn },
  x: { label: "X", Icon: XLogo },
  tiktok: { label: "TikTok", Icon: TikTok },
} as const;

type Key = keyof typeof PLATFORMS;

/**
 * Round icon links for every social account that has a URL in lib/site.ts (site.social).
 * An empty URL hides that icon, so add the link there and it appears everywhere.
 */
export function SocialLinks({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const items = (Object.keys(PLATFORMS) as Key[]).filter((k) => site.social[k]);
  if (!items.length) return null;
  return (
    <ul role="list" className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((k) => {
        const { label, Icon } = PLATFORMS[k];
        return (
          <li key={k}>
            <a
              href={site.social[k]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              title={label}
              className={cn(
                "grid place-items-center rounded-full border border-white/25 text-white/85 transition-[background-color,border-color,color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-night-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft",
                size === "lg" ? "size-12 text-[1.35rem]" : "size-10 text-[1.15rem]",
              )}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
