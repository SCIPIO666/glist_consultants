"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { DashField } from "@/components/ui/DashField";
import { propertyValue as copy } from "@/data/propertyValue";

const chartSegments = [
  "conic-gradient(from -42deg, #d9a62e 0deg 94deg, #1f6fd6 94deg 174deg, #0b3a41 174deg 258deg, #dce5e8 258deg 360deg)",
  "conic-gradient(from 18deg, #1f6fd6 0deg 88deg, #d9a62e 88deg 176deg, #0b3a41 176deg 264deg, #dce5e8 264deg 360deg)",
  "conic-gradient(from 76deg, #0b3a41 0deg 92deg, #d9a62e 92deg 180deg, #1f6fd6 180deg 270deg, #dce5e8 270deg 360deg)",
  "conic-gradient(from 132deg, #d9a62e 0deg 86deg, #0b3a41 86deg 178deg, #1f6fd6 178deg 268deg, #dce5e8 268deg 360deg)",
];

function ValueDonut({ index }: { index: number }) {
  return <div aria-hidden="true" className="relative grid size-[4.6rem] shrink-0 place-items-center rounded-full p-[7px] shadow-[0_10px_28px_-16px_rgb(0_32_37/0.5)] transition-transform duration-700 group-hover:rotate-[-12deg] group-hover:scale-105 sm:size-[5.7rem]" style={{ background: chartSegments[index % chartSegments.length] }}><div className="grid size-full place-items-center rounded-full border border-white/80 bg-[#f5f3ee] shadow-[inset_0_2px_8px_rgb(0_32_37/0.08)]"><span className="font-mono text-sm font-semibold tracking-[-0.06em] text-[#0b3a41]">{String(index + 1).padStart(2, "0")}</span></div></div>;
}

/** Full-viewport split scene: fixed title/image rail + independently scrolling value content. */
export function PropertyValue() {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(mq.motionOk, () => {
      gsap.fromTo("[data-pv=left]", { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 1.15, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%", toggleActions: "play none none reverse" } });
      gsap.utils.toArray<HTMLElement>("[data-pv=content]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, scroller: scroller.current, start: "top 88%", toggleActions: "play none none reverse" } });
      });
    });
    mm.add(mq.reduced, () => gsap.set("[data-pv=left], [data-pv=content], [data-pv=corner]", { opacity: 1, x: 0, y: 0 }));
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="pv-title" className="relative isolate grid h-svh min-h-[36rem] grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-sand text-ink lg:grid-rows-1 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]">
      <DashField focus="top-right" variant="ripple" className="pointer-events-none absolute right-0 top-0 -z-10 h-[min(65%,42rem)] w-[min(75%,50rem)] opacity-55" />
      <DashField focus="bottom-left" variant="ripple" className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[min(65%,42rem)] w-[min(75%,50rem)] opacity-55" />

      {/* Fixed visual rail: it does not move when the right pane scrolls. */}
      <aside data-pv="left" className="relative z-10 grid grid-cols-[minmax(0,1fr)_minmax(6rem,0.72fr)] items-center gap-4 border-b border-[#0b3a41]/10 bg-[#f5f3ee]/95 px-5 py-4 opacity-0 backdrop-blur-xl sm:px-9 lg:flex lg:flex-col lg:items-stretch lg:justify-center lg:border-b-0 lg:border-r lg:px-[clamp(2rem,5vw,5.5rem)] lg:py-12">
        <div>
          <p className="mb-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#1f6fd6] sm:mb-5 sm:text-[0.68rem]">Property value proposition</p>
          <h2 id="pv-title" className="max-w-[12ch] text-[clamp(1.8rem,3.9vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#002025]">{copy.title}</h2>
        </div>
        <figure className="group relative aspect-[4/4.5] max-h-[10rem] overflow-hidden rounded-xl bg-[#0b3a41] shadow-[0_18px_45px_-25px_rgb(0_32_37/0.45)] sm:max-h-[13rem] lg:mt-9 lg:aspect-[4/3.25] lg:max-h-none lg:rounded-[1.35rem]">
          <Image src={copy.image.src} alt={copy.image.alt} fill sizes="(min-width: 1024px) 38vw, 35vw" quality={80} className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]" style={{ objectPosition: copy.image.position }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002025]/65 via-transparent to-transparent" />
          <figcaption className="absolute bottom-3 left-3 hidden max-w-[18rem] text-sm font-medium leading-relaxed text-white sm:block lg:bottom-6 lg:left-6">Clear oversight. Better-managed spaces. More time back for owners.</figcaption>
        </figure>
      </aside>

      {/* Independent scroll viewport for all value-proposition material. */}
      <div ref={scroller} className="relative min-h-0 overflow-y-auto overscroll-contain px-5 py-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-9 sm:py-10 lg:px-[clamp(2rem,5vw,5.5rem)] lg:py-14" style={{ WebkitOverflowScrolling: "touch" }}>
        <div data-pv="content" className="mx-auto max-w-[54rem]">
          <p className="max-w-[43rem] text-[clamp(1.05rem,1.55vw,1.45rem)] leading-[1.55] tracking-[-0.025em] text-[#33485d]">{copy.intro}</p>
        </div>

        <div data-pv="content" className="mx-auto mt-8 max-w-[54rem] border-y border-[#0b3a41]/15 py-6 sm:mt-10 sm:py-8">
          <p className="mb-5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#1f6fd6]">What property owners have to navigate</p>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {copy.challenges.map((challenge, index) => <article key={challenge.title} className="relative pl-5">
              <span className="absolute bottom-0 left-0 top-1 w-[2px] rounded-full bg-[#d9a62e]" />
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-[#1f6fd6]">CHALLENGE / 0{index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.025em] text-[#002025]">{challenge.title}</h3>
              <p className="mt-2 text-sm leading-[1.75] text-[#4a5a72]">{challenge.text}</p>
            </article>)}
          </div>
        </div>

        <div data-pv="content" className="mx-auto mt-8 max-w-[54rem] sm:mt-10">
          <div className="flex items-end justify-between gap-4">
            <h3 className="max-w-[17ch] text-2xl font-medium leading-tight tracking-[-0.045em] text-[#002025] sm:text-[2rem]">The details that protect your property.</h3>
            <span className="hidden pb-1 font-mono text-[0.62rem] uppercase tracking-[0.17em] text-[#4a5a72] sm:block">Four key priorities</span>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {copy.points.map((point, index) => <li key={point.title} className="group flex min-h-[8.5rem] items-center gap-4 rounded-[1.15rem] border border-white/75 bg-white/65 p-4 shadow-[0_1px_2px_rgb(15_42_82/0.04),0_18px_42px_-30px_rgb(0_32_37/0.32)] backdrop-blur-md transition-[transform,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_18px_45px_-24px_rgb(0_32_37/0.28)] sm:gap-5 sm:p-5">
              <ValueDonut index={index} />
              <div className="min-w-0"><h4 className="text-[0.98rem] font-semibold leading-snug tracking-[-0.02em] text-[#002025]">{point.title}</h4><p className="mt-1.5 text-[0.82rem] leading-[1.65] text-[#4a5a72]">{point.text}</p></div>
            </li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
