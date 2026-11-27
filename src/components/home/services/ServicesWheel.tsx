"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { servicesSection as copy } from "@/data/servicesSection";
import { DonutBackdrop } from "./DonutBackdrop";
import { ServiceWheel } from "./ServiceWheel";

const n = services.length;
const LEAD = 0.5; // timeline units before the first wedge starts (the hub comes in first)
const STEP = 0.55; // timeline units between one wedge and the next
const DUR = 0.9; // how long one wedge takes to settle

/**
 * Services section. When it mounts the hub pops in, then the wedges sweep in one by one
 * clockwise from 12 o'clock, each with its arc drawing alongside. It plays once, on its own
 * (no scroll trigger, no pinning). Reduced motion: the finished wheel simply shows.
 */
export function ServicesWheel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const wedges = gsap.utils.toArray<HTMLElement>("[data-wedge]", el);
        const arcs = gsap.utils.toArray<SVGPathElement>("[data-arc]", el);

        // A wedge you cannot see yet cannot be clicked or tabbed to.
        let ready = -1;
        const setReady = (count: number) => {
          if (count === ready) return;
          ready = count;
          wedges.forEach((w, i) => w.toggleAttribute("inert", i >= count));
        };
        setReady(0);

        const tl: gsap.core.Timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onUpdate: () => setReady(wedges.filter((_, i) => tl.time() >= LEAD + i * STEP + DUR * 0.7).length),
          onComplete: () => setReady(n),
          delay: 0.3,
        });

        tl.fromTo("[data-hub]", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.6)" }, 0);
        wedges.forEach((w, i) => {
          const at = LEAD + i * STEP;
          tl.fromTo(
            w,
            { rotation: -26, scale: 0.86, opacity: 0, transformOrigin: "50% 50%" },
            { rotation: 0, scale: 1, opacity: 1, duration: DUR },
            at,
          );
          tl.fromTo(arcs[i], { drawSVG: "0%" }, { drawSVG: "100%", duration: DUR, ease: "none" }, at + 0.1);
        });

        return () => {
          wedges.forEach((w) => w.removeAttribute("inert"));
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="services-title"
      className="relative bg-night text-white"
    >
      <div className="relative min-h-svh overflow-hidden">
        <DonutBackdrop />

        <div className="wrap-wide relative z-10 flex min-h-svh flex-col items-center justify-between gap-3 pb-5 pt-[calc(var(--header-h)+2.75rem)] lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-10 lg:pb-0 lg:pt-[var(--header-h)]">
          {/* Fixed left side: title and one button, nothing else */}
          <div className="flex w-full items-end justify-between gap-4 lg:block">
            <Reveal y={40}>
              <h2
                id="services-title"
                className="text-[clamp(2.25rem,1.2rem+4.2vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              >
                {copy.titleLines[0]}
                <span className="max-lg:ml-[0.25em] lg:block">
                  {copy.titleLines[1]}
                  <span className="text-kra">.</span>
                </span>
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.15} className="hidden lg:mt-10 lg:block">
              <Button href={copy.cta.href} size="lg" arrow>
                {copy.cta.label}
              </Button>
            </Reveal>
          </div>

          {/* Circular grid */}
          <ServiceWheel className="w-[min(96vw,calc(100svh-15rem))] shrink-0 lg:w-[min(100%,calc(100svh-3rem))] lg:justify-self-center" />

          {/* Phone / tablet button (the desktop one sits under the title) */}
          <div className="flex w-full justify-center lg:hidden">
            <Button href={copy.cta.href} arrow>
              {copy.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
