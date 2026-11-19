"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { StarLoop } from "@/components/motion/StarLoop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { statsSection as copy, starPanel } from "@/data/stats";

const fmt = (n: number) => Math.round(n).toLocaleString("en-KE");

/**
 * Why us, part 2 of 3: a full-height dark screen. Left: four numbers that count
 * up when scrolled into view (reversible). Right: the inset star-loop panel.
 */
export function WhyStats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", el).forEach((node, i) => {
          const target = Number(node.dataset.count);
          const counter = { v: 0 };
          gsap.fromTo(
            counter,
            { v: 0 },
            {
              v: target,
              duration: 2,
              delay: i * 0.12,
              ease: "power2.out",
              onUpdate: () => {
                node.textContent = fmt(counter.v);
              },
              scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
            },
          );
        });
        gsap.fromTo(
          "[data-stat-rule]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            stagger: 0.1,
            transformOrigin: "0% 50%",
            scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-stat-rule]", { scaleX: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label={copy.srLabel}
      className="relative bg-night text-white"
    >
      <div className="wrap-wide grid min-h-svh items-center gap-12 py-[clamp(4.5rem,10svh,7rem)] lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Reveal y={20}>
            <Eyebrow className="text-gold">{copy.eyebrow}</Eyebrow>
          </Reveal>

          <dl className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {copy.stats.map((s) => (
              <Reveal key={s.label} y={30} className="relative flex flex-col pt-6">
                <span
                  aria-hidden
                  data-stat-rule
                  className="absolute inset-x-0 top-0 h-px scale-x-0 bg-white/25"
                />
                <dt className="order-2 mt-3 text-base font-semibold">{s.label}</dt>
                <dd className="order-1 font-display text-[clamp(2.75rem,1.6rem+4vw,5.5rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                  {s.prefix && <span className="text-[0.5em] text-gold">{s.prefix}</span>}
                  {/* Renders the real value first; GSAP counts up from 0 on scroll */}
                  <span data-count={s.value}>{fmt(s.value)}</span>
                  {s.suffix}
                </dd>
                <dd className="order-3 mt-1 max-w-xs text-sm text-white/70">{s.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal y={50} delay={0.1}>
          <StarLoop className="h-[min(26rem,60svh)] lg:h-[min(32rem,68svh)]">
            <p className="font-display text-h2 font-medium leading-[1.1]">
              {starPanel.caption}
              <br />
              <span className="italic text-gold">{starPanel.captionAccent}</span>
            </p>
          </StarLoop>
        </Reveal>
      </div>
    </section>
  );
}
