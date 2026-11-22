"use client";

import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { aboutGlance as copy } from "@/data/aboutGlance";

/**
 * "Glist at a glance": a horizontal strip of tall image cards. Each card links
 * to its section further down the page; hovering (or focusing) a card reveals a
 * short description under the title. The strip scrolls sideways when the cards
 * don't fit (touch, trackpad, arrow buttons) and a thin line shows how far you are.
 */
export function AboutGlance() {
  const scroller = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const { scrollTo } = useSmoothScroll();

  const update = useCallback(() => {
    const el = scroller.current;
    const b = bar.current;
    if (!el || !b) return;
    const max = el.scrollWidth - el.clientWidth;
    const visible = el.clientWidth / el.scrollWidth;
    b.style.width = `${Math.min(1, visible) * 100}%`;
    b.style.transform = `translateX(${max > 0 ? (el.scrollLeft / max) * (1 / visible - 1) * 100 : 0}%)`;
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  const jump = (e: MouseEvent, href: string) => {
    const target = document.querySelector(href);
    if (!target) return; // section not on the page yet: let the browser do nothing
    e.preventDefault();
    scrollTo(href, 0);
  };

  return (
    <section aria-labelledby="glance-title" className="relative bg-paper text-ink">
      <div className="wrap-wide py-[clamp(4rem,9vw,8rem)]">
        <div className="flex items-end justify-between gap-6">
          <Reveal y={30}>
            <h2 id="glance-title" className="text-h2 font-medium">
              {copy.title}
            </h2>
          </Reveal>
          <div className="hidden gap-2 sm:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => nudge(d)}
                aria-label={d === 1 ? "Scroll cards right" : "Scroll cards left"}
                className="grid size-12 place-items-center rounded-full border border-ink/25 text-lg transition-colors hover:bg-ink hover:text-white"
              >
                <ArrowRight className={d === -1 ? "-scale-x-100" : ""} />
              </button>
            ))}
          </div>
        </div>

        <Reveal y={50} className="mt-10">
        <ul
          ref={scroller}
          onScroll={update}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
        >
          {copy.items.map((it) => (
            <li key={it.id} className="w-[min(78vw,19rem)] shrink-0 snap-start lg:w-[calc((100%-3*1.25rem)/4)] lg:min-w-[15rem]">
              <a
                href={it.href}
                onClick={(e) => jump(e, it.href)}
                className="group relative block aspect-[3/4.2] overflow-hidden bg-night-card"
              >
                <Image
                  src={it.image.src}
                  alt={it.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 78vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night-deep/90 via-night-deep/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-medium">{it.title}</h3>
                  <p
                    className="max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-[max-height,opacity,margin] duration-500 ease-out-expo group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-40 group-focus-visible:opacity-100 [@media(hover:none)]:mt-3 [@media(hover:none)]:max-h-40 [@media(hover:none)]:opacity-100"
                  >
                    {it.text}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        </Reveal>

        <div aria-hidden className="relative mt-6 h-px w-full bg-ink/20">
          <span ref={bar} className="absolute inset-y-0 left-0 block h-[3px] -translate-y-px bg-gold" style={{ width: "100%" }} />
        </div>
      </div>
    </section>
  );
}
