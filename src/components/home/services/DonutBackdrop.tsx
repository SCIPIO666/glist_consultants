"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Seg = { pct: number; cls: string };

/** Multi-colour "money analytics" palettes. Percentages add up to 100. */
const donutA: Seg[] = [
  { pct: 26, cls: "text-brand opacity-50" },
  { pct: 17, cls: "text-gold opacity-45" },
  { pct: 21, cls: "text-night-card opacity-90" },
  { pct: 14, cls: "text-whatsapp opacity-30" },
  { pct: 22, cls: "text-brand-soft opacity-35" },
];
const donutB: Seg[] = [
  { pct: 19, cls: "text-gold opacity-45" },
  { pct: 27, cls: "text-night-card opacity-90" },
  { pct: 16, cls: "text-cta opacity-40" },
  { pct: 23, cls: "text-brand opacity-50" },
  { pct: 15, cls: "text-brand-soft opacity-35" },
];

const GAP = 0.9; // visible gap between ring segments, in % of the ring

function Donut({ segs }: { segs: Seg[] }) {
  // Where each segment starts, computed up front (no reassigning inside render).
  const starts = segs.map((_, i) => segs.slice(0, i).reduce((sum, x) => sum + x.pct, 0));
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="size-full">
      {segs.map((s, i) => {
        const start = starts[i];
        return (
          <circle
            key={s.cls}
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
  /** Diameter of each donut as a % of the host's height. Default 72. */
  size?: number;
  /** Space left between the two donuts, as a % of the host's height. Default 1.2. */
  gap?: number;
  /** Seconds per full turn. Default 150. */
  duration?: number;
  className?: string;
};

/**
 * Two stacked donuts, centred horizontally, turning in opposite directions.
 * The top one pokes out above the host and the bottom one below it; they meet
 * in the middle with a small gap. Drop it inside any `relative overflow-hidden`
 * box (it fills it) and it pauses itself while the nearest <section> is off-screen.
 *
 *   <DonutBackdrop size={72} gap={1.2} />
 */
export function DonutBackdrop({ size = 72, gap = 1.2, duration = 150, className }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const host = root.current;
      if (!host) return;
      const section = host.closest("section") ?? host;
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const a = gsap.to("[data-donut='a']", { rotation: 360, duration, ease: "none", repeat: -1 });
        const b = gsap.to("[data-donut='b']", { rotation: -360, duration, ease: "none", repeat: -1 });
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
    { scope: root, dependencies: [duration] },
  );

  const base = "absolute left-1/2 aspect-square -translate-x-1/2";
  const topStyle: CSSProperties = { height: `${size}%`, top: `${50 - gap / 2 - size}%` };
  const bottomStyle: CSSProperties = { height: `${size}%`, top: `${50 + gap / 2}%` };

  return (
    <div ref={root} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={base} style={topStyle}>
        <div data-donut="a" className="size-full">
          <Donut segs={donutA} />
        </div>
      </div>
      <div className={base} style={bottomStyle}>
        <div data-donut="b" className="size-full">
          <Donut segs={donutB} />
        </div>
      </div>
    </div>
  );
}
