"use client";

import { useRef, type ReactNode } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Shape = "circle" | "underline" | "squiggle";

const shapes: Record<Shape, { box: string; viewBox: string; d: string }> = {
  // Imperfect, overshooting ellipse, like a pen circling a word
  circle: {
    box: "left-[-7%] top-[-22%] h-[144%] w-[114%]",
    viewBox: "0 0 100 100",
    d: "M9 62 C3 32 30 8 60 7 C90 6 99 32 93 60 C87 90 48 97 21 86 C1 77 6 42 42 20 C52 15 64 13 74 14",
  },
  underline: {
    box: "left-0 bottom-[-0.2em] h-[0.34em] w-full",
    viewBox: "0 0 100 20",
    d: "M1 13 C18 6 34 17 52 10 S84 7 99 11",
  },
  squiggle: {
    box: "left-0 bottom-[-0.28em] h-[0.4em] w-full",
    viewBox: "0 0 100 20",
    d: "M1 10 Q9 1 17 10 T33 10 T49 10 T65 10 T81 10 T99 10",
  },
};

type Props = {
  children: ReactNode;
  shape?: Shape;
  /** Tailwind text colour class, the stroke uses currentColor of the drawing. */
  colorClass?: string;
  /** Stroke width in px. */
  stroke?: number;
  delay?: number;
  duration?: number;
  /** Tie the drawing to scroll position instead of playing once it enters. */
  scrub?: boolean;
  className?: string;
};

/**
 * Hand-drawn mark around inline text. Draws when scrolled into view and
 * un-draws when you scroll back up.
 *
 *   We <Circled shape="circle">guide</Circled> you.
 */
export function Circled({
  children,
  shape = "circle",
  colorClass = "text-gold",
  stroke = 2,
  delay = 0,
  duration = 1.1,
  scrub = false,
  className,
}: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const s = shapes[shape];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.set(svg.current, { opacity: 1 });
        gsap.fromTo(
          path.current,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration,
            delay,
            ease: scrub ? "none" : "power2.inOut",
            scrollTrigger: scrub
              ? { trigger: root.current, start: "top 75%", end: "top 40%", scrub: true }
              : { trigger: root.current, start: "top 85%", toggleActions: "play none none reverse" },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set(svg.current, { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <span ref={root} className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <svg
        ref={svg}
        aria-hidden
        viewBox={s.viewBox}
        preserveAspectRatio="none"
        className={cn("pointer-events-none absolute overflow-visible opacity-0", s.box, colorClass)}
      >
        <path
          ref={path}
          d={s.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
