"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Circled } from "@/components/motion/Circled";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/data/services";
import { servicesSection as copy } from "@/data/servicesSection";
import { DonutBackdrop } from "./DonutBackdrop";
import { ServiceCard } from "./ServiceCard";

const n = services.length;
const SCROLL_PER_CARD = 75; // svh of scrolling per card
const HOLD = 60; // svh of rest at the end
const LEAD = 0.3; // timeline units of rest before the first card moves
const DEPTH_STEP = 12; // px each buried card peeks out above the next
const DIM = [0, 0.25, 0.45, 0.6]; // how dark a buried card gets, by depth

/**
 * The services stack. The section is tall and its content is pinned (CSS sticky)
 * while scrolling plays a scrubbed timeline: each card drops in from the top and
 * buries the one before it. Fully reversible. The title stays fixed on the left.
 */
export function ServicesStack() {
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-svc-card]", el);
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const pose = (d: number) => ({ y: -DEPTH_STEP * d, scale: 1 - 0.04 * d });

        gsap.set(cards, { transformOrigin: "50% 0%" });

        // Only the top card can be focused or clicked; the counter follows it.
        let active = -1;
        const setActive = (idx: number) => {
          if (idx === active) return;
          active = idx;
          cards.forEach((c, i) => c.toggleAttribute("inert", i !== idx));
          if (counter.current) counter.current.textContent = String(idx + 1).padStart(2, "0");
        };
        setActive(0);

        const tl: gsap.core.Timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const t = self.progress * tl.duration();
              setActive(Math.min(n - 1, Math.max(0, Math.floor(t - LEAD + 0.5))));
            },
          },
        });
        for (let i = 1; i < n; i++) {
          const at = LEAD + (i - 1);
          tl.fromTo(cards[i], { yPercent: -120 }, { yPercent: 0, duration: 1 }, at);
          for (let j = 0; j < i; j++) {
            const d0 = Math.min(i - 1 - j, 3);
            const d1 = Math.min(i - j, 3);
            if (d0 === d1) continue;
            tl.fromTo(cards[j], pose(d0), { ...pose(d1), duration: 1 }, at);
            tl.fromTo(
              cards[j].querySelector("[data-dim]"),
              { opacity: DIM[d0] },
              { opacity: DIM[d1], duration: 1 },
              at,
            );
          }
        }
        tl.to({}, { duration: 0.5 }, LEAD + (n - 1)); // rest on the last card

        return () => {
          cards.forEach((c) => c.removeAttribute("inert"));
        };
      });
      // Reduced motion: no pinning, cards simply list one under another (see the motion-reduce classes).
    },
    { scope: root },
  );

  const style = { "--stack-h": `calc(100svh + ${SCROLL_PER_CARD * (n - 1) + HOLD}svh)` } as CSSProperties;

  return (
    <section
      ref={root}
      aria-labelledby="services-title"
      style={style}
      className="relative h-[var(--stack-h)] bg-night text-white motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
        <DonutBackdrop />

        <div className="wrap-wide relative z-10 flex h-full flex-col gap-4 pb-5 pt-[calc(var(--header-h)+0.5rem)] lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:pb-0 lg:pt-[var(--header-h)] motion-reduce:py-24">
          {/* Fixed left side */}
          <div className="lg:max-w-[34rem]">
            <Reveal y={20}>
              <Eyebrow className="text-gold">{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal y={40} delay={0.1} className="mt-3 lg:mt-5">
              <h2
                id="services-title"
                className="text-[clamp(1.9rem,0.9rem+3.7vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.025em]"
              >
                {copy.titleBefore}{" "}
                <Circled shape="squiggle" colorClass="text-gold">
                  {copy.titleMark}
                </Circled>{" "}
                {copy.titleAfter}
              </h2>
            </Reveal>
            <p className="mt-5 hidden max-w-md text-lead text-white/70 sm:block">{copy.lead}</p>

            <div className="mt-8 hidden flex-wrap items-center gap-3 lg:flex">
              <Button href={copy.primaryCta.href} size="lg" arrow>
                {copy.primaryCta.label}
              </Button>
              <Button href={copy.secondaryCta.href} variant="ghost-light" size="lg">
                {copy.secondaryCta.label}
              </Button>
            </div>

            <p aria-hidden className="mt-3 text-sm tabular-nums tracking-widest text-white/60 lg:mt-8 motion-reduce:hidden">
              <span ref={counter}>01</span> / {String(n).padStart(2, "0")}
            </p>
          </div>

          {/* Card stack */}
          <div className="relative h-[min(30rem,50svh)] w-full lg:ml-auto lg:h-[min(36rem,66svh)] lg:max-w-[34rem] motion-reduce:h-auto">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} total={n} ctaLabel={copy.cardCta} />
            ))}
          </div>

          {/* Mobile CTA (the desktop one sits under the title) */}
          <div className="flex gap-3 lg:hidden">
            <Button href={copy.primaryCta.href} arrow>
              {copy.primaryCta.label}
            </Button>
            <Button href={copy.secondaryCta.href} variant="ghost-light">
              {copy.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
