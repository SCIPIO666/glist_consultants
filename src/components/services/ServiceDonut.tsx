"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { donutCopy } from "@/data/servicesBreakdown";
import { R_MID, R_OUT, R_IN, SHAPES, pointAt, segMid, segPath, type Shape } from "./donutGeometry";

export type DonutTask = { label: string; detail: string };

type Props = {
  slug: string;
  title: string;
  image: { src: string; alt: string };
  tasks: DonutTask[];
  shape: Shape;
};

/** Segment colours: fill class + the class for the number printed on it. Cycles per segment. */
const PALETTE = [
  { fill: "fill-kra", num: "fill-white" },
  { fill: "fill-gold", num: "fill-night-deep" },
  { fill: "fill-brand", num: "fill-white" },
  { fill: "fill-kra-deep", num: "fill-white" },
  { fill: "fill-whatsapp", num: "fill-night-deep" },
  { fill: "fill-mist", num: "fill-night-deep" },
] as const;

/**
 * Layout per shape. `area` = padding that reserves room for labels and the panel,
 * `box` = size and position of the donut, `hole` = the photo cut to the donut's hole,
 * `modal` = where the glass panel sits. On phones the panel always drops below the donut.
 */
const LAYOUT: Record<Shape, { area: string; box: string; hole: string; modal: string }> = {
  top: {
    area: "pt-14 pb-32 sm:pb-36",
    box: "mx-auto w-[72%] aspect-[2/1]",
    hole: "bottom-0 left-1/2 w-[60%] aspect-[2/1] -translate-x-1/2 rounded-t-full",
    modal: "bottom-2 inset-x-0 mx-auto w-[min(22rem,94%)]",
  },
  bottom: {
    area: "pt-32 pb-14 sm:pt-36",
    box: "mx-auto w-[72%] aspect-[2/1]",
    hole: "top-0 left-1/2 w-[60%] aspect-[2/1] -translate-x-1/2 rounded-b-full",
    modal: "top-2 inset-x-0 mx-auto w-[min(22rem,94%)]",
  },
  left: {
    area: "pt-10 pb-48 sm:py-10",
    box: "ml-[16%] w-[34%] aspect-[1/2]",
    hole: "right-0 top-1/2 h-[60%] aspect-[1/2] -translate-y-1/2 rounded-l-full",
    modal: "bottom-2 inset-x-0 mx-auto w-[94%] sm:inset-x-auto sm:bottom-auto sm:inset-y-0 sm:right-0 sm:my-auto sm:mx-0 sm:h-fit sm:w-[min(21rem,54%)]",
  },
  right: {
    area: "pt-10 pb-48 sm:py-10",
    box: "ml-auto mr-[16%] w-[34%] aspect-[1/2]",
    hole: "left-0 top-1/2 h-[60%] aspect-[1/2] -translate-y-1/2 rounded-r-full",
    modal: "bottom-2 inset-x-0 mx-auto w-[94%] sm:inset-x-auto sm:bottom-auto sm:inset-y-0 sm:left-0 sm:my-auto sm:mx-0 sm:h-fit sm:w-[min(21rem,54%)]",
  },
  "three-quarter-br": {
    area: "pt-14 pb-48 sm:pb-14",
    box: "ml-[15%] w-[66%] aspect-square",
    hole: "left-1/2 top-1/2 w-[60%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full",
    modal: "bottom-2 inset-x-0 mx-auto w-[94%] sm:inset-x-auto sm:bottom-12 sm:right-0 sm:mx-0 sm:w-[min(21rem,52%)]",
  },
  "three-quarter-bl": {
    area: "pt-14 pb-48 sm:pb-14",
    box: "ml-auto mr-[15%] w-[66%] aspect-square",
    hole: "left-1/2 top-1/2 w-[60%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full",
    modal: "bottom-2 inset-x-0 mx-auto w-[94%] sm:inset-x-auto sm:bottom-12 sm:left-0 sm:mx-0 sm:w-[min(21rem,52%)]",
  },
  full: {
    area: "pt-14 pb-52",
    box: "mx-auto w-[66%] aspect-square",
    hole: "left-1/2 top-1/2 w-[60%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full",
    modal: "bottom-2 inset-x-0 mx-auto w-[min(22rem,94%)]",
  },
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * One service as a donut (half, three-quarter or full, so the page doesn't repeat itself).
 * Each segment is one entry. Hover (or tap, or focus with the keyboard) a segment and a
 * glass panel opens, joined to that segment by a thin gold line that draws itself. The
 * service photo fills the donut's hole. All text is also in the page as a hidden list.
 */
export function ServiceDonut({ slug, title, image, tasks, shape }: Props) {
  const n = tasks.length;
  const cfg = SHAPES[shape];
  const lay = LAYOUT[shape];
  const [vx, vy, vw, vh] = cfg.vb;
  const [active, setActive] = useState<number | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const line = useRef<SVGLineElement>(null);

  // Draw the link line and show / hide the glass panel whenever the active segment changes.
  useGSAP(
    () => {
      const a = area.current;
      const b = box.current;
      const m = modal.current;
      const l = line.current;
      if (!a || !b || !m || !l) return;
      const dots = gsap.utils.toArray<SVGCircleElement>("[data-link-dot]", a);

      if (active === null) {
        gsap.to([m, l, ...dots], { opacity: 0, duration: 0.25, overwrite: true });
        gsap.set(m, { pointerEvents: "none", delay: 0.25 });
        return;
      }

      // Layout positions (unaffected by transforms), relative to the `area` box.
      const k = b.offsetWidth / vw;
      const [px, py] = pointAt(R_MID, segMid(shape, active, n));
      const x1 = b.offsetLeft + (px - vx) * k;
      const y1 = b.offsetTop + (py - vy) * k;
      // End of the line: the point on the panel's outline closest to the segment.
      const x2 = clamp(x1, m.offsetLeft, m.offsetLeft + m.offsetWidth);
      const y2 = clamp(y1, m.offsetTop, m.offsetTop + m.offsetHeight);
      const len = Math.hypot(x2 - x1, y2 - y1);
      const hasLine = len > 6; // segment hidden under the panel: no line needed

      gsap.set(m, { pointerEvents: "auto" });
      gsap.fromTo(m, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", overwrite: true });

      if (!hasLine) {
        gsap.set([l, ...dots], { opacity: 0 });
        return;
      }
      gsap.set(l, { attr: { x1, y1, x2, y2 }, strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      gsap.set(dots[0], { attr: { cx: x1, cy: y1 } });
      gsap.set(dots[1], { attr: { cx: x2, cy: y2 } });
      gsap.to(l, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" });
      gsap.fromTo(dots[0], { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, svgOrigin: `${x1} ${y1}` });
      gsap.fromTo(dots[1], { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, delay: 0.35, svgOrigin: `${x2} ${y2}` });
    },
    { scope: area, dependencies: [active, n, shape] },
  );

  // Touch: tapping anywhere outside closes the panel. Escape closes it too.
  useEffect(() => {
    if (active === null) return;
    const away = (e: PointerEvent) => {
      if (area.current && !area.current.contains(e.target as Node)) setActive(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [active]);

  const current = active === null ? null : tasks[active];

  return (
    <div
      ref={area}
      data-row-donut
      className={cn("relative mx-auto w-full max-w-[46rem]", lay.area)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
    >
      <div ref={box} className={cn("relative", lay.box)}>
        {/* The ring */}
        <svg
          viewBox={`${vx} ${vy} ${vw} ${vh}`}
          className="absolute inset-0 z-10 size-full overflow-visible"
          role="group"
          aria-label={`${title}: ${n} areas`}
        >
          {tasks.map((t, i) => {
            const c = PALETTE[i % PALETTE.length];
            const mid = segMid(shape, i, n);
            const [nx, ny] = pointAt((R_OUT + R_IN) / 2, mid);
            const rad = (mid * Math.PI) / 180;
            const on = active === i;
            return (
              <g key={t.label} data-seg>
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={`${t.label}. ${t.detail}`}
                  aria-pressed={on}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  style={{ transform: on ? `translate(${(Math.sin(rad) * 3.5).toFixed(2)}px, ${(-Math.cos(rad) * 3.5).toFixed(2)}px)` : undefined }}
                  className={cn(
                    "cursor-pointer outline-none transition-[opacity,transform] duration-300 ease-out",
                    active !== null && !on ? "opacity-45" : "opacity-100",
                    "[&:focus-visible>path]:stroke-white [&:focus-visible>path]:stroke-[1.2]",
                  )}
                >
                  <path d={segPath(shape, i, n)} className={cn(c.fill, "opacity-90")} />
                  <text
                    x={nx}
                    y={ny}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={cn(c.num, "pointer-events-none select-none font-semibold")}
                    style={{ fontSize: 7 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Outside labels (sm and up). Pointer-transparent: the segments carry the interaction. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
          {tasks.map((t, i) => {
            const mid = segMid(shape, i, n);
            const [x, y] = pointAt(R_OUT + 6, mid);
            const rad = (mid * Math.PI) / 180;
            const sx = Math.sin(rad);
            const cy = Math.cos(rad);
            const rightSide = sx > 0.35;
            const leftSide = sx < -0.35;
            return (
              <span
                key={t.label}
                data-seg-label
                className={cn(
                  "absolute max-w-[7rem] text-xs font-medium leading-tight transition-colors duration-300 lg:text-[0.8rem]",
                  active === i ? "text-gold" : "text-white/75",
                  rightSide && "-translate-y-1/2 text-left",
                  leftSide && "-translate-x-full -translate-y-1/2 text-right",
                  !rightSide && !leftSide && (cy > 0 ? "-translate-x-1/2 -translate-y-full text-center" : "-translate-x-1/2 text-center"),
                )}
                style={{ left: `${((x - vx) / vw) * 100}%`, top: `${((y - vy) / vh) * 100}%` }}
              >
                {t.label}
              </span>
            );
          })}
        </div>

        {/* The hole: the service photo, big, cut to the donut's inner shape */}
        <div className={cn("absolute overflow-hidden bg-night-card", lay.hole)}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 20rem, 50vw" quality={75} className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-night-deep/15" />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 flex items-end justify-center pb-[8%] transition-opacity duration-300",
              active !== null && "opacity-0",
            )}
          >
            <span className="hidden rounded-pill border border-white/30 bg-night-deep/45 px-3 py-1 text-[0.7rem] text-white backdrop-blur-md sm:inline [@media(hover:none)]:hidden">
              {donutCopy.hintMouse}
            </span>
            <span className="hidden rounded-pill border border-white/30 bg-night-deep/45 px-3 py-1 text-[0.7rem] text-white backdrop-blur-md sm:[@media(hover:none)]:inline">
              {donutCopy.hintTouch}
            </span>
          </div>
        </div>
      </div>

      {/* Link line + end dots (in px of the area box) */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 z-20 size-full overflow-visible">
        <line ref={line} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="text-gold opacity-0" />
        <circle data-link-dot r={4} className="fill-gold opacity-0" />
        <circle data-link-dot r={4} className="fill-gold opacity-0" />
      </svg>

      {/* The glass panel */}
      <div
        ref={modal}
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute z-30 rounded-card border border-white/30 bg-white/[0.14] p-5 text-white opacity-0 shadow-[0_24px_60px_-18px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.35)] backdrop-blur-xl backdrop-saturate-150 sm:p-6",
          lay.modal,
        )}
      >
        {current && active !== null && (
          <>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">{donutCopy.position(active, n)}</p>
            <h4 className="mt-1.5 font-display text-xl font-medium leading-tight sm:text-2xl">{current.label}</h4>
            <p className="mt-2.5 text-sm leading-relaxed text-white/90">{current.detail}</p>
            <Link
              href={`/contact?service=${slug}`}
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold"
            >
              {donutCopy.enquire}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </>
        )}
      </div>

      {/* Same content, always in the page, for screen readers and search engines */}
      <ul className="sr-only">
        {tasks.map((t) => (
          <li key={t.label}>
            {t.label}: {t.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
