"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { PulseRings } from "@/components/motion/PulseRings";
import { aboutHero as copy, type AboutHeroIcon } from "@/data/aboutHero";

/** Small line icons in the accent colour (stroke follows currentColor). */
function GroupIcon({ name }: { name: AboutHeroIcon }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0 text-gold">
      {name === "tax" && (
        <g {...p}>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M15 3v4h4M9 12h7M9 16h5" />
        </g>
      )}
      {name === "books" && (
        <g {...p}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0" />
        </g>
      )}
      {name === "advice" && (
        <g {...p}>
          <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
        </g>
      )}
      {name === "property" && (
        <g {...p}>
          <path d="M3 11 12 3l9 8M5 10v11h14V10M10 21v-6h4v6" />
        </g>
      )}
    </svg>
  );
}

/**
 * About hero. Layout after futurecomes: a gold number tile, a dotted connector,
 * and four grouped services hanging off a dotted spine. Background: two sets of
 * pulsing circle waves. On top: a soft circle that follows the mouse and reveals
 * a photo with parallax (periscope). Touch screens get the circle drifting by
 * itself; reduced-motion users get it parked at the right.
 */
export function AboutHero() {
  const root = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const lay = layer.current;
      const pic = img.current;
      if (!el || !lay || !pic) return;
      const mm = gsap.matchMedia();

      const state = { x: 0, y: 0, r: 0 };
      const apply = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        lay.style.setProperty("--mx", `${state.x}px`);
        lay.style.setProperty("--my", `${state.y}px`);
        lay.style.setProperty("--r", `${state.r}px`);
        gsap.set(pic, { x: -(state.x - w / 2) * 0.05, y: -(state.y - h / 2) * 0.05 });
      };
      const radius = () => Math.max(150, Math.min(el.clientWidth, el.clientHeight) * 0.34);

      // Mouse: follow the pointer
      mm.add(`${mq.motionOk} and (hover: hover) and (pointer: fine)`, () => {
        state.x = el.clientWidth * 0.66;
        state.y = el.clientHeight * 0.5;
        apply();
        const move = (e: PointerEvent) => {
          const b = el.getBoundingClientRect();
          gsap.to(state, {
            x: e.clientX - b.left,
            y: e.clientY - b.top,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
            onUpdate: apply,
          });
        };
        const enter = () => gsap.to(state, { r: radius(), duration: 0.8, ease: "expo.out", onUpdate: apply });
        const leave = () => gsap.to(state, { r: 0, duration: 0.8, ease: "expo.inOut", onUpdate: apply });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
          state.r = 0;
          apply();
        };
      });

      // Touch: no cursor, so the circle drifts on its own
      mm.add(`${mq.motionOk} and (hover: none)`, () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        state.x = w * 0.3;
        state.y = h * 0.4;
        state.r = radius() * 0.8;
        apply();
        const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 6, ease: "sine.inOut", onUpdate: apply } });
        tl.to(state, { x: w * 0.7, y: h * 0.6 }).to(state, { x: w * 0.4, y: h * 0.75 }).to(state, { x: w * 0.7, y: h * 0.3 });
        return () => {
          tl.kill();
          state.r = 0;
          apply();
        };
      });

      // Reduced motion: a still circle on the right
      mm.add(mq.reduced, () => {
        state.x = el.clientWidth * 0.72;
        state.y = el.clientHeight * 0.5;
        state.r = radius() * 0.8;
        apply();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="about-title" className="relative isolate overflow-hidden bg-night text-white">
      {/* Pulsing circle waves */}
      <PulseRings
        className="text-brand-soft"
        centers={[
          { x: "6%", y: "48%", size: "52rem" },
          { x: "96%", y: "58%", size: "46rem", delay: 3 },
        ]}
      />

      {/* Cursor reveal: photo seen through a soft circle that follows the mouse */}
      <div
        ref={layer}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] [--r:0px] [--mx:70%] [--my:50%] [-webkit-mask-image:radial-gradient(circle_var(--r)_at_var(--mx)_var(--my),#000_55%,transparent_100%)] [mask-image:radial-gradient(circle_var(--r)_at_var(--mx)_var(--my),#000_55%,transparent_100%)]"
      >
        <div ref={img} className="absolute -inset-[6%] will-change-transform">
          <Image src={copy.revealImage.src} alt="" fill sizes="100vw" quality={70} className="object-cover" />
          <div className="absolute inset-0 bg-night/55" />
        </div>
      </div>

      <div className="wrap-wide relative z-10 flex min-h-svh flex-col justify-center py-[calc(var(--header-h)+3rem)]">
        <h1 id="about-title" className="sr-only">
          {copy.h1}
        </h1>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-0">
          {/* Left: number tile + words */}
          <div className="shrink-0">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="grid size-[clamp(9.5rem,7rem+9vw,15rem)] place-items-center bg-gold text-night-deep shadow-lift">
                <span className="font-display text-[clamp(6rem,4rem+8vw,11rem)] font-medium leading-none">{copy.number}</span>
              </div>
              <p className="pb-2 font-display text-[clamp(1.5rem,1rem+2vw,2.75rem)] leading-none">
                {copy.numberLabel} <span className="ml-2 text-white/70">{copy.connector}</span>
              </p>
            </div>
            <p className="mt-6 text-lg font-semibold leading-snug sm:text-xl">
              {copy.caption[0]}
              <br />
              <span className="text-white">{copy.caption[1]}</span>
              <br />
              <span className="text-gold">{copy.caption[2]}</span>
            </p>
          </div>

          {/* Dotted connector (desktop) */}
          <span aria-hidden className="mx-6 hidden h-0 flex-1 border-t-2 border-dotted border-white/35 lg:block xl:mx-10" />

          {/* Right: dotted spine with four groups */}
          <ul className="flex flex-col gap-9 border-l-2 border-dotted border-white/35 pl-6 sm:pl-8 lg:w-[min(34rem,42%)] lg:shrink-0">
            {copy.groups.map((g) => (
              <li key={g.title} className="relative">
                <span aria-hidden className="absolute -left-6 top-4 w-5 border-t-2 border-dotted border-white/35 sm:-left-8 sm:w-7" />
                <div className="flex items-center gap-3">
                  <GroupIcon name={g.icon} />
                  <h2 className="text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-semibold leading-none tracking-[-0.01em]">
                    {g.title}
                  </h2>
                </div>
                <p className="mt-2 pl-10 text-base text-gold">{g.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
