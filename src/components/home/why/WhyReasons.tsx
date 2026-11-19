"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Circled } from "@/components/motion/Circled";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScatterDots } from "@/components/ui/ScatterDots";
import { whyReasons as copy } from "@/data/whyUs";
import { WhyReasonCard } from "./WhyReasonCard";

/**
 * Why us, part 1 of 3: a full-height screen split by two thin vertical lines
 * into three columns. Title on the left; four numbered cards fill the other two
 * columns. On scroll the lines draw down and the cards slide in from the right
 * (reversible). Stats (M8) and reviews (M9) follow this section.
 */
export function WhyReasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      // Phones/tablets: the cards stack in one column and the section is far taller than the
      // screen, so each card reveals itself as IT reaches the viewport (not all at once, off-screen).
      mm.add(`${mq.motionOk} and ${mq.mobile}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-why-card]", el).forEach((card) => {
          gsap.fromTo(
            card,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
            },
          );
        });
      });

      mm.add(`${mq.motionOk} and ${mq.desktop}`, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-why-card]", el);
        const lines = gsap.utils.toArray<HTMLElement>("[data-why-line]", el);
        gsap.set(lines, { transformOrigin: "50% 0%" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
        });
        tl.fromTo(lines, { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "power3.inOut", stagger: 0.18 }, 0);
        tl.fromTo(
          cards,
          { x: 160, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.14 },
          0.3,
        );
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-why-card]", { opacity: 1 });
        gsap.set("[data-why-line]", { scaleY: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="relative overflow-hidden bg-mist text-ink">
      <ScatterDots className="absolute bottom-0 right-0 w-[min(70vw,34rem)] lg:w-[min(42vw,36rem)]" />

      <div className="wrap-wide relative">
        <div className="relative grid min-h-svh gap-y-10 py-[clamp(4.5rem,10svh,7rem)] lg:grid-cols-3 lg:grid-rows-2 lg:gap-y-0 lg:py-0">
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

          {/* Left column: title */}
          <div className="flex flex-col justify-center lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:py-[var(--header-h)] lg:pr-10 xl:pr-14">
            <Reveal y={20}>
              <Eyebrow className="text-brand">{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal y={40} delay={0.1} className="mt-4">
              <h2
                id="why-title"
                className="text-[clamp(2rem,1rem+3.2vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.025em]"
              >
                {copy.titleBefore}{" "}
                <Circled shape="squiggle" colorClass="text-cta">
                  {copy.titleMark}
                </Circled>
                {copy.titleAfter}
              </h2>
            </Reveal>
            <Reveal y={24} delay={0.2} className="mt-6 max-w-md">
              <p className="text-lead text-ink-muted">{copy.lead}</p>
            </Reveal>
            <Reveal y={24} delay={0.3} className="mt-8">
              <Button href={copy.cta.href} variant="outline-dark" size="lg" arrow>
                {copy.cta.label}
              </Button>
            </Reveal>
          </div>

          {/* Right two columns: four cards, two per row */}
          <ol
            role="list"
            aria-label={copy.srListLabel}
            className="grid gap-4 lg:contents"
          >
            {copy.items.map((item, i) => (
              <WhyReasonCard key={item.title} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
