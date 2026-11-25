"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/services";
import { railShapes, servicesIntro as copy } from "@/data/servicesPage";

const SCROLL = 200; // svh of vertical scrolling that drives the sideways movement

/**
 * Services intro: a short title and line, then a rail of photo cards in different shapes
 * that slides sideways as you scroll (pinned with CSS sticky, scrubbed, reversible). Each card
 * jumps to its service in the list below. Reduced motion / short screens: the rail is a plain
 * horizontally scrollable strip instead.
 */
export function ServicesIntro() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const tr = track.current;
      if (!el || !tr) return;
      const mm = gsap.matchMedia();
      mm.add(mq.pin, () => {
        gsap.to(tr, {
          x: () => -Math.max(0, tr.scrollWidth - (tr.parentElement?.clientWidth ?? 0)),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  const style = { "--intro-h": `${100 + SCROLL}svh` } as CSSProperties;

  return (
    <section
      ref={root}
      aria-labelledby="services-intro-title"
      style={style}
      className="relative h-[var(--intro-h)] bg-paper text-ink flat:h-auto"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-6 flat:static flat:h-auto flat:overflow-visible flat:py-20">
        <div className="wrap-wide w-full">
          <Reveal y={32}>
            <h2
              id="services-intro-title"
              className="max-w-[22ch] text-[clamp(1.8rem,1rem+2.8vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em]"
            >
              {copy.title}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <p className="mt-3 max-w-xl text-lead text-ink-muted">{copy.lead}</p>
          </Reveal>
          <Reveal y={20} delay={0.2} className="mt-5">
            <a
              href={copy.link.href}
              className="inline-block border-b-2 border-ink pb-1 text-sm font-semibold tracking-[0.04em] transition-colors hover:border-brand hover:text-brand"
            >
              {copy.link.label}
            </a>
          </Reveal>
        </div>

        {/* The rail. `--u` is one design unit; it follows the screen height so the cards always fit. */}
        <nav
          aria-label={copy.srRailLabel}
          className="relative mt-6 min-h-0 flex-1 [--u:clamp(0.45rem,1.45svh,1rem)] flat:mt-10 flat:overflow-x-auto flat:[--u:0.6rem] flat:sm:[--u:0.8rem] flat:snap-x"
        >
          <ul ref={track} className="wrap-wide flex h-full w-max items-start gap-[calc(var(--u)*1.6)] pr-[var(--gutter)] will-change-transform flat:h-auto flat:pb-4">
            {services.map((s, i) => {
              const shape = railShapes[i % railShapes.length];
              return (
                <li
                  key={s.slug}
                  style={{ width: `min(calc(var(--u) * ${shape.w}), 86vw)`, height: `calc(var(--u) * ${shape.h})` }}
                  className="shrink-0 snap-start"
                >
                  <a href={`#${s.slug}`} className="group relative block size-full overflow-hidden bg-night">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 34rem, 86vw"
                      quality={70}
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night-deep/85 via-night/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-[calc(var(--u)*1.4)] text-[max(1rem,calc(var(--u)*1.55))] font-medium leading-tight text-white">
                      {s.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
