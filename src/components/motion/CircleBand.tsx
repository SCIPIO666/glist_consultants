"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  rows?: number;
  /**
   * The circles take the colour of the section BELOW the band (text-night,
   * text-sand, text-mist ...). The band itself is transparent, so the section
   * above shows behind it.
   */
  colorClass?: string;
  /** Pop the circles in when scrolled into view (reversible). */
  reveal?: boolean;
  className?: string;
};

const MAX_COLS = 16;

/**
 * Rows of touching circles used as the top edge of a full-height section.
 *
 *   <CircleBand colorClass="text-night" />
 *   <section className="bg-night">...</section>
 *
 * Column count is responsive; circle size = 100% / columns, so rows never
 * show a half circle at the edge.
 */
export function CircleBand({ rows = 3, colorClass = "text-night", reveal = false, className }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!reveal) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.fromTo(
          "[data-circle]",
          { scale: 0 },
          {
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.6)",
            stagger: { each: 0.012, from: "start" },
            scrollTrigger: { trigger: root.current, start: "top 95%", toggleActions: "play none none reverse" },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-circle]", { scale: 1 });
      });
    },
    { scope: root, dependencies: [reveal] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "pointer-events-none w-full overflow-hidden leading-none [--cols:6] sm:[--cols:8] lg:[--cols:12] 2xl:[--cols:16]",
        colorClass,
        className,
      )}
    >
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex">
          {Array.from({ length: MAX_COLS }).map((__, c) => (
            <span key={c} className="aspect-square w-[calc(100%/var(--cols))] shrink-0">
              <span data-circle className={cn("block size-full rounded-full bg-current", reveal && "scale-0")} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
