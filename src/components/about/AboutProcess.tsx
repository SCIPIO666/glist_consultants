"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { aboutProcess as copy } from "@/data/aboutProcess";

/**
 * About, last section: "How we work" (insur-128 style). Title, lead and a tinted
 * photo on the left (pinned on desktop); numbered steps on the right, joined by
 * a dashed line that fills with gold as you scroll (reversible).
 */
export function AboutProcess() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 70%", scrub: true },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set(fill.current, { scaleY: 1 });
      });
    },
    { scope: list },
  );

  return (
    <section id="process" aria-labelledby="process-title" className="relative border-t border-white/10 bg-night-deep text-white">
      <div className="wrap-wide grid gap-14 py-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-2 lg:gap-24">
        {/* Left: pinned on desktop */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <Reveal y={40}>
            <h2 id="process-title" className="text-[clamp(2.25rem,1.4rem+3vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-white/80">{copy.lead}</p>
          </Reveal>
          <Reveal y={50} delay={0.15} className="mt-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-night-card">
              <Image
                src={copy.image.src}
                alt={copy.image.alt}
                fill
                sizes="(min-width: 1024px) 36rem, 92vw"
                quality={70}
                className="object-cover grayscale"
              />
              {/* Brand tint over the grayscale photo */}
              <div aria-hidden className="absolute inset-0 bg-brand/55 mix-blend-color" />
              <div aria-hidden className="absolute inset-0 bg-night/35" />
            </div>
          </Reveal>
        </div>

        {/* Right: steps on a dotted-then-gold spine */}
        <ol ref={list} className="relative flex flex-col gap-[clamp(4rem,10vw,8rem)]">
          {/* spine, centred under the number circles */}
          <span aria-hidden className="absolute bottom-6 right-[1.75rem] top-6 w-0 border-l-2 border-dashed border-white/25" />
          <span
            ref={fill}
            aria-hidden
            className="absolute bottom-6 right-[1.75rem] top-6 w-0.5 origin-top scale-y-0 bg-kra-light"
          />
          {copy.steps.map((s, i) => (
            <li key={s.heading} className="relative grid grid-cols-[1fr_3.5rem] items-start gap-6 sm:gap-10">
              <Reveal y={40} start="top 88%">
                <h3 className="text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-tight">{s.heading}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-white/85 sm:text-lg">{s.text}</p>
              </Reveal>
              <span
                aria-hidden
                className="relative z-10 grid size-14 place-items-center rounded-full bg-kra font-display text-2xl font-medium text-white"
              >
                {i + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
