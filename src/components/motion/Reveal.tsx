"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Start offset in px (positive = starts lower and rises). */
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  /** Delay between children when target="children". */
  stagger?: number;
  /** "self" animates this element; "children" animates each direct child. */
  target?: "self" | "children";
  /** ScrollTrigger start, e.g. "top 85%". */
  start?: string;
  /** true = play once and stay. Default false = reverses when you scroll back above it. */
  once?: boolean;
};

/**
 * Scroll-triggered fade + slide. Reversible by default.
 *
 *   <Reveal><Eyebrow>Our services</Eyebrow></Reveal>
 *   <Reveal target="children" stagger={0.1} as="ul">...</Reveal>
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  y = 40,
  x = 0,
  delay = 0,
  duration = 1,
  stagger = 0.1,
  target = "self",
  start = "top 85%",
  once = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Component = Tag as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = target === "self" ? el : Array.from(el.children);
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y, x },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration,
            delay,
            stagger: target === "children" ? stagger : 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set(targets, { opacity: 1 });
      });
    },
    { scope: ref },
  );

  return (
    // Hidden until GSAP takes over, so there is no flash before hydration.
    <Component ref={ref} className={cn(target === "self" ? "opacity-0" : "[&>*]:opacity-0", className)}>
      {children}
    </Component>
  );
}
