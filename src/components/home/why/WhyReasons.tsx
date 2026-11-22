"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ScatterDots } from "@/components/ui/ScatterDots";
import { whyReasons as copy } from "@/data/whyUs";
import { WhyReasonCard } from "./WhyReasonCard";

/**
 * Why us, part 1 of 3 (follows the client's sketch):
 *
 *   LEFT   minimalist title (no eyebrow, no description) + one CTA at the bottom
 *   RIGHT  four numbered reasons, stacked, each split [number | heading + text]
 *   Two thin vertical lines run the full height: one between the title and the
 *   reasons, one between the numbers and the text. A scatter of gold dots sits
 *   in the bottom-right corner.
 *
 * On scroll (reversible) the lines draw down, then the cards arrive from the
 * right one after another, each in steps: card, number, text.
 */
export function WhyReasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel, el);
      const mm = gsap.matchMedia();

      // Phones/tablets: one tall column, so each card reveals as IT reaches the screen.
      mm.add(`${mq.motionOk} and ${mq.mobile}`, () => {
        q<HTMLElement>("[data-why-card]").forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
          });
          tl.fromTo(card, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0)
            .fromTo(card.querySelector("[data-why-num]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.25)
            .fromTo(card.querySelector("[data-why-body]"), { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.35);
        });
      });

      // Desktop: lines draw first, then cards step in from the right with a clear stagger.
      mm.add(`${mq.motionOk} and ${mq.desktop}`, () => {
        const cards = q<HTMLElement>("[data-why-card]");
        const lines = q<HTMLElement>("[data-why-line]");
        gsap.set(lines, { transformOrigin: "50% 0%" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
        });
        tl.fromTo(lines, { scaleY: 0 }, { scaleY: 1, duration: 1.3, ease: "power3.inOut", stagger: 0.2 }, 0);

        cards.forEach((card, i) => {
          const at = 0.45 + i * 0.3;
          tl.fromTo(card, { x: 180, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "expo.out" }, at)
            .fromTo(card.querySelector("[data-why-num]"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, at + 0.25)
            .fromTo(card.querySelector("[data-why-body]"), { x: 36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, at + 0.4);
        });
      });

      mm.add(mq.reduced, () => {
        gsap.set(q("[data-why-card]"), { opacity: 1 });
        gsap.set(q("[data-why-line]"), { scaleY: 1 });
      });
    },
    { scope: root },
  );

  const cta = (
    <Button href={copy.cta.href} variant="outline-dark" size="lg" arrow>
      {copy.cta.label}
    </Button>
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="relative overflow-hidden bg-mist text-ink">
      {/* Bottom-right scatter, sits behind the translucent cards */}
      <ScatterDots tone="gold" className="absolute bottom-0 right-0 w-[min(75vw,34rem)] lg:w-[min(46vw,42rem)]" />

      <div className="wrap-wide relative">
        <div className="grid min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
          {/* LEFT: title + CTA, nothing else */}
          <div className="flex flex-col justify-between gap-10 pb-6 pt-[calc(var(--header-h)+2.5rem)] lg:pb-16 lg:pr-12 lg:pt-[calc(var(--header-h)+3rem)]">
            <Reveal y={40}>
              <h2
                id="why-title"
                className="text-[clamp(2.75rem,1.2rem+5.2vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              >
                {copy.titleLines.map((line, i) => (
                  <span key={line} className="block">
                    {line}
                    {i === copy.titleLines.length - 1 && (
                      <span aria-hidden className="ml-[0.05em] inline-block size-[0.14em] rounded-full bg-gold" />
                    )}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal y={24} delay={0.2} className="hidden lg:block">
              {cta}
            </Reveal>
          </div>

          {/* RIGHT: numbered reasons, with the two long lines running behind them */}
          <div className="relative [--gap:0px] [--num:4.75rem] lg:[--gap:clamp(1rem,2vw,2rem)] lg:[--num:clamp(6.5rem,9vw,9.5rem)]">
            <span
              aria-hidden
              data-why-line
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-ink/20 lg:block"
            />
            <span
              aria-hidden
              data-why-line
              className="pointer-events-none absolute inset-y-0 left-[var(--num)] hidden w-px bg-ink/20 lg:block"
            />

            <ol
              role="list"
              aria-label={copy.srListLabel}
              className="relative flex flex-col gap-4 pb-6 lg:min-h-svh lg:justify-center lg:gap-5 lg:py-[calc(var(--header-h)+1.5rem)]"
            >
              {copy.items.map((item, i) => (
                <WhyReasonCard key={item.title} item={item} index={i} />
              ))}
            </ol>

            {/* Phones: the CTA closes the section instead of sitting under the title */}
            <div className="pb-16 lg:hidden">{cta}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
