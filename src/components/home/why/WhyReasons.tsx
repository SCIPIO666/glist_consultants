"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ScatterDots } from "@/components/ui/ScatterDots";
import { whyReasons as copy } from "@/data/whyUs";
import { WhyReasonCard } from "./WhyReasonCard";

/**
 * Why us, part 1 of 3: a full-height screen split by two thin vertical lines into three
 * columns. Left: the title, with the CTA at the bottom. Right two columns: four numbered rows.
 * On scroll the lines draw down and the rows slide in from the right, each starting a step
 * further out than the one above (reversible). Gold dots are scattered bottom-right.
 */
export function WhyReasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-why-row]", el);
      const lines = gsap.utils.toArray<HTMLElement>("[data-why-line]", el);
      const mm = gsap.matchMedia();

      // Phones/tablets: one column, so each row reveals as IT reaches the viewport.
      mm.add(`${mq.motionOk} and ${mq.mobile}`, () => {
        rows.forEach((row) => {
          gsap.fromTo(
            row,
            { x: 70, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" },
            },
          );
        });
      });

      mm.add(`${mq.motionOk} and ${mq.desktop}`, () => {
        gsap.set(lines, { transformOrigin: "50% 0%" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
        });
        tl.fromTo(lines, { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "power3.inOut", stagger: 0.18 }, 0);
        // Stepped: every row starts further to the right than the one above it, then they land in turn.
        rows.forEach((row, i) => {
          tl.fromTo(
            row,
            { x: 140 + i * 90, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
            0.35 + i * 0.16,
          );
        });
      });

      mm.add(mq.reduced, () => {
        gsap.set(rows, { opacity: 1 });
        gsap.set(lines, { scaleY: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="relative overflow-hidden bg-mist text-ink">
      <ScatterDots className="absolute bottom-0 right-0 w-[min(70vw,34rem)] lg:w-[min(42vw,36rem)]" />

      <div className="wrap-wide relative">
        <div className="relative grid min-h-svh gap-y-10 py-[clamp(4.5rem,10svh,7rem)] lg:grid-cols-3 lg:gap-y-0 lg:py-0">
          {/* The two lines. Hidden on small screens where everything stacks. */}
          <span
            aria-hidden
            data-why-line
            className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px scale-y-0 bg-ink/20 lg:block"
          />
          <span
            aria-hidden
            data-why-line
            className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px scale-y-0 bg-ink/20 lg:block"
          />

          {/* Left column: minimal title, CTA at the bottom */}
          <div className="flex flex-col justify-between gap-10 lg:py-[calc(var(--header-h)+1rem)] lg:pr-10 xl:pr-14">
            <Reveal y={40}>
              <h2
                id="why-title"
                className="text-[clamp(2.4rem,1.2rem+4.2vw,4.8rem)] font-medium leading-[1] tracking-[-0.03em]"
              >
                {copy.title}
              </h2>
            </Reveal>
            <Reveal y={24} delay={0.2} start="top 98%" className="hidden lg:block">
              <Button href={copy.cta.href} variant="outline-dark" size="lg" arrow>
                {copy.cta.label}
              </Button>
            </Reveal>
          </div>

          {/* Right two columns: four rows */}
          <ol aria-label={copy.srListLabel} className="lg:col-span-2 lg:grid lg:grid-rows-4 lg:py-[var(--header-h)]">
            {copy.items.map((item, i) => (
              <WhyReasonCard key={item.title} item={item} index={i} />
            ))}
          </ol>

          <div className="lg:hidden">
            <Button href={copy.cta.href} variant="outline-dark" size="lg" arrow>
              {copy.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
