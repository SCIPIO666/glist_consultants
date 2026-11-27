"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { Coin } from "@/components/ui/Coin";
import { heroAlt1 } from "@/data/hero";
import { HeroCopy } from "./HeroCopy";
import { HeroTicker } from "./HeroTicker";

/**
 * HERO, Alt 1 (default).
 *   1. A big semicircle bowl with a photo behind the title + CTA
 *   2. A loop of five photo "coins" drifting left (magnetic on hover)
 *   3. A text loop drifting the opposite way
 *
 * `@container` on the section lets the bowl size itself from the real page width
 * (cqw) instead of 100vw, which would include the scrollbar.
 */
export function HeroAlt1() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-hero=photo]", { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power2.out" }, 0)
          .fromTo("[data-hero=item]", { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.11 }, 0.15)
          .fromTo("[data-hero=coins]", { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 1.4 }, 0.55)
          .fromTo("[data-hero=ticker]", { opacity: 0 }, { opacity: 1, duration: 1 }, 1);
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-hero]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="@container relative overflow-hidden bg-paper" aria-label="Introduction">
      {/* ---- Semicircle ---- */}
      <div className="relative left-1/2 w-[165cqw] -translate-x-1/2 sm:w-[140cqw] lg:w-[122cqw]">
        <div className="relative flex min-h-[clamp(36rem,80svh,56rem)] flex-col items-center justify-center overflow-hidden rounded-b-[50%_100%] bg-night pt-[clamp(8rem,18svh,11rem)] pb-[clamp(5rem,12svh,9rem)]">
          <div className="absolute inset-0">
            <Image
              data-hero="photo"
              src={heroAlt1.background}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 122vw, (min-width: 640px) 140vw, 165vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-night-deep/80 via-night/70 to-night/85" />
          {/* thin inner arc */}
          <div className="pointer-events-none absolute inset-x-5 top-0 bottom-5 rounded-b-[50%_100%] border-x border-b border-kra-light/25" />

          <div className="relative w-[min(100cqw,58rem)] px-6">
            <HeroCopy align="center" size="display" />
          </div>
        </div>
      </div>

      {/* ---- Coins ---- */}
      <div data-hero="coins" className="relative z-10 -mt-[clamp(1.5rem,5vw,4.5rem)] opacity-0">
        <Marquee direction="left" speed={38} repeat={1} className="pt-8 pb-10">
          {heroAlt1.coins.map((coin, i) => (
            <Magnetic key={coin.src} className="px-3 lg:px-4" strength={0.3}>
              <Coin
                src={coin.src}
                alt={coin.alt}
                position={coin.position}
                depth={14}
                className="w-[clamp(14rem,24vw,26rem)]"
                sizes="(min-width: 1024px) 26rem, 60vw"
                priority={i < 3}
              />
            </Magnetic>
          ))}
        </Marquee>
      </div>

      {/* ---- Text loop, opposite direction ---- */}
      <div data-hero="ticker" className="opacity-0">
        <HeroTicker tone="light" direction="left" />
      </div>
    </section>
  );
}
