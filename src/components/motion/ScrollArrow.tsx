"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const variants = {
  // Looping hand-drawn arrow pointing down
  curl: {
    viewBox: "0 0 120 170",
    body: "M52 4 C80 24 94 52 76 72 C64 86 38 78 44 64 C50 52 72 60 76 86 C80 110 72 130 64 150",
    head: "M50 136 L64 152 L78 138",
  },
  // Gentle S-curve pointing down
  swoop: {
    viewBox: "0 0 120 170",
    body: "M40 4 C90 30 20 60 60 96 C86 120 70 140 64 152",
    head: "M50 138 L64 154 L78 140",
  },
} as const;

type Props = {
  variant?: keyof typeof variants;
  /** Size and placement, e.g. "h-32 w-24 mx-auto". Mirror with "-scale-x-100". */
  className?: string;
  colorClass?: string;
  stroke?: number;
  /** ScrollTrigger start/end for the drawing. */
  start?: string;
  end?: string;
};

/**
 * Directional hand-drawn arrow, drawn by scroll position and reversible.
 * Place it between sections to lead the eye downward.
 */
export function ScrollArrow({
  variant = "curl",
  className,
  colorClass = "text-kra-light",
  stroke = 2.5,
  start = "top 90%",
  end = "bottom 50%",
}: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const body = useRef<SVGPathElement>(null);
  const head = useRef<SVGPathElement>(null);
  const v = variants[variant];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.set(svg.current, { opacity: 1 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: svg.current, start, end, scrub: true },
        });
        tl.fromTo(body.current, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1 }).fromTo(
          head.current,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.18 },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set(svg.current, { opacity: 1 });
      });
    },
    { scope: svg },
  );

  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg ref={svg} aria-hidden viewBox={v.viewBox} className={cn("overflow-visible opacity-0", colorClass, className)}>
      <path ref={body} d={v.body} {...common} />
      <path ref={head} d={v.head} {...common} />
    </svg>
  );
}
