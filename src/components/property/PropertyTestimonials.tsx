"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { propertyTestimonials as copy } from "@/data/propertyManagement";
import { cn } from "@/lib/cn";

const STAR = "12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6";

/**
 * Section 9: one testimonial at a time on a bright card, with arrows and dots.
 * (Sample reviews: see data/propertyManagement.ts.) All cards sit in one grid cell, so the
 * card never changes height; the inactive ones are simply invisible and inert.
 */
export function PropertyTestimonials() {
  const [i, setI] = useState(0);
  const n = copy.items.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section aria-labelledby="pm-reviews-title" className="relative bg-sand py-[clamp(4rem,10svh,7rem)] text-ink">
      <div className="wrap-wide">
        <Reveal y={40}>
          <h2 id="pm-reviews-title" className="mx-auto max-w-[24ch] text-center text-h2 font-medium">{copy.title}</h2>
        </Reveal>

        <Reveal y={50} delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="grid" role="group" aria-roledescription="carousel" aria-label="Testimonials">
            {copy.items.map((r, k) => (
              <figure
                key={r.name}
                aria-hidden={k !== i}
                inert={k !== i}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col justify-between gap-8 bg-gradient-to-br from-brand to-[#2a58d8] p-8 text-white transition-[opacity,translate] duration-700 ease-out-expo sm:p-12",
                  k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
                )}
              >
                <div className="flex gap-1.5 text-gold" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 24 24" aria-hidden className="size-5"><polygon points={STAR} fill="currentColor" /></svg>
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed sm:text-xl">{r.quote}</blockquote>
                <figcaption className="flex items-end justify-between gap-4 text-sm font-bold uppercase tracking-[0.12em]">
                  <span>{r.name}</span>
                  <time className="tabular-nums">{r.date}</time>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Choose a testimonial">
              {copy.items.map((r, k) => (
                <button key={r.name} type="button" role="tab" aria-selected={k === i} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)}
                  className={cn("h-2 rounded-full transition-[width,background-color] duration-300", k === i ? "w-8 bg-brand" : "w-2 bg-ink/25 hover:bg-ink/50")} />
              ))}
            </div>
            <div className="flex gap-2">
              {([-1, 1] as const).map((d) => (
                <button key={d} type="button" onClick={() => go(d)} aria-label={d < 0 ? "Previous testimonial" : "Next testimonial"}
                  className="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-white">
                  <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", d < 0 && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal y={20} className="mt-10 flex justify-center">
          <Button href={copy.cta.href} size="lg" arrow>{copy.cta.label}</Button>
        </Reveal>

        {process.env.NODE_ENV !== "production" && copy.areSamples && (
          <p className="mx-auto mt-6 w-fit rounded-pill bg-alert-bg px-3 py-1 text-xs font-semibold text-alert">
            Dev note: sample testimonials. Replace in src/data/propertyManagement.ts before launch.
          </p>
        )}
      </div>
    </section>
  );
}
