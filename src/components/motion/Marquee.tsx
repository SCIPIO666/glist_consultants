"use client";

import { Children, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  /** The items of one loop, e.g. several <span>s. Separators are your job (use a dot span). */
  children: ReactNode;
  /** Pixels per second at rest. */
  speed?: number;
  /** Natural direction. Use "right" for the one that runs against the circles. */
  direction?: "left" | "right";
  /** Speeds up with scroll and flips when you scroll up. */
  reactToScroll?: boolean;
  /** Times the children repeat inside one loop (raise if the loop is narrower than the screen). */
  repeat?: number;
  className?: string;
};

/**
 * Infinite text/logo loop driven by GSAP. Seamless: the track holds two
 * identical loops and slides exactly one loop's width.
 */
export function Marquee({
  children,
  speed = 70,
  direction = "left",
  reactToScroll = true,
  repeat = 2,
  className,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const el = track.current!;
        const left = direction === "left";
        const loopWidth = () => el.scrollWidth / 2;

        const tween = gsap.fromTo(
          el,
          { xPercent: left ? 0 : -50 },
          { xPercent: left ? -50 : 0, duration: loopWidth() / speed, ease: "none", repeat: -1 },
        );

        const ro = new ResizeObserver(() => tween.duration(Math.max(loopWidth() / speed, 1)));
        ro.observe(el);

        // Scroll influence: boost with velocity, flip with direction, ease back to rest.
        let target = 1;
        let current = 1;
        const st = reactToScroll
          ? ScrollTrigger.create({
              start: 0,
              end: "max",
              onUpdate: (self) => {
                target = self.direction * (1 + Math.min(Math.abs(self.getVelocity()) / 350, 5));
              },
            })
          : null;
        const tick = () => {
          target += (1 - target) * 0.04;
          current += (target - current) * 0.1;
          tween.timeScale(current);
        };
        gsap.ticker.add(tick);

        const visible = ScrollTrigger.create({
          trigger: root.current,
          onToggle: (self) => (self.isActive ? tween.resume() : tween.pause()),
        });

        return () => {
          gsap.ticker.remove(tick);
          ro.disconnect();
          st?.kill();
          visible.kill();
        };
      });
    },
    { scope: root, dependencies: [speed, direction, reactToScroll, repeat] },
  );

  const loop = (key: string, hidden = false) => (
    <div key={key} aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: repeat }).flatMap((_, r) =>
        items.map((item, i) => (
          <div key={`${r}-${i}`} className="shrink-0">
            {item}
          </div>
        )),
      )}
    </div>
  );

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        {loop("a")}
        {loop("b", true)}
      </div>
    </div>
  );
}
