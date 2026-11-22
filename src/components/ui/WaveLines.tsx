import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Fine, parallel, gently bowed vertical lines: the "lines graph" background
 * pattern. Pure decoration. Colour comes from the text colour of the className:
 *
 *   <WaveLines className="absolute inset-0 text-brand-soft/30" />
 */
export function WaveLines({ className }: { className?: string }) {
  const id = "wave-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg aria-hidden className={cn("pointer-events-none size-full", className)}>
      <defs>
        <pattern id={id} width="13" height="150" patternUnits="userSpaceOnUse">
          <path
            d="M6.5 0 C 12 25 1 50 6.5 75 C 12 100 1 125 6.5 150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
