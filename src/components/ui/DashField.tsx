import { cn } from "@/lib/cn";

type Focus = "bottom-left" | "bottom-right" | "top-left" | "top-right";
type Variant = "ripple" | "lattice";

const W = 1200;
const H = 900;
const CELL = 40;
const LEN = 11;

const CENTER: Record<Focus, [number, number]> = {
  "bottom-left": [0, H],
  "bottom-right": [W, H],
  "top-left": [0, 0],
  "top-right": [W, 0],
};

const cache = new Map<string, string[]>();

/**
 * Fully regular dash field, no randomness (identical on server and client).
 * Dashes sit on a brick-offset grid, all the same length. Returns one path per colour.
 *
 *  ripple   each dash lies along a circle around the focus corner, so the field reads
 *           as concentric arcs (echoes the circle motif used across the site); colour
 *           changes in rings: gold, blue, navy.
 *  lattice  every dash leans the same way ("/") and colour runs in diagonal bands.
 */
function build(focus: Focus, variant: Variant) {
  const key = `${focus}:${variant}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const [fx, fy] = CENTER[focus];
  const paths = ["", "", ""];
  let row = 0;
  for (let y = CELL / 2; y < H; y += CELL, row++) {
    for (let x = CELL / 2 + (row % 2 ? CELL / 2 : 0); x < W; x += CELL) {
      let ux: number, uy: number, k: number;
      if (variant === "ripple") {
        const rx = x - fx;
        const ry = y - fy;
        const r = Math.hypot(rx, ry) || 1;
        ux = -ry / r; // tangent to the circle through this point
        uy = rx / r;
        k = Math.floor(r / (CELL * 3)) % 3;
      } else {
        const a = (-60 * Math.PI) / 180;
        ux = Math.cos(a);
        uy = Math.sin(a);
        k = Math.floor((x + y) / (CELL * 2.2)) % 3;
      }
      const dx = (ux * LEN) / 2;
      const dy = (uy * LEN) / 2;
      paths[k] += `M${(x - dx).toFixed(1)} ${(y - dy).toFixed(1)}l${(dx * 2).toFixed(1)} ${(dy * 2).toFixed(1)}`;
    }
  }
  cache.set(key, paths);
  return paths;
}

const MASKS: Record<Focus, string> = {
  "bottom-left": "[mask-image:radial-gradient(ellipse_at_0%_100%,#000_8%,rgb(0_0_0/0.5)_55%,rgb(0_0_0/0.16)_100%)]",
  "bottom-right": "[mask-image:radial-gradient(ellipse_at_100%_100%,#000_8%,rgb(0_0_0/0.5)_55%,rgb(0_0_0/0.16)_100%)]",
  "top-left": "[mask-image:radial-gradient(ellipse_at_0%_0%,#000_8%,rgb(0_0_0/0.5)_55%,rgb(0_0_0/0.16)_100%)]",
  "top-right": "[mask-image:radial-gradient(ellipse_at_100%_0%,#000_8%,rgb(0_0_0/0.5)_55%,rgb(0_0_0/0.16)_100%)]",
};

/**
 * Background texture of tiny dashes in site colours (gold, soft blue, navy ink).
 * Put it as an absolutely-positioned child of a `relative overflow-hidden` section,
 * behind the content. Strongest at `focus`, fading across the rest.
 *
 *   <DashField focus="bottom-left" variant="ripple" className="absolute inset-0 size-full" />
 */
export function DashField({
  className,
  focus = "bottom-left",
  variant = "ripple",
}: {
  className?: string;
  focus?: Focus;
  variant?: Variant;
}) {
  const [gold, blue, ink] = build(focus, variant);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none select-none", MASKS[focus], className)}
    >
      <g fill="none" strokeWidth={1.8} strokeLinecap="round">
        <path d={gold} stroke="#d9a62e" opacity={0.85} />
        <path d={blue} stroke="#4a90e2" opacity={0.7} />
        <path d={ink} stroke="#e4202b" opacity={0.4} />
      </g>
    </svg>
  );
}
