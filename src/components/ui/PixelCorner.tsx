"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Corner = "tl" | "tr" | "bl" | "br";

type Props = {
  corner?: Corner;
  /** Cells per side. 5 is subtle, 7 is bold. */
  cells?: number;
  /** Text colour class; the squares paint in this colour, so match the page behind the image. */
  colorClass?: string;
  className?: string;
};

const place: Record<Corner, string> = {
  tl: "left-0 top-0",
  tr: "right-0 top-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

/**
 * "Eaten" pixel corner for an image. Drop it as the LAST child of a
 * `relative overflow-hidden` image box. The squares are painted in the colour of
 * the page behind, so the image looks cut away in a ragged staircase. They pop in
 * when scrolled into view and out again on the way back up.
 *
 *   <div className="relative overflow-hidden rounded-card">
 *     <Image fill ... />
 *     <PixelCorner corner="tr" colorClass="text-paper" />
 *   </div>
 */
export function PixelCorner({ corner = "tr", cells = 5, colorClass = "text-paper", className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const flipX = corner === "tr" || corner === "br";
  const flipY = corner === "bl" || corner === "br";

  // d = distance from the corner; deterministic "random" holes keep it jagged.
  const items: { r: number; c: number }[] = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const hole = (r * 7 + c * 13 + 5) % 3;
      if (r + c + hole < cells - 1) items.push({ r, c });
    }
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.fromTo(
          "[data-px]",
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: { each: 0.03, from: "end" },
            scrollTrigger: { trigger: root.current, start: "top 85%", toggleActions: "play none none reverse" },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-px]", { scale: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn("pointer-events-none absolute grid [--px:clamp(1.1rem,2.6vw,2rem)]", place[corner], colorClass, className)}
      style={{ gridTemplateColumns: `repeat(${cells}, var(--px))`, gridTemplateRows: `repeat(${cells}, var(--px))` }}
    >
      {items.map(({ r, c }) => (
        <span
          key={`${r}-${c}`}
          data-px
          className="scale-0 bg-current shadow-[0_0_0_1px_currentColor]"
          style={{ gridRow: (flipY ? cells - 1 - r : r) + 1, gridColumn: (flipX ? cells - 1 - c : c) + 1 }}
        />
      ))}
    </div>
  );
}
