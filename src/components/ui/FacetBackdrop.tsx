import { cn } from "@/lib/cn";

/**
 * Soft overlapping translucent triangles, like light falling on folded paper.
 * Pure decoration. Put it as the first child of a `relative overflow-hidden`
 * section; colour comes from the text colour class (white tints on dark/brand).
 *
 *   <FacetBackdrop className="text-white" />
 */
export function FacetBackdrop({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      <g fill="currentColor">
        <polygon points="0,0 380,0 0,420" opacity="0.06" />
        <polygon points="170,760 560,0 760,0 360,760" opacity="0.04" />
        <polygon points="420,0 900,0 640,420" opacity="0.07" />
        <polygon points="760,760 1200,120 1200,760" opacity="0.06" />
        <polygon points="940,0 1200,0 1200,300" opacity="0.05" />
        <polygon points="0,760 300,430 560,760" opacity="0.06" />
        <polygon points="560,760 820,330 1000,760" opacity="0.04" />
      </g>
    </svg>
  );
}
