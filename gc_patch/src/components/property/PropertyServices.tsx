"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { DashField } from "@/components/ui/DashField";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { propertyServices as copy } from "@/data/propertyServices";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Property services: fixed editorial column beside a flowing field of circular,
 * glass-finished service panels. The service field remains part of normal page
 * scrolling; each circle reveals as it enters and reverses cleanly on scroll-up.
 */
export function PropertyServices() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = copy.items.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const heading = root.current?.querySelectorAll<HTMLElement>("[data-ps=head]") ?? [];
        const cards = gsap.utils.toArray<HTMLElement>("[data-ps=card]");

        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          },
        );

        cards.forEach((card, index) => {
          const circle = card.querySelector<HTMLElement>("[data-ps=orb]");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          timeline.fromTo(
            card,
            { autoAlpha: 0, y: 58, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out" },
          );
          if (circle) {
            timeline.fromTo(
              circle,
              { scale: 0.72, rotate: -12 },
              { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" },
              0.12,
            );
          }

          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });

        gsap.fromTo(
          "[data-ps=corner]",
          { autoAlpha: 0, scale: 0.94 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.5,
            stagger: 0.18,
            ease: "expo.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );

      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-ps=head], [data-ps=card], [data-ps=orb], [data-ps=corner]", {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="ps-title"
      className="relative isolate overflow-hidden bg-night text-white"
    >
      {/* Diagonal corner details from the property-page moodboard. */}
      <div
        data-ps="corner"
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[min(66%,44rem)] w-[min(76%,54rem)] opacity-0"
      >
        <DashField focus="top-right" variant="ripple" className="size-full" />
      </div>
      <div
        data-ps="corner"
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[min(66%,44rem)] w-[min(76%,54rem)] opacity-0"
      >
        <DashField focus="bottom-left" variant="ripple" className="size-full" />
      </div>

      {/* Quiet circular geometry behind the service field. */}
      <div aria-hidden className="pointer-events-none absolute -right-[18rem] top-[22%] -z-10 size-[42rem] rounded-full border border-white/[0.07]" />
      <div aria-hidden className="pointer-events-none absolute -right-[12rem] top-[29%] -z-10 size-[30rem] rounded-full border border-gold/[0.13]" />

      <div className="wrap-wide grid min-h-svh gap-12 py-[clamp(5rem,11svh,8.5rem)] lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-12 xl:gap-20">
        {/* Editorial column stays in view while the service circles pass by. */}
        <div className="relative lg:py-12">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <p data-ps="head" className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold opacity-0">
              Rental property management
            </p>
            <h2
              data-ps="head"
              id="ps-title"
              className="max-w-[11ch] font-display text-[clamp(2.7rem,4.8vw,5.3rem)] font-medium leading-[0.98] tracking-[-0.045em] opacity-0"
            >
              {copy.title}
            </h2>
            <p data-ps="head" className="mt-7 max-w-md text-base leading-relaxed text-white/65 opacity-0 sm:text-lg">
              {copy.text}
            </p>
            <div data-ps="head" className="mt-9 flex flex-wrap items-center gap-6 opacity-0">
              <Button href={copy.cta.href} size="lg" arrow>
                {copy.cta.label}
              </Button>
              <p aria-label={`Service ${active + 1} of ${total}`} className="font-display text-2xl tabular-nums text-white/85">
                {pad(active + 1)}<span className="text-white/35"> / {pad(total)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Circular glassmorphism panels replace the previous horizontal strips. */}
        <ol className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 sm:gap-5 lg:gap-7 xl:gap-9">
          {copy.items.map((item, index) => (
            <li
              key={item.title}
              data-ps="card"
              className="group relative aspect-square w-full max-w-[22rem] opacity-0"
            >
              <div
                data-ps="orb"
                className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-full border border-white/[0.16] bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.14),rgba(255,255,255,0.045)_46%,rgba(11,58,65,0.76)_100%)] px-8 py-9 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_24px_70px_-36px_rgba(0,0,0,0.9)] backdrop-blur-xl transition duration-700 ease-out group-hover:-translate-y-2 group-hover:border-gold/65 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_34px_85px_-34px_rgba(0,0,0,0.95)]"
              >
                <span aria-hidden className="pointer-events-none absolute inset-[0.55rem] rounded-full border border-white/[0.07] transition duration-700 group-hover:inset-[0.85rem] group-hover:border-gold/25" />
                <span className="relative mb-5 flex size-12 items-center justify-center rounded-full border border-gold/55 bg-night/55 font-display text-sm text-gold shadow-[0_0_28px_rgba(217,166,46,0.12)] transition duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-night-deep">
                  {pad(index + 1)}
                </span>
                <h3 className="relative max-w-[15ch] font-display text-xl font-medium leading-tight tracking-[-0.025em] text-white sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="relative mt-3 max-w-[28ch] text-[0.82rem] leading-relaxed text-white/65 sm:text-sm">
                  {item.text}
                </p>
                <span aria-hidden className="relative mt-5 flex size-8 items-center justify-center rounded-full border border-white/20 text-white/65 transition duration-500 group-hover:translate-x-1 group-hover:border-gold group-hover:bg-gold group-hover:text-night-deep">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
