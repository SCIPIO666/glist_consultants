"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Thin vertical rail on the left that fills as you scroll through its parent.
 * Drop it as the FIRST child of a `relative` wrapper that holds the sections:
 *
 *   <div className="relative">
 *     <ProgressRail />
 *     <section>...</section>
 *   </div>
 *
 * Note: no ancestor between the rail and the page may use overflow-hidden
 * (it breaks position: sticky).
 */
export function ProgressRail({
  trackClass = "bg-white/20",
  fillClass = "bg-gold",
  className,
}: {
  trackClass?: string;
  fillClass?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const parent = wrap.current?.parentElement;
      if (!parent) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: parent, start: "top top", end: "bottom bottom", scrub: true },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set(fill.current, { scaleY: 1 });
      });
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} aria-hidden className={cn("pointer-events-none absolute inset-y-0 left-0 z-20", className)}>
      <div className="sticky top-[38svh] ml-2 h-[24svh] w-[3px] sm:ml-4">
        <span className={cn("absolute inset-0 rounded-full", trackClass)} />
        <span ref={fill} className={cn("absolute inset-0 origin-top rounded-full", fillClass)} />
      </div>
    </div>
  );
}
