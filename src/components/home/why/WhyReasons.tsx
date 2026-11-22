"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DashField } from "@/components/ui/DashField";
import { whyReasons as copy } from "@/data/whyUs";
import { WhyReasonCard } from "./WhyReasonCard";

/**
 * Why us, part 1 of 3:
 *
 *   LEFT   minimalist title (no eyebrow, no description) + one CTA at the bottom
 *   RIGHT  four frosted-glass reasons, each split [number | heading + text]
 *   Two faint, purely decorative vertical lines divide the whole section into thirds.
 *   Soft blurred colour orbs and a field of tiny slanted dashes sit behind the glass.
 *
 * Entry: each reason has its own scroll trigger and arrives from the right when it
 * reaches the screen (reversible). Reasons arriving together are staggered.
 */
export function WhyReasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel, el);
      const mm = gsap.matchMedia();

      /**
       * Every reason owns its own ScrollTrigger (via ScrollTrigger.batch): it plays when
       * THAT card reaches the screen, and reverses when you scroll back above it.
       * Cards that arrive in the same moment are staggered so they still step in one by one.
       */
      const setup = (fromX: number) => {
        const cards = q<HTMLElement>("[data-why-card]");
        const timelines = new Map<Element, gsap.core.Timeline>();

        cards.forEach((card) => {
          const tl = gsap.timeline({ paused: true });
          tl.fromTo(card, { x: fromX, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0)
            .fromTo(card.querySelector("[data-why-num]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.3)
            .fromTo(card.querySelector("[data-why-body]"), { x: fromX * 0.15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.45);
          timelines.set(card, tl);
        });

        ScrollTrigger.batch(cards, {
          start: "top 88%",
          interval: 0.1,
          batchMax: cards.length,
          onEnter: (batch) => batch.forEach((c, k) => timelines.get(c)?.delay(k * 0.2).play()),
          onLeaveBack: (batch) => batch.forEach((c) => timelines.get(c)?.delay(0).reverse()),
        });
      };

      mm.add(`${mq.motionOk} and ${mq.mobile}`, () => setup(90));

      mm.add(`${mq.motionOk} and ${mq.desktop}`, () => {
        setup(260);
        // The two faint dividers draw down once as the section arrives.
        const lines = q<HTMLElement>("[data-why-line]");
        gsap.set(lines, { transformOrigin: "50% 0%" });
        gsap.fromTo(
          lines,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.6, ease: "power3.inOut", stagger: 0.25, scrollTrigger: { trigger: el, start: "top 70%", once: true } },
        );
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
      {/* Backdrop for the glass: soft colour orbs + dash field (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-[42%] top-[6%] size-[18rem] rounded-full bg-brand/30 blur-3xl lg:size-[28rem]" />
        <span className="absolute -right-16 top-[36%] size-[16rem] rounded-full bg-gold/40 blur-3xl lg:size-[26rem]" />
        <span className="absolute bottom-[-3rem] left-[28%] size-[16rem] rounded-full bg-brand-soft/35 blur-3xl lg:size-[24rem]" />
      </div>
      <DashField focus="bottom-left" className="absolute inset-0 size-full" />

      {/* Two faint decorative lines: the section in thirds (desktop only) */}
      <span aria-hidden data-why-line className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-ink/10 lg:block" />
      <span aria-hidden data-why-line className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-ink/10 lg:block" />

      <div className="wrap-wide relative">
        <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
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

          {/* RIGHT: the reasons */}
          <div className="relative [--gap:0px] lg:[--gap:clamp(1rem,2vw,2rem)]">
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
