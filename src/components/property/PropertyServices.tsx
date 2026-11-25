"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { DashField } from "@/components/ui/DashField";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { propertyServices as copy } from "@/data/propertyServices";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * PROPERTY SERVICES LISTING (section 3). Dark, full screen and taller. No circle band.
 *
 * - Corner patterns: dash ripples top-right and bottom-left (the Qventus idea, in our dashes).
 * - Left column is fixed (sticky on desktop): title, short text, CTA, and a live "03 / 08" counter.
 * - Right column scrolls: glass rows, each led by a numbered circle. Rows slide in from the
 *   right as they arrive (reversible). The row nearest the middle of the screen lights up
 *   (gold ring, filled circle) and drives the counter.
 * - Hover: row lifts and shifts, circle fills gold, arrow circle appears.
 *
 * Phones: no sticky; title first, then the list.
 */
export function PropertyServices() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = copy.items.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-ps=row]");

        gsap.fromTo(
          "[data-ps=head]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 70%", toggleActions: "play none none reverse" } },
        );

        rows.forEach((row, i) => {
          // Entry: slide in from the right, circle pops
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" },
          });
          tl.fromTo(row, { opacity: 0, x: 90 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out" }, 0);
          tl.fromTo(row.querySelector("[data-ps=disc]"), { scale: 0 }, { scale: 1, duration: 0.8, ease: "back.out(2.4)" }, 0.15);

          // Active row: the one crossing the middle of the viewport
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });

        // Corner patterns breathe in
        gsap.fromTo(
          "[data-ps=corner]",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "expo.out", stagger: 0.2, scrollTrigger: { trigger: root.current, start: "top 75%", toggleActions: "play none none reverse" } },
        );
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-ps=head], [data-ps=row], [data-ps=disc], [data-ps=corner]", { opacity: 1, x: 0, y: 0, scale: 1 });
      });
    },
    { scope: root },
  );

  return (
    <>

      <section ref={root} aria-labelledby="ps-title" className="relative isolate overflow-hidden bg-night text-white">
        {/* Corner patterns: top right + bottom left */}
        <div data-ps="corner" aria-hidden className="pointer-events-none absolute right-0 top-0 -z-10 h-[min(70%,46rem)] w-[min(80%,52rem)] opacity-0">
          <DashField focus="top-right" variant="ripple" className="size-full" />
        </div>
        <div data-ps="corner" aria-hidden className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[min(70%,46rem)] w-[min(80%,52rem)] opacity-0">
          <DashField focus="bottom-left" variant="ripple" className="size-full" />
        </div>
        {/* A faint circle behind the list */}
        <div aria-hidden className="pointer-events-none absolute -right-[18%] top-[28%] -z-10 aspect-square w-[clamp(20rem,50vw,44rem)] rounded-full border border-white/[0.06]" />

        <div className="wrap-wide grid min-h-svh gap-12 py-[clamp(4.5rem,11svh,8rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* LEFT: fixed on desktop */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <h2 data-ps="head" id="ps-title" className="max-w-[14ch] text-h1 font-medium opacity-0">
                {copy.title}
              </h2>
              <p data-ps="head" className="mt-6 max-w-md text-lead text-white/70 opacity-0">
                {copy.text}
              </p>
              <div data-ps="head" className="mt-9 flex flex-wrap items-center gap-6 opacity-0">
                <Button href={copy.cta.href} size="lg" arrow>
                  {copy.cta.label}
                </Button>
                <p aria-hidden className="hidden font-display text-3xl font-medium tabular-nums text-white/90 lg:block">
                  {pad(active + 1)}
                  <span className="text-white/35"> / {pad(total)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: scrolling glass rows */}
          <ol className="flex flex-col gap-4 sm:gap-5 lg:pt-6">
            {copy.items.map((it, i) => (
              <li
                key={it.title}
                data-ps="row"
                data-active={i === active ? "true" : "false"}
                className="group relative flex items-center gap-4 rounded-[2.25rem] border border-white/15 bg-white/[0.06] p-4 pr-6 opacity-0 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.7)] backdrop-blur-md transition-[border-color,background-color,translate] duration-500 ease-out-expo hover:-translate-x-1.5 hover:border-gold/70 hover:bg-white/[0.1] data-[active=true]:border-gold/60 data-[active=true]:bg-white/[0.09] sm:gap-6 sm:p-5 sm:pr-8 lg:min-h-[7.5rem]"
              >
                <span
                  data-ps="disc"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/70 font-display text-lg font-medium text-gold transition-[background-color,color,scale] duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-gold group-hover:text-night-deep group-data-[active=true]:bg-gold group-data-[active=true]:text-night-deep sm:size-16 sm:text-xl"
                >
                  {pad(i + 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold leading-snug sm:text-xl">{it.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/65">{it.text}</p>
                </div>
                <span
                  aria-hidden
                  className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/70 transition-[background-color,color,translate] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:border-gold group-hover:bg-gold group-hover:text-night-deep sm:flex"
                >
                  <ArrowRight className="size-4" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
