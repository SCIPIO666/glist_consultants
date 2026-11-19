"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";

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

const GAP = 0.9; // visible gap between segments, in % of the ring

function Donut({ segs }: { segs: Seg[] }) {
  let acc = 0;
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="size-full">
      {segs.map((s, i) => {
        const start = acc;
        acc += s.pct;
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

/**
 * Two huge donuts that split the section in half, with a visible margin between.
 * Each is centred on the edge it shares with the other, so only half of each
 * shows. They rotate in opposite directions and pause while off-screen.
 */
export function DonutBackdrop() {
  const root = useRef<HTMLDivElement>(null);

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
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0">
      {/* top half: its donut is centred on the bottom edge of this half */}
      <div className="absolute inset-x-0 top-0 h-[calc(50%-0.4rem)] overflow-hidden">
        <div className="absolute left-[70%] top-full -ml-[56svh] -mt-[56svh] size-[112svh]">
          <div data-donut="a" className="size-full">
            <Donut segs={donutA} />
          </div>
        </div>
      </div>
      {/* bottom half: its donut is centred on the top edge of this half */}
      <div className="absolute inset-x-0 bottom-0 h-[calc(50%-0.4rem)] overflow-hidden">
        <div className="absolute left-[28%] top-0 -ml-[56svh] -mt-[56svh] size-[112svh]">
          <div data-donut="b" className="size-full">
            <Donut segs={donutB} />
          </div>
        </div>
      </div>
    </div>
  );
}
