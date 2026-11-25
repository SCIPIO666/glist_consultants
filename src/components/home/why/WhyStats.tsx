"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { statsSection as copy, type Stat } from "@/data/stats";

const fmt = (n: number) => Math.round(n).toLocaleString("en-KE");
const SECONDS_PER_STAT = 6;

/** Wavy vertical lines, tiled. One tile is a single sine-shaped line; the pattern repeats it sideways and down. */
function LineGraphPattern() {
  return (
    <svg aria-hidden className="absolute inset-0 size-full text-brand-soft [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]">
      <defs>
        <pattern id="gc-stat-waves" width="9" height="140" patternUnits="userSpaceOnUse">
          <path
            d="M4.5 0 C 9 24, 9 46, 4.5 70 S 0 116, 4.5 140"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gc-stat-waves)" />
    </svg>
  );
}

function StatRow({ stat }: { stat: Stat }) {
  return (
    <div className="flex h-[clamp(10rem,32svh,17rem)] items-center gap-6 sm:gap-10 flat:h-auto flat:py-10">
      <p className="shrink-0 font-display text-[clamp(4rem,min(17vw,25svh),11.5rem)] font-light leading-none tracking-[-0.04em] tabular-nums">
        {stat.prefix && <span className="mr-2 text-[0.38em] tracking-normal text-gold">{stat.prefix}</span>}
        <span className="bg-gradient-to-b from-white via-brand-soft to-brand bg-clip-text text-transparent">
          {fmt(stat.value)}
        </span>
        {stat.suffix && <span className="text-white">{stat.suffix}</span>}
      </p>
      <div className="min-w-0 max-w-[16rem]">
        <p className="text-[clamp(1.05rem,0.9rem+0.8vw,1.5rem)] font-semibold leading-tight text-white">{stat.label}</p>
        <p className="mt-2 hidden text-sm text-white/65 sm:block">{stat.note}</p>
      </div>
    </div>
  );
}

/**
 * Why us, part 2 of 3: a full-height night screen with an inset shadow, a wavy line-graph
 * pattern, and the stats as huge numbers scrolling upward on a loop, like movie credits.
 * The list is rendered twice and shifted by exactly half, so the loop has no seam; it pauses
 * while off-screen. Reduced motion: no loop, the stats simply stack.
 */
export function WhyStats() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !track.current) return;
      const mm = gsap.matchMedia();
      mm.add(mq.pin, () => {
        const loop = gsap.fromTo(
          track.current,
          { yPercent: 0 },
          { yPercent: -50, duration: SECONDS_PER_STAT * copy.stats.length, ease: "none", repeat: -1 },
        );
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
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
      className="relative isolate overflow-hidden bg-night text-white"
    >
      {/* depth: a soft lighter wash under the lines */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,#0B3A41_0%,#002025_55%,#001519_100%)]"
      />
      <LineGraphPattern />

      {/* The credits window */}
      <div className="wrap-wide relative">
        {/* Screen readers get the list once, plainly */}
        <ul className="sr-only">
          {copy.stats.map((s) => (
            <li key={s.label}>
              {s.prefix}
              {fmt(s.value)}
              {s.suffix} {s.label}. {s.note}
            </li>
          ))}
        </ul>

        <div
          aria-hidden
          className={cn(
            "relative h-svh overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)]",
            "flat:h-auto flat:overflow-visible flat:py-20 flat:[mask-image:none]",
          )}
        >
          <div ref={track} className="will-change-transform">
            {copy.stats.map((s) => (
              <StatRow key={`a-${s.label}`} stat={s} />
            ))}
            <div className="flat:hidden">
              {copy.stats.map((s) => (
                <StatRow key={`b-${s.label}`} stat={s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The inset shadow, drawn above everything so it frames the whole screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        }}
      />
    </section>
  );
}
