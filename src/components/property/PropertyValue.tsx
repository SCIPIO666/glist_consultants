"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, mq, SplitText, useGSAP } from "@/lib/gsap";
import { DashField } from "@/components/ui/DashField";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { propertyValue as copy } from "@/data/propertyValue";

const rings = [
  "conic-gradient(from -42deg, #d9a62e 0deg 94deg, #1f6fd6 94deg 174deg, #0b3a41 174deg 258deg, #dce5e8 258deg 360deg)",
  "conic-gradient(from 18deg, #1f6fd6 0deg 88deg, #d9a62e 88deg 176deg, #0b3a41 176deg 264deg, #dce5e8 264deg 360deg)",
  "conic-gradient(from 76deg, #0b3a41 0deg 92deg, #d9a62e 92deg 180deg, #1f6fd6 180deg 270deg, #dce5e8 270deg 360deg)",
  "conic-gradient(from 132deg, #d9a62e 0deg 86deg, #0b3a41 86deg 178deg, #1f6fd6 178deg 268deg, #dce5e8 268deg 360deg)",
];

/** A small donut chart that carries the card number. */
function ValueDonut({ index }: { index: number }) {
  return (
    <div
      aria-hidden
      data-pv="donut"
      className="grid size-[4.5rem] shrink-0 place-items-center rounded-full p-[6px] transition-transform duration-700 ease-out group-hover:rotate-[-14deg] group-hover:scale-105 sm:size-20"
      style={{ background: rings[index % rings.length] }}
    >
      <div className="grid size-full place-items-center rounded-full bg-white/80 shadow-[inset_0_2px_8px_rgb(0_32_37/0.1)] backdrop-blur-sm">
        <span className="font-mono text-sm font-semibold text-night-card">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

/**
 * PROPERTY VALUE PROPOSITION.
 * Left (sticky on desktop): title + photo, both animate in. Right: the paragraph reveals
 * line by line through a mask, then four minimal glass cards each carry a donut.
 * Corner patterns top-right and bottom-left. All scroll-triggered and reversible.
 */
export function PropertyValue() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        // Mask reveal: each line slides up out of its own clipping box
        el.querySelectorAll<HTMLElement>("[data-pv=mask]").forEach((node) => {
          gsap.set(node, { opacity: 1 });
          SplitText.create(node, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.09,
                ease: "expo.out",
                scrollTrigger: { trigger: node, start: "top 85%", toggleActions: "play none none reverse" },
              }),
          });
        });

        // Photo opens upward like a curtain while the image settles
        gsap.fromTo(
          "[data-pv=photo]",
          { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: "[data-pv=photo]", start: "top 85%", toggleActions: "play none none reverse" } },
        );
        gsap.fromTo(
          "[data-pv=photo-img]",
          { scale: 1.25 },
          { scale: 1, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: "[data-pv=photo]", start: "top 85%", toggleActions: "play none none reverse" } },
        );

        // Glass cards step in one after another
        gsap.fromTo(
          "[data-pv=card]",
          { opacity: 0, y: 56, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out", stagger: 0.14, scrollTrigger: { trigger: "[data-pv=cards]", start: "top 85%", toggleActions: "play none none reverse" } },
        );
        gsap.fromTo(
          "[data-pv=donut]",
          { rotation: -140, scale: 0.6 },
          { rotation: 0, scale: 1, duration: 1.4, ease: "power3.out", stagger: 0.14, scrollTrigger: { trigger: "[data-pv=cards]", start: "top 85%", toggleActions: "play none none reverse" } },
        );
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-pv=mask], [data-pv=card]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="pv-title"
      className="relative isolate overflow-hidden bg-linear-to-br from-sand via-mist to-[#e3ebf7] text-ink"
    >
      {/* colour for the glass to frost: soft pastel circles */}
      <div aria-hidden className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -left-[8%] top-[18%] size-[34rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgb(217 166 46 / 0.32), transparent)" }} />
        <div className="absolute right-[-6%] top-[40%] size-[38rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgb(74 144 226 / 0.3), transparent)" }} />
        <div className="absolute bottom-[-8%] left-[30%] size-[30rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgb(45 190 175 / 0.22), transparent)" }} />
      </div>
      <DashField focus="top-right" variant="ripple" className="pointer-events-none absolute right-0 top-0 -z-10 h-[min(55%,40rem)] w-[min(75%,50rem)] opacity-50" />
      <DashField focus="bottom-left" variant="ripple" className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[min(55%,40rem)] w-[min(75%,50rem)] opacity-50" />

      <div className="wrap-wide grid gap-12 py-[clamp(4.5rem,11vw,9rem)] lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)] lg:gap-[clamp(3rem,6vw,7rem)]">
        {/* Left rail: stays in view while the right side scrolls past */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <Eyebrow className="text-brand">Property value proposition</Eyebrow>
          <h2 id="pv-title" data-pv="mask" className="mt-4 max-w-[12ch] text-h2 font-medium text-night opacity-0">
            {copy.title}
          </h2>
          <figure data-pv="photo" className="relative mt-8 aspect-[4/3.4] overflow-hidden rounded-[1.5rem] bg-night-card shadow-[0_30px_60px_-30px_rgb(0_32_37/0.5)] lg:mt-10">
            <Image
              data-pv="photo-img"
              src={copy.image.src}
              alt={copy.image.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              quality={80}
              className="object-cover"
              style={{ objectPosition: copy.image.position }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-night/55 via-transparent to-transparent" />
          </figure>
        </div>

        {/* Right: mask-revealed paragraph, then glass cards */}
        <div>
          <p data-pv="mask" className="max-w-[40rem] text-[clamp(1.2rem,0.9rem+1.1vw,1.85rem)] leading-[1.45] tracking-[-0.015em] text-ink opacity-0">
            {copy.intro}
          </p>

          {/* What owners have to navigate: plain typographic rows, no boxes or bars */}
          <div className="mt-12">
            <p data-pv="mask" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted opacity-0">What owners have to navigate</p>
            <ol className="mt-4 divide-y divide-ink/12 border-y border-ink/12">
              {copy.challenges.map((c, i) => (
                <li key={c.title} className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:py-7">
                  <span data-pv="mask" className="font-display text-2xl font-medium text-brand opacity-0 sm:text-3xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-pv="mask" className="font-display text-[clamp(1.2rem,1rem+0.7vw,1.6rem)] font-medium leading-snug text-night opacity-0">{c.title}</h3>
                    <p data-pv="mask" className="mt-2 max-w-[38rem] text-[0.95rem] leading-[1.75] text-ink-muted opacity-0">{c.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16">
            <p data-pv="mask" className="text-xs font-semibold uppercase tracking-[0.18em] text-brand opacity-0">{copy.pointsLabel}</p>
            <h3 data-pv="mask" className="mt-3 max-w-[20ch] text-h3 font-medium text-night opacity-0">{copy.pointsTitle}</h3>
          </div>

          <ul data-pv="cards" className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {copy.points.map((point, index) => (
              <li
                key={point.title}
                data-pv="card"
                className="group relative flex min-h-[15rem] flex-col items-start justify-between gap-6 overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/45 p-5 opacity-0 shadow-[0_20px_50px_-28px_rgb(0_32_37/0.4),inset_0_1px_0_rgb(255_255_255/0.9)] backdrop-blur-lg backdrop-saturate-150 transition-[transform,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:bg-white/65 hover:shadow-[0_28px_60px_-26px_rgb(0_32_37/0.45),inset_0_1px_0_rgb(255_255_255/0.95)] sm:p-6"
              >
                <ValueDonut index={index} />
                <div className="min-w-0">
                  <h4 className="font-display text-lg font-medium leading-snug text-night">{point.title}</h4>
                  <p className="mt-1.5 text-sm leading-[1.65] text-ink-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
