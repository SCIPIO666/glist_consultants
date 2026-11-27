"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { servicesHero as copy } from "@/data/servicesPage";

/**
 * Services hero: the home hero's semicircle bowl with a photo, but no coin loop and no
 * ticker, and only a title, one line and one button.
 * `@container` lets the bowl size itself from the real page width (cqw).
 */
export function ServicesHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-sh=photo]", { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power2.out" }, 0).fromTo(
          "[data-sh=item]",
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
          0.15,
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-sh=item]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="services-hero-title" className="@container relative overflow-hidden bg-paper">
      <div className="relative left-1/2 w-[165cqw] -translate-x-1/2 sm:w-[140cqw] lg:w-[122cqw]">
        <div className="relative flex min-h-[clamp(28rem,68svh,44rem)] flex-col items-center justify-center overflow-hidden rounded-b-[50%_100%] bg-night pt-[clamp(7rem,16svh,10rem)] pb-[clamp(5rem,12svh,8rem)]">
          <div className="absolute inset-0">
            <Image
              data-sh="photo"
              src={copy.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 122vw, (min-width: 640px) 140vw, 165vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-night-deep/80 via-night/70 to-night/85" />
          <div className="pointer-events-none absolute inset-x-5 top-0 bottom-5 rounded-b-[50%_100%] border-x border-b border-kra-light/25" />

          <div className="relative flex w-[min(100cqw,50rem)] flex-col items-center px-6 text-center text-white">
            <h1 data-sh="item" className="text-display opacity-0">
              {copy.title}
            </h1>
            <p data-sh="item" className="mt-5 max-w-xl text-lead text-white/80 opacity-0">
              {copy.lead}
            </p>
            <div data-sh="item" className="mt-8 opacity-0">
              <Button href={copy.cta.href} size="lg" arrow>
                {copy.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[clamp(1.5rem,5vw,4rem)]" />
    </section>
  );
}
