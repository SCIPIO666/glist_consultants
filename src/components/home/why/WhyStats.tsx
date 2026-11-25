"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { WaveLines } from "@/components/ui/WaveLines";
import { statsSection as copy, type Stat } from "@/data/stats";

const fmt = (n: number) => Math.round(n).toLocaleString("en-KE");
const SECONDS_PER_ROW = 6;

function StatRow({ s }: { s: Stat }) {
  return (
    <li className="flex flex-col gap-2 py-[5svh] sm:flex-row sm:items-baseline sm:gap-10 lg:gap-16">
      <span className="bg-linear-to-b from-white to-brand-soft bg-clip-text font-display sm:min-w-[1.35em] text-[clamp(4.25rem,1.5rem+11vw,12rem)] font-medium leading-[0.95] tracking-[-0.04em] text-transparent tabular-nums">
        {s.prefix && (
          <span className="text-[0.45em] text-gold [-webkit-text-fill-color:currentColor]">{s.prefix}</span>
        )}
        {fmt(s.value)}
        {s.suffix}
      </span>
      <span className="max-w-sm">
        <span className="block text-[clamp(1.25rem,1rem+0.9vw,1.875rem)] font-semibold leading-tight">{s.label}</span>
        <span className="mt-1 block text-sm text-white/70 sm:text-base">{s.note}</span>
      </span>
    </li>
  );
}

/**
 * Why us, part 2 of 3: a full-height "end credits" screen.
 *
 *  - Section carries the specified inset shadow, over a deep teal-to-night gradient.
 *  - A fine wavy-lines pattern fills the background, with a soft blue glow.
 *  - Big numbers, each with its label, roll upward forever on autoplay, fading
 *    in and out at the top and bottom. The list is rendered twice and slides up by
 *    exactly half its height, so the loop has no seam.
 *  - Pauses while off-screen. Reduced motion: a plain static list.
 */
export function WhyStats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const track = el.querySelector<HTMLElement>("[data-credits-track]");
        if (!track) return;
        const roll = gsap.to(track, {
          yPercent: -50,
          duration: copy.stats.length * SECONDS_PER_ROW,
          ease: "none",
          repeat: -1,
        });
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? roll.play() : roll.pause()),
        });
        return () => st.kill();
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label={copy.srLabel}
      className="relative isolate h-[40svh] min-h-[34rem] overflow-hidden bg-[radial-gradient(130%_100%_at_50%_0%,#0b3a41_0%,#002025_55%,#001519_100%)] text-white shadow-[rgba(50,50,93,0.25)_0px_30px_60px_-12px_inset,rgba(0,0,0,0.3)_0px_18px_36px_-18px_inset] motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:py-24"
    >
      {/* Blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-[26rem] rounded-full bg-brand/25 blur-3xl lg:size-[40rem]"
      />
      {/* Wavy lines, faded top and bottom */}
      <WaveLines className="absolute inset-0 -z-10 text-brand-soft/30 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]" />

      {/* The credits window */}
      <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)] motion-reduce:static motion-reduce:overflow-visible motion-reduce:[mask-image:none]">
        <div className="wrap-wide">
          <div data-credits-track>
            {[0, 1].map((copyIndex) => (
              <ul
                key={copyIndex}
                role={copyIndex === 0 ? "list" : undefined}
                aria-hidden={copyIndex === 1 ? true : undefined}
                className={copyIndex === 1 ? "py-[10svh] motion-reduce:hidden" : "py-[10svh]"}
              >
                {copy.stats.map((s) => (
                  <StatRow key={s.label} s={s} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
