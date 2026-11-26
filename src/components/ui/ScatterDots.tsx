import { cn } from "@/lib/cn";

type Dot = { x: number; y: number; r: number; c: number };

/**
 * Deterministic pseudo-random dots (same on server and client, so no hydration
 * mismatch). Density rises toward the bottom-right corner of the box.
 */
function makeDots(count: number): Dot[] {
  let seed = 20260719;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const dots: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const u = rand() ** 0.55; // bias toward 1 (the corner)
    const v = rand() ** 0.55;
    dots.push({
      x: Math.round(u * 3880) / 10 + 6,
      y: Math.round(v * 3880) / 10 + 6,
      r: Math.round((1.2 + rand() ** 2 * 5.4) * 10) / 10,
      c: Math.floor(rand() * 4),
    });
  }
  return dots;
}

const DOTS = makeDots(130);
const COLORS = ["text-gold", "text-brand", "text-ink", "text-brand-soft"];
const GOLD = ["text-gold", "text-gold", "text-gold", "text-gold"];

/**
 * Decorative scatter of dots for a section corner. Position it with className:
 *
 *   <ScatterDots className="absolute bottom-0 right-0 w-[min(46vw,32rem)]" />
 *
 * Fades out toward the top-left so it never competes with content.
 * `tone="gold"` makes every dot gold (default is the mixed brand palette).
 */
export function ScatterDots({ className, tone = "mixed" }: { className?: string; tone?: "mixed" | "gold" }) {
  const palette = tone === "gold" ? GOLD : COLORS;
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={cn(
        "pointer-events-none aspect-square select-none",
        "[mask-image:radial-gradient(circle_at_100%_100%,#000_8%,transparent_72%)]",
        className,
      )}
    >
      {DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={tone === "gold" ? Math.round(d.r * 0.62 * 10) / 10 : d.r} fill="currentColor" className={cn(palette[d.c], tone === "gold" ? "opacity-70" : "opacity-40")} />
      ))}
    </svg>
  );
}
