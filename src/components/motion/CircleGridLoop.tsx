"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  cols?: number;
  rows?: number;
  /** Fill colour of the circles, e.g. "bg-gold". */
  circleClass?: string;
  className?: string;
};

/**
 * Looping 2 x 4 circle animation:
 * one circle (top-left) -> drops one row -> returns -> all circles spill out of it ->
 * all return into it -> repeat. Pauses while off-screen.
 *
 * Circles move in % of their own size, so it stays correct at any width.
 */
export function CircleGridLoop({ cols = 4, rows = 2, circleClass = "bg-gold", className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const total = cols * rows;

  useGSAP(
    () => {
      const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", root.current);
      const rest = cells.slice(1);
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const home = (i: number) => ({
          xPercent: -((i + 1) % cols) * 100,
          yPercent: -Math.floor((i + 1) / cols) * 100,
        });

        gsap.set(cells[0], { opacity: 1, scale: 1 });
        rest.forEach((c, i) => gsap.set(c, { ...home(i), opacity: 0, scale: 0.6 }));

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
        tl.to(cells[0], { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, 0.6)
          .to(cells[0], { yPercent: 0, duration: 0.8, ease: "power3.inOut" }, "+=0.2")
          .to(
            rest,
            { xPercent: 0, yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out", stagger: 0.07 },
            "+=0.1",
          )
          .to(
            rest,
            {
              xPercent: (i: number) => home(i).xPercent,
              yPercent: (i: number) => home(i).yPercent,
              opacity: 0,
              scale: 0.6,
              duration: 0.9,
              ease: "power3.inOut",
              stagger: { each: 0.05, from: "end" },
            },
            "+=1.4",
          );

        const st = ScrollTrigger.create({
          trigger: root.current,
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        });
        return () => st.kill();
      });

      mm.add(mq.reduced, () => {
        gsap.set(cells, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0 });
      });
    },
    { scope: root, dependencies: [cols, rows] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn("grid w-full", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} data-cell className={cn("relative aspect-square", i > 0 && "opacity-0")}>
          <span className={cn("absolute inset-[1.5%] rounded-full", circleClass)} />
        </span>
      ))}
    </div>
  );
}
