"use client";

import { useRef, type ReactNode } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** 0 = no pull, 1 = sticks to the cursor. 0.25 to 0.45 feels right. */
  strength?: number;
  className?: string;
  innerClassName?: string;
};

/**
 * Magnetic hover: the content leans toward the cursor while the pointer is over
 * it, and springs back on leave. Only runs for mouse users who have not asked
 * for reduced motion.
 *
 * Two layers on purpose: the OUTER box never moves (it measures the cursor),
 * the INNER box does. If one element did both, it would chase its own centre.
 */
export function Magnetic({ children, strength = 0.35, className, innerClassName }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${mq.motionOk} and (hover: hover) and (pointer: fine)`, () => {
        const box = outer.current;
        const el = inner.current;
        if (!box || !el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.5)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.5)" });

        const move = (e: PointerEvent) => {
          const r = box.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };

        box.addEventListener("pointermove", move);
        box.addEventListener("pointerleave", leave);
        return () => {
          box.removeEventListener("pointermove", move);
          box.removeEventListener("pointerleave", leave);
          gsap.set(el, { x: 0, y: 0 });
        };
      });
    },
    { scope: outer, dependencies: [strength] },
  );

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className={cn("will-change-transform", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
