"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, mq, SplitText, useGSAP } from "@/lib/gsap";
import { propertyValue as copy } from "@/data/propertyValue";
import { pointIcons } from "./PropertyPointIcons";

const WINE = "#002025";
const WINE_DEEP = "#001519";

/**
 * The four petals, in reading order (clockwise from top-left, like the inspiration).
 * Each petal is a circle with ONE square corner that points at the shared centre; a filled
 * quarter-disc sits in that corner and carries the number.
 *  col/row  where it sits in the 2 x 2 grid (md and up)
 *  shape    which corner is square
 *  quarter  where the quarter-disc goes, and `num` where its number sits
 *  pad      keeps the text away from the quarter-disc
 *  origin   the point the petal grows from when it enters (the centre corner)
 */
const PETALS = [
  {
    colour: "#d9a62e",
    place: "md:col-start-1 md:row-start-1",
    shape: "md:rounded-tl-full md:rounded-tr-full md:rounded-bl-full md:rounded-br-none",
    quarter: "right-0 bottom-0 rounded-tl-full",
    num: "left-[83%] top-[83%]",
    pad: "md:pt-[15%] md:pb-[37%] md:px-[13%]",
    origin: "100% 100%",
  },
  {
    colour: "#4a90e2",
    place: "md:col-start-2 md:row-start-1",
    shape: "md:rounded-tl-full md:rounded-tr-full md:rounded-br-full md:rounded-bl-none",
    quarter: "left-0 bottom-0 rounded-tr-full",
    num: "left-[17%] top-[83%]",
    pad: "md:pt-[15%] md:pb-[37%] md:px-[13%]",
    origin: "0% 100%",
  },
  {
    colour: "#f5f3ee",
    place: "md:col-start-2 md:row-start-2",
    shape: "md:rounded-tr-full md:rounded-bl-full md:rounded-br-full md:rounded-tl-none",
    quarter: "left-0 top-0 rounded-br-full",
    num: "left-[17%] top-[17%]",
    pad: "md:pt-[37%] md:pb-[15%] md:px-[13%]",
    origin: "0% 0%",
  },
  {
    colour: "#2dbeaf",
    place: "md:col-start-1 md:row-start-2",
    shape: "md:rounded-tl-full md:rounded-bl-full md:rounded-br-full md:rounded-tr-none",
    quarter: "right-0 top-0 rounded-bl-full",
    num: "left-[83%] top-[17%]",
    pad: "md:pt-[37%] md:pb-[15%] md:px-[13%]",
    origin: "100% 0%",
  },
] as const;

/**
 * PROPERTY: "what we take care of". Centred on desktop (no empty rail), on a deep wine
 * background to bring more red into the page. Four glass petals meet at the middle.
 * Phones: four stacked cards that keep the leaf shape and the number tab.
 *
 * Entry (scroll-triggered, reversible): title lines slide up, petals grow out from the centre
 * corner one after another, the quarter-discs and numbers pop, then icon / title / text rise in.
 */
export function PropertyPoints() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel, el);
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const title = q<HTMLElement>("[data-pp=mask]");
        title.forEach((node) => {
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
                scrollTrigger: { trigger: node, start: "top 88%", toggleActions: "play none none reverse" },
              }),
          });
        });

        const petals = q<HTMLElement>("[data-pp=petal]");
        gsap.set(petals, { transformOrigin: (_i, t: HTMLElement) => t.dataset.origin ?? "50% 50%" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-pp=grid]", start: "top 78%", toggleActions: "play none none reverse" },
        });
        tl.fromTo(petals, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3, ease: "expo.out", stagger: 0.16 }, 0)
          .fromTo(q("[data-pp=quarter]"), { scale: 0 }, { scale: 1, duration: 0.9, ease: "back.out(1.6)", stagger: 0.16, transformOrigin: (_i: number, t: HTMLElement) => t.dataset.origin ?? "50% 50%" }, 0.35)
          .fromTo(q("[data-pp=num]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.16 }, 0.7)
          .fromTo(q("[data-pp=copy]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.16 }, 0.6);
      });

      mm.add(mq.reduced, () => {
        gsap.set("[data-pp=mask], [data-pp=petal], [data-pp=copy], [data-pp=num]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="pp-title"
      className="relative isolate overflow-hidden text-white"
      style={{ background: `radial-gradient(110% 80% at 50% 38%, #0b3a41 0%, ${WINE} 48%, ${WINE_DEEP} 100%)` }}
    >
      {/* Decorative rings, echoing the home "why us" circles */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[58%] -z-10 aspect-square w-[min(120rem,180vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[58%] -z-10 aspect-square w-[min(88rem,130vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="wrap-wide py-[clamp(4.5rem,10vw,8.5rem)]">
        <header className="mx-auto max-w-[44rem] text-center">
          <p data-pp="mask" className="text-xs font-semibold uppercase tracking-[0.2em] opacity-0" style={{ color: "#d9a62e" }}>
            {copy.pointsLabel}
          </p>
          <h2 id="pp-title" data-pp="mask" className="mt-4 text-h2 font-medium opacity-0">
            {copy.pointsTitle}
          </h2>
        </header>

        <ul
          data-pp="grid"
          role="list"
          className="mx-auto mt-[clamp(2.5rem,6vw,5rem)] grid max-w-[27rem] grid-cols-1 gap-4 md:max-w-[56rem] md:grid-cols-2 md:gap-2"
        >
          {copy.points.map((point, i) => {
            const P = PETALS[i % PETALS.length];
            const Icon = pointIcons[i % pointIcons.length];
            return (
              <li key={point.title} data-pp="petal" data-origin={P.origin} className={`${P.place} opacity-0`}>
                <div
                  className={`group relative h-full overflow-hidden border-2 bg-white/[0.05] shadow-[0_30px_70px_-34px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition-[background-color,border-color] duration-500 ease-out-expo hover:bg-white/[0.1] max-md:rounded-[2.25rem] max-md:p-7 max-md:pb-9 md:aspect-square ${P.shape} ${P.pad}`}
                  style={{ borderColor: `${P.colour}b3`, "--c": P.colour } as CSSProperties}
                >
                  {/* Quarter-disc in the corner that points at the centre (md and up) */}
                  <span
                    data-pp="quarter"
                    data-origin={P.origin}
                    aria-hidden
                    className={`absolute hidden size-[40%] md:block ${P.quarter}`}
                    style={{ background: `linear-gradient(135deg, ${P.colour}, ${P.colour}cc)` }}
                  />
                  <span
                    data-pp="num"
                    aria-hidden
                    className={`absolute hidden -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.7rem,1.1rem+1.6vw,2.9rem)] font-semibold leading-none md:block ${P.num}`}
                    style={{ color: WINE_DEEP }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div data-pp="copy" className="relative flex h-full flex-col justify-center max-md:items-start md:items-center md:text-center">
                    <span className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-full md:size-12" style={{ background: `${P.colour}26`, color: P.colour }}>
                        <Icon className="size-[52%]" />
                      </span>
                      <span aria-hidden className="font-display text-xl font-semibold md:hidden" style={{ color: P.colour }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <h3 className="mt-3 font-display text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] font-medium leading-snug">{point.title}</h3>
                    <p className="mt-2 max-w-[30ch] text-[clamp(0.85rem,0.78rem+0.25vw,0.98rem)] leading-[1.6] text-white/75 max-md:max-w-none">
                      {point.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
