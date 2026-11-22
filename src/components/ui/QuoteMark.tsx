import { useId } from "react";
import { cn } from "@/lib/cn";

const MARK =
  "M4 0H24C26.5 0 28 1.5 28 4V19C28 31 20 38 6 40L3 32.5C12 30 15.5 26 15.5 22.5H4C1.5 22.5 0 21 0 18.5V4C0 1.5 1.5 0 4 0Z";

/**
 * Chunky gradient quotation marks (mint to blue), drawn as SVG so the shape never
 * depends on a font.
 *   kind="close"  the closing pair (shape of the right-hand quotes)
 *   kind="open"   the opening pair (the closing pair turned half a turn, so its
 *                 gradient runs blue at the top into mint at the bottom)
 * Size it with a height class, e.g. className="h-10". Decorative: aria-hidden.
 */
export function QuoteMark({ kind, className }: { kind: "open" | "close"; className?: string }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      viewBox="0 0 62 40"
      className={cn("w-auto select-none", className)}
      style={kind === "open" ? { transform: "rotate(180deg)" } : undefined}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7ff0d6" />
          <stop offset="1" stopColor="#3d6ff0" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <path d={MARK} />
        <path d={MARK} transform="translate(34 0)" />
      </g>
    </svg>
  );
}
