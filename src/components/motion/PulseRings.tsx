"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export type PulseCenter = {
  /** CSS left/top of the ring centre, e.g. "8%". */
  x: string;
  y: string;
  /** Diameter of the biggest ring, e.g. "46rem". */
  size: string;
  /** Seconds before this centre starts (stagger two centres apart). */
  delay?: number;
};

const RINGS = 4;

/**
 * Concentric translucent discs that swell outward from a point and fade, over
 * and over, like a sonar pulse. Decorative background: place inside a
 * `relative overflow-hidden` parent. Colour comes from the text colour class.
 *
 *   <PulseRings className="text-brand-soft" centers={[{ x: "8%", y: "45%", size: "46rem" }]} />
 */
export function PulseRings({ centers, className }: { centers: PulseCenter[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.utils.toArray<HTMLElement>("[data-ring]", root.current).forEach((ring) => {
          const c = Number(ring.dataset.center);
          const r = Number(ring.dataset.ring);
          gsap.fromTo(
            ring,
            { scale: 0.18, opacity: 0.55 },
            {
              scale: 1,
              opacity: 0,
              duration: 7,
              ease: "power1.out",
              repeat: -1,
              delay: (centers[c].delay ?? 0) + r * (7 / RINGS),
            },
          );
        });
      });
      mm.add(mq.reduced, () => {
        gsap.utils.toArray<HTMLElement>("[data-ring]", root.current).forEach((ring) => {
          const r = Number(ring.dataset.ring);
          gsap.set(ring, { scale: 0.3 + r * 0.22, opacity: 0.25 - r * 0.05 });
        });
      });
    },
    { scope: root, dependencies: [] },
  );

  return (
    <div ref={root} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {centers.map((c, ci) => (
        <div
          key={ci}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: c.x, top: c.y, width: c.size, height: c.size }}
        >
          {Array.from({ length: RINGS }).map((_, ri) => (
            <span
              key={ri}
              data-center={ci}
              data-ring={ri}
              className="absolute inset-0 rounded-full border border-current bg-current/[0.06] opacity-0"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
