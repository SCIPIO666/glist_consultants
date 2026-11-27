"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, mq, SplitText, useGSAP } from "@/lib/gsap";
import { DashField } from "@/components/ui/DashField";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { propertyValue as copy } from "@/data/propertyValue";

/**
 * PROPERTY VALUE PROPOSITION.
 * Left (sticky on desktop): title + photo, both animate in. Right: the paragraph reveals
 * line by line through a mask, then the two challenges as plain rows.
 * (The four "what we take care of" cards moved to their own centred section: PropertyPoints.)
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
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-pv=mask]", { opacity: 1 });
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

          {/* What owners have to deal with: plain typographic rows, no boxes or bars */}
          <div className="mt-12">
            <p data-pv="mask" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted opacity-0">What owners have to deal with</p>
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
        </div>
      </div>
    </section>
  );
}
