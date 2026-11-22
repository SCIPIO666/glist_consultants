"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { contactPortrait } from "@/data/contact";

/**
 * Clip-pathed (background removed) portrait sitting on a circle.
 * The circle starts below the head so the head breaks out of the top of it.
 * Entry: circle scales up, then the person rises. Reversible-free: plays once on load.
 */
export function ContactPortrait() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-circle]", { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3 })
          .fromTo("[data-ring]", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, "<0.1")
          .fromTo("[data-person]", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "<0.25");
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-circle], [data-ring], [data-person]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto h-[26rem] w-full max-w-[34rem] sm:h-[32rem] lg:h-full lg:min-h-[38rem] lg:max-w-none">
      {/* Outer thin ring */}
      <div
        data-ring
        aria-hidden
        className="absolute left-1/2 top-[8%] aspect-square w-[92%] max-w-[34rem] -translate-x-1/2 rounded-full border border-gold/35 opacity-0"
      />
      {/* Main circle */}
      <div
        data-circle
        aria-hidden
        className="absolute left-1/2 top-[15%] aspect-square w-[80%] max-w-[30rem] -translate-x-1/2 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle at 30% 25%, #f0c65a 0%, #d9a62e 45%, #b5851a 100%)" }}
      />
      {/* Cut-out person, bottom-anchored, head breaks the circle */}
      <div data-person className="absolute bottom-0 left-1/2 h-[97%] -translate-x-1/2 opacity-0">
        <Image
          src={contactPortrait.src}
          alt={contactPortrait.alt}
          width={contactPortrait.width}
          height={contactPortrait.height}
          priority
          sizes="(min-width: 1024px) 28vw, 70vw"
          className="h-full w-auto max-w-none select-none drop-shadow-[0_24px_30px_rgba(0,21,25,0.45)]"
        />
      </div>
    </div>
  );
}
