"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Seg = { pct: number; cls: string };

/** Multi-colour "money analytics" palettes. Percentages add up to 100. */
const donutA: Seg[] = [
  { pct: 26, cls: "text-brand opacity-50" },
  { pct: 17, cls: "text-kra opacity-55" },
  { pct: 21, cls: "text-night-card opacity-90" },
  { pct: 14, cls: "text-whatsapp opacity-30" },
  { pct: 22, cls: "text-brand-soft opacity-35" },
];
const donutB: Seg[] = [
  { pct: 19, cls: "text-gold opacity-45" },
  { pct: 27, cls: "text-night-card opacity-90" },
  { pct: 16, cls: "text-kra opacity-55" },
  { pct: 23, cls: "text-brand opacity-50" },
  { pct: 15, cls: "text-brand-soft opacity-35" },
];

const GAP = 0.9; // visible gap between segments, in % of the ring

function Donut({ segs }: { segs: Seg[] }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="size-full">
      {segs.map((s, i) => {
        const start = segs.slice(0, i).reduce((sum, x) => sum + x.pct, 0);
        return (
          <circle
            key={i}
            cx={100}
            cy={100}
            r={66}
            fill="none"
            stroke="currentColor"
            strokeWidth={68}
            pathLength={100}
            strokeDasharray={`${s.pct - GAP} ${100 - (s.pct - GAP)}`}
            strokeDashoffset={-start}
            transform="rotate(-90 100 100)"
            className={s.cls}
          />
        );
      })}
    </svg>
  );
}

type Props = {
  /**
   * Donut diameter as a share of the section height. Each donut is centred exactly on its edge,
   * so half of it shows. 0.96 leaves a thin gap where the two halves meet in the middle; use 1 for
   * the halves to touch, or more to overlap them.
   */
  size?: number;
  /** Sideways nudge in % of the width: the top donut goes left, the bottom one right. */
  shift?: number;
  className?: string;
};

/**
 * Reusable background: two big donuts stacked one above the other, centred. Each is
 * centred on its own edge of the section (the top one on the top edge, the bottom one
 * on the bottom edge), so exactly half of each shows, as two half-donuts facing each
 * other. They turn in opposite directions and pause while off-screen.
 *
 * Drop it as the first child of a `relative` box that has a definite height:
 *   <div className="relative h-svh"><DonutBackdrop />...</div>
 */
export function DonutBackdrop({ size = 0.96, shift = 3, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  // Each donut hangs half its own height past its edge, so its centre sits ON the edge: exactly half shows.
  const over = size / 2;
  const d = `${size * 100}%`;

  useGSAP(
    () => {
      const section = root.current?.closest("section");
      if (!root.current || !section) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const a = gsap.to("[data-donut='a']", { rotation: 360, duration: 150, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        const b = gsap.to("[data-donut='b']", { rotation: -360, duration: 150, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              a.play();
              b.play();
            } else {
              a.pause();
              b.pause();
            }
          },
        });
        return () => st.kill();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Top donut: hangs above the top edge */}
      <div
        className="absolute aspect-square"
        style={{ height: d, top: `${-over * 100}%`, left: `${50 - shift}%`, transform: "translateX(-50%)" }}
      >
        <div data-donut="a" className="size-full">
          <Donut segs={donutA} />
        </div>
      </div>
      {/* Bottom donut: hangs below the bottom edge */}
      <div
        className="absolute aspect-square"
        style={{ height: d, bottom: `${-over * 100}%`, left: `${50 + shift}%`, transform: "translateX(-50%)" }}
      >
        <div data-donut="b" className="size-full">
          <Donut segs={donutB} />
        </div>
      </div>
    </div>
  );
}
