"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { QuoteMark } from "@/components/ui/QuoteMark";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/cn";
import { propertyReviews as copy, propertyReviewsAreSamples } from "@/data/propertyReviews";

/** Seconds each review stays up. The ring around the active circle fills over this time. */
const DWELL = 6.5;

const Star = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" className={cn("size-4 fill-gold", className)}>
    <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z" />
  </svg>
);

/**
 * PROPERTY REVIEWS (section 5). Full screen, dark. Centred text surrounded by four profile
 * CIRCLES (the Endsleigh idea), never rectangles.
 *
 * - Centre: eyebrow, heading, one review at a time (crossfades), person, stars, CTA.
 * - Around it: four photo circles at different sizes, plus slow counter-rotating dashed rings
 *   and a few loose dots. Circles drift gently and lean toward the cursor (Magnetic).
 * - The active circle wears a gold ring that fills over DWELL seconds; when it completes the next
 *   review takes over. Hover/focus pauses it; it also pauses off-screen. Click a circle to jump.
 * - Entry (scroll-triggered, reversible): circles fly out from the centre, rings expand, text rises.
 * - Phones: circles become a row of four under the heading, text below. Reduced motion: no autoplay.
 */
export function PropertyReviews() {
  const root = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const hold = useRef({ hover: false, inView: false });
  const [active, setActive] = useState(0);
  const n = copy.items.length;

  const sync = () => {
    const t = tween.current;
    if (!t) return;
    if (hold.current.hover || !hold.current.inView) t.pause();
    else t.resume();
  };

  // Entry + idle drift (runs once)
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const st = { trigger: el, start: "top 65%", toggleActions: "play none none reverse" } as const;
        const fromCentre = (axis: "x" | "y") => (_i: number, t: HTMLElement) => {
          const wide = window.matchMedia("(min-width: 1024px)").matches;
          if (!wide) return axis === "y" ? 40 : 0;
          const px = Number(t.dataset[axis === "x" ? "px" : "py"]);
          return (50 - px) * 0.01 * (axis === "x" ? el.clientWidth : el.clientHeight);
        };

        gsap.fromTo("[data-pr=av]", { opacity: 0, scale: 0.2, x: fromCentre("x"), y: fromCentre("y") }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 1.6, ease: "expo.out", stagger: 0.12, scrollTrigger: st });
        gsap.fromTo("[data-pr=ring]", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 2, ease: "expo.out", stagger: 0.2, scrollTrigger: st });
        gsap.fromTo("[data-pr=dot]", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(3)", stagger: 0.07, delay: 0.5, scrollTrigger: st });
        gsap.fromTo("[data-pr=copy]", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.2, scrollTrigger: st });

        // Slow opposite rotation of the two big rings
        gsap.to("[data-pr=spin][data-dir=cw]", { rotate: 360, duration: 140, ease: "none", repeat: -1 });
        gsap.to("[data-pr=spin][data-dir=ccw]", { rotate: -360, duration: 190, ease: "none", repeat: -1 });

        // Idle drift, each circle on its own beat
        gsap.utils.toArray<HTMLElement>("[data-pr=drift]").forEach((d, i) => {
          gsap.to(d, { y: i % 2 ? 12 : -12, x: i % 2 ? -6 : 6, duration: 3.4 + i * 0.7, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 });
        });
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-pr=av], [data-pr=ring], [data-pr=dot], [data-pr=copy]", { opacity: 1, x: 0, y: 0, scale: 1 });
      });
    },
    { scope: root },
  );

  // Pause when off-screen
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        end: "bottom 30%",
        onToggle: (self) => {
          hold.current.inView = self.isActive;
          sync();
        },
      });
    },
    { scope: root },
  );

  // The gold ring fill drives autoplay
  useGSAP(
    () => {
      const rings = gsap.utils.toArray<SVGCircleElement>("[data-pr=fill]");
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.set(rings, { strokeDashoffset: 1 });
        tween.current = gsap.to(rings[active], {
          strokeDashoffset: 0,
          duration: DWELL,
          ease: "none",
          onComplete: () => setActive((a) => (a + 1) % n),
        });
        sync();
        return () => {
          tween.current = null;
        };
      });
      mm.add(mq.reduced, () => {
        gsap.set(rings, { strokeDashoffset: 1 });
        gsap.set(rings[active], { strokeDashoffset: 0 });
      });
    },
    { scope: root, dependencies: [active] },
  );

  const pause = (on: boolean) => {
    hold.current.hover = on;
    sync();
  };

  return (
    <section
      ref={root}
      aria-labelledby="prv-title"
      className="relative isolate overflow-hidden bg-night text-white"
    >
      {/* Glows in the brand family */}
      <div aria-hidden className="pointer-events-none absolute -left-[12%] -top-[18%] -z-10 size-[44rem] rounded-full bg-brand/25 blur-[7rem]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[22%] -right-[10%] -z-10 size-[40rem] rounded-full bg-gold/15 blur-[7rem]" />

      {/* Orbit rings centred on the text (desktop) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden items-center justify-center lg:flex">
        <div data-pr="ring" className="absolute aspect-square h-[min(118svh,84rem)] opacity-0">
          <div data-pr="spin" data-dir="cw" className="size-full rounded-full border border-dashed border-white/15" />
        </div>
        <div data-pr="ring" className="absolute aspect-square h-[min(84svh,60rem)] opacity-0">
          <div data-pr="spin" data-dir="ccw" className="size-full rounded-full border border-white/10" />
        </div>
        <div data-pr="ring" className="absolute aspect-square h-[min(52svh,36rem)] rounded-full border border-white/[0.07] opacity-0" />
      </div>

      {/* Loose dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        {[
          ["8%", "58%", "size-3 bg-gold"],
          ["46%", "10%", "size-2.5 bg-brand-soft"],
          ["62%", "90%", "size-4 border border-gold/70"],
          ["93%", "48%", "size-3 bg-white/40"],
          ["34%", "86%", "size-2 bg-gold"],
          ["70%", "14%", "size-2 bg-white/50"],
        ].map(([l, t, c]) => (
          <span key={l + t} data-pr="dot" className={cn("absolute rounded-full opacity-0", c)} style={{ left: l, top: t }} />
        ))}
      </div>

      <div className="wrap-wide relative flex min-h-svh flex-col items-center justify-center gap-10 py-[clamp(5rem,12svh,9rem)] lg:block lg:min-h-[max(100svh,50rem)] lg:py-0">
        {/* CIRCLES: row on phones, orbit on desktop */}
        <ul
          className="flex items-center justify-center gap-3 sm:gap-5 lg:absolute lg:inset-0 lg:block"
          aria-label="Choose a review"
        >
          {copy.items.map((r, i) => {
            const on = i === active;
            return (
              <li
                key={r.name}
                className="lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:-translate-x-1/2 lg:-translate-y-1/2"
                style={{ "--x": `${r.at.x}%`, "--y": `${r.at.y}%`, "--s": r.size } as CSSProperties}
              >
                <div data-pr="av" data-px={r.at.x} data-py={r.at.y} className="opacity-0">
                  <div data-pr="drift">
                    <Magnetic strength={0.22}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        onPointerEnter={() => pause(true)}
                        onPointerLeave={() => pause(false)}
                        onFocus={() => pause(true)}
                        onBlur={() => pause(false)}
                        aria-pressed={on}
                        aria-label={`Show review from ${r.name}`}
                        className="group relative block size-[4.25rem] rounded-full outline-offset-4 sm:size-24 lg:size-[var(--s)]"
                      >
                        <span
                          className={cn(
                            "absolute inset-[7%] overflow-hidden rounded-full bg-night-card shadow-[0_24px_50px_-20px_rgb(0_0_0/0.8)] transition-[scale,filter] duration-700 ease-out-expo",
                            on ? "scale-105 brightness-100" : "brightness-[0.72] saturate-75 group-hover:scale-105 group-hover:brightness-100",
                          )}
                        >
                          <Image
                            src={r.image.src}
                            alt={r.image.alt}
                            fill
                            sizes="(min-width: 1024px) 13rem, 6rem"
                            quality={75}
                            className="object-cover"
                            style={{ objectPosition: r.image.position }}
                          />
                        </span>
                        {/* Progress ring */}
                        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
                          <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
                          <circle
                            data-pr="fill"
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="#d9a62e"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            pathLength={1}
                            strokeDasharray={1}
                            strokeDashoffset={on ? 0 : 1}
                          />
                        </svg>
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* CENTRE TEXT */}
        <div
          className="relative mx-auto flex max-w-[36rem] flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[min(36rem,34vw)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-none"
          onPointerEnter={() => pause(true)}
          onPointerLeave={() => pause(false)}
        >
          <p data-pr="copy" className="eyebrow text-gold opacity-0">{copy.label}</p>
          <h2 data-pr="copy" id="prv-title" className="mt-4 text-h3 font-medium opacity-0">
            {copy.heading}{" "}
            <span className="bg-linear-to-r from-gold via-[#f1d27a] to-brand-soft bg-clip-text text-transparent">{copy.headingAccent}</span>
          </h2>

          <div data-pr="copy" className="mt-7 opacity-0">
            <QuoteMark kind="open" className="mx-auto h-7" />
            {/* All quotes share one grid cell so the box never changes height */}
            <div className="mt-4 grid" aria-live="polite">
              {copy.items.map((r, i) => (
                <figure
                  key={r.name}
                  aria-hidden={i !== active}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,translate,filter] duration-700 ease-out-expo",
                    i === active ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-4 opacity-0 blur-[2px]",
                  )}
                >
                  <blockquote className="font-display text-[clamp(1.1rem,0.95rem+0.7vw,1.5rem)] leading-[1.45] text-white/90">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold">{r.name}</p>
                    <p className="mt-0.5 text-sm text-white/65">
                      {r.role} · {r.location}
                    </p>
                    <p className="mt-3 flex justify-center gap-1" role="img" aria-label={`${copy.stars} out of 5 stars`}>
                      {Array.from({ length: copy.stars }, (_, s) => (
                        <Star key={s} />
                      ))}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div data-pr="copy" className="mt-9 opacity-0">
            <Button href={copy.cta.href} size="lg" arrow>
              {copy.cta.label}
            </Button>
          </div>
        </div>
      </div>

      {process.env.NODE_ENV !== "production" && propertyReviewsAreSamples && (
        <p className="absolute right-[var(--gutter)] top-[calc(var(--header-h)-1rem)] rounded-pill bg-alert-bg px-3 py-1 text-xs font-semibold text-alert">
          Dev note: sample reviews. Replace in src/data/propertyReviews.ts before launch.
        </p>
      )}
    </section>
  );
}
