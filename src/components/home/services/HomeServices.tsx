"use client";

import { CircleBand } from "@/components/motion/CircleBand";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { servicesSection as copy } from "@/data/servicesSection";
import { DonutBackdrop } from "./DonutBackdrop";
import { ServicesWheel } from "./ServicesWheel";
import type { CSSProperties } from "react";

const SCROLL_PER_PANEL = 45; // svh of scrolling per panel
const HOLD = 45; // svh of rest at the end
const n = 7;

/**
 * Home services: a band of night circles rising over the sand intro, then a pinned scene.
 * Left: the fixed title and CTA. Right: the service wheel, revealed clockwise as you scroll.
 */
export function HomeServices() {
  const style = { "--svc-h": `calc(100svh + ${SCROLL_PER_PANEL * (n - 1) + HOLD}svh)` } as CSSProperties;

  return (
    <>
      <CircleBand colorClass="text-night" className="bg-sand" reveal />
      <section
        aria-labelledby="services-title"
        style={style}
        className="relative h-[var(--svc-h)] bg-night text-white flat:h-auto"
      >
        <div className="sticky top-0 h-svh overflow-hidden flat:static flat:h-auto flat:overflow-visible">
          <DonutBackdrop />

          <div className="wrap-wide relative z-10 flex h-full flex-col items-center justify-center gap-6 pt-[var(--header-h)] lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10 flat:gap-12 flat:py-24">
            <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
              <Reveal y={40}>
                <h2
                  id="services-title"
                  className="text-[clamp(2.4rem,1.2rem+5vw,5.5rem)] font-medium leading-[1] tracking-[-0.03em]"
                >
                  {copy.title}
                </h2>
              </Reveal>
              <Reveal y={24} delay={0.15}>
                <Button href={copy.cta.href} size="lg" arrow>
                  {copy.cta.label}
                </Button>
              </Reveal>
            </div>

            <div className="w-full lg:justify-self-end">
              <ServicesWheel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
