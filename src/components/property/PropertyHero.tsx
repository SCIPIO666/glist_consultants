"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { propertyHero as copy } from "@/data/propertyManagement";

/**
 * Waypoints for the background circle, as fractions of the hero's width / height,
 * measured FROM ITS RESTING SPOT (bottom-left, so 0,0 = settled).
 * It enters top-left, cuts diagonally to the right, zig-zags, then drops home.
 */
const PATH: ReadonlyArray<readonly [number, number]> = [
  [0.82, -0.3], // long diagonal to the right
  [0.48, -0.72], // zig back up-left
  [0.92, -0.46], // zag right
  [0.56, -0.14], // down-left
  [0.3, -0.36], // small hop
];

/**
 * PROPERTY HERO. Dark page-top (so the transparent header stays readable).
 * Left: stacked title, rule, note + CTA. Right: a big framed circle, a smaller circle with
 * a gold dot, and a quiet read-more link. Behind it all a soft circle zig-zags across on
 * mount and settles bottom-left.
 */
export function PropertyHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const W = () => el.clientWidth;
        const H = () => el.clientHeight;

        // Copy steps in line by line
        gsap.fromTo("[data-ph=line]", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.15 });
        gsap.fromTo("[data-ph=item]", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.7 });
        gsap.fromTo("[data-ph=rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power3.inOut", delay: 0.6 });

        // Circles arrive
        gsap.fromTo("[data-ph=main]", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out", delay: 0.3 });
        gsap.fromTo("[data-ph=side]", { opacity: 0, scale: 0.55, y: -30 }, { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "back.out(1.6)", delay: 0.55 });
        gsap.fromTo("[data-ph=dot]", { scale: 0 }, { scale: 1, duration: 0.7, ease: "back.out(3)", delay: 1.4 });
        gsap.to("[data-ph=main]", { y: 8, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
        gsap.to("[data-ph=side]", { y: -12, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });

        // The wandering background circle: starts top-left, then PATH, then settles at 0,0
        const orb = "[data-ph=orb]";
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(orb, { x: () => W() * 0.04, y: () => -H() * 0.9, opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.out" }, 0);
        PATH.forEach(([fx, fy], i) => {
          tl.to(orb, { x: () => W() * fx, y: () => H() * fy, duration: i === 0 ? 1.5 : 1, ease: "power2.inOut" }, i === 0 ? 0 : ">");
        });
        tl.to(orb, { x: 0, y: 0, duration: 1.4, ease: "back.out(1.3)" }, ">");
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-ph=line]", { yPercent: 0 });
        gsap.set("[data-ph=item], [data-ph=main], [data-ph=side], [data-ph=orb]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="property-title" className="relative isolate overflow-hidden bg-night text-white">
      {/* Background circle: its CSS position is where it settles (bottom-left) */}
    <div
      data-ph="orb"
      aria-hidden
      className="pointer-events-none absolute -bottom-[16%] -left-[7%] -z-10 aspect-square w-[clamp(15rem,32vw,30rem)] rounded-full border border-white/25 opacity-0"
      style={{ background: "radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.22) 52%, rgb(0 32 37 / 0) 74%)" }}
    />

      <div className="wrap-wide relative grid min-h-[clamp(36rem,100svh,58rem)] items-center gap-10 pt-[calc(var(--header-h)+2.5rem)] pb-14 lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:pb-16">
        {/* Copy */}
        <div className="relative z-20 lg:max-w-[40rem]">
          <h1 id="property-title" className="font-display font-medium leading-[1.02] tracking-[-0.03em] text-[clamp(2.6rem,1.1rem+4.3vw,5rem)]">
            {copy.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-ph="line" className="block">{line}</span>
              </span>
            ))}
          </h1>

          <div data-ph="rule" aria-hidden className="mt-9 h-px w-full origin-left bg-white/35 lg:mt-12" />

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p data-ph="item" className="text-lead font-medium text-white opacity-0">{copy.note}</p>
            <div data-ph="item" className="opacity-0">
              <Button href={copy.cta.href} variant="cta" size="lg" arrow>{copy.cta.label}</Button>
            </div>
          </div>
        </div>

        {/* Circle stage */}
        <div className="relative mx-auto aspect-[1/1] w-[min(94%,32rem)] sm:aspect-[1.2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:aspect-auto lg:w-[64%]">
          {/* Main framed circle */}
          <div className="absolute left-0 top-1/2 w-[62%] -translate-y-1/2 lg:left-[2%] lg:w-[min(60%,30rem)]">
            <div data-ph="main" className="opacity-0">
              <Magnetic strength={0.1}>
                <div className="relative aspect-square rounded-full bg-white/15 p-[clamp(0.4rem,1vw,0.75rem)] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.75)]">
                  <div className="relative size-full overflow-hidden rounded-full ring-1 ring-night-deep/40">
                    <Image
                      src={copy.main.src}
                      alt={copy.main.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 28rem, 60vw"
                      className="object-cover"
                      style={{ objectPosition: copy.main.position }}
                    />
                  </div>
                </div>
              </Magnetic>
            </div>
          </div>

          {/* Smaller circle with the gold dot */}
          <div className="absolute right-0 top-[2%] w-[34%] lg:right-[4%] lg:top-[10%] lg:w-[min(27%,15rem)]">
            <div data-ph="side" className="relative opacity-0">
              <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_40px_70px_-25px_rgb(0_0_0/0.7)]">
                <Image
                  src={copy.side.src}
                  alt={copy.side.alt}
                  fill
                  sizes="(min-width: 1024px) 15rem, 34vw"
                  className="object-cover"
                  style={{ objectPosition: copy.side.position }}
                />
              </div>
              <span data-ph="dot" aria-hidden className="absolute -left-1 top-[4%] size-[18%] rounded-full bg-gold" />
            </div>
          </div>

        </div>
        {/* Quiet link: below the circles on phones, bottom-right on desktop */}
        <div data-ph="item" className="relative z-20 max-w-[16rem] opacity-0 max-lg:mx-auto max-lg:text-center lg:absolute lg:bottom-[12%] lg:right-[3%]">
          <p className="font-display text-xl font-medium leading-snug lg:text-2xl">{copy.more.title}</p>
          <Link
            href={copy.more.href}
            className="mt-3 inline-block border-b border-white/70 pb-0.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:border-gold hover:text-gold"
          >
            {copy.more.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
