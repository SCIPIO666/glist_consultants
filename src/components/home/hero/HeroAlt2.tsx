"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Magnetic } from "@/components/motion/Magnetic";
import { Coin } from "@/components/ui/Coin";
import { heroAlt2 } from "@/data/hero";
import { HeroCopy } from "./HeroCopy";
import { HeroTicker } from "./HeroTicker";

/** Where each circle sits inside the square stage (percent of stage width). */
const side = [
  { cls: "left-0 top-[3%] w-[36%]", float: 14 },
  { cls: "left-[7%] bottom-[2%] w-[31%]", float: 10 },
  { cls: "right-[10%] -top-[3%] w-[24%]", float: 12 },
] as const;

/**
 * HERO, Alt 2. Text left, one big circle on the right with smaller ones tucked
 * behind it and peeking out. Circles drift gently and lean toward the cursor.
 */
export function HeroAlt2() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-hero=item]", { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.11 }, 0.1)
          .fromTo(
            "[data-hero=circle]",
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 1.4, ease: "back.out(1.5)", stagger: 0.14 },
            0.2,
          )
          .fromTo("[data-hero=ticker]", { opacity: 0 }, { opacity: 1, duration: 1 }, 1);

        // Slow bob, each circle on its own rhythm. Separate wrapper from the entrance scale.
        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
          gsap.to(el, {
            y: Number(el.dataset.float) * (i % 2 ? -1 : 1),
            duration: 3.2 + i * 0.7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-hero]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="@container relative isolate overflow-hidden bg-night text-white" aria-label="Introduction">
      {/* backdrop: soft brand glow + big rings */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] top-1/2 size-[70rem] -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -right-[22%] top-1/2 size-[64rem] -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute -right-[12%] top-1/2 size-[48rem] -translate-y-1/2 rounded-full border border-white/5" />
      </div>

      <div className="wrap-wide grid min-h-[clamp(40rem,92svh,56rem)] items-center gap-12 pt-36 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-32">
        <HeroCopy align="left" size="h1" />

        {/* Circle stage */}
        <div className="relative mx-auto aspect-square w-[min(88cqw,30rem)] lg:ml-auto lg:w-full lg:max-w-[40rem]">
          {side.map((s, i) => (
            <div key={heroAlt2.side[i].src} data-hero="circle" className={`absolute z-10 opacity-0 ${s.cls}`}>
              <div data-float={s.float}>
                <Magnetic strength={0.22}>
                  <Coin
                    shape="circle"
                    depth={10}
                    src={heroAlt2.side[i].src}
                    alt={heroAlt2.side[i].alt}
                    position={heroAlt2.side[i].position}
                    sizes="(min-width: 1024px) 14rem, 30vw"
                    className="w-full"
                  />
                </Magnetic>
              </div>
            </div>
          ))}

          <div data-hero="circle" className="absolute right-0 top-[12%] z-20 w-[70%] opacity-0">
            <div data-float="8">
              <Magnetic strength={0.12}>
                <Coin
                  shape="circle"
                  depth={16}
                  src={heroAlt2.main.src}
                  alt={heroAlt2.main.alt}
                  position={heroAlt2.main.position}
                  sizes="(min-width: 1024px) 28rem, 62vw"
                  className="w-full"
                  priority
                />
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div data-hero="ticker" className="opacity-0">
        <HeroTicker tone="dark" direction="left" />
      </div>
    </section>
  );
}
