"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { introGraph, introGraphPoints } from "@/data/intro";

type Size = { w: number; h: number };

const f = (n: number) => n.toFixed(1);

/** Smooth [x, y] points (0..1, y up) into a pixel-space cubic path. Catmull-Rom to Bezier. */
function toPath(points: [number, number][], w: number, h: number) {
  const P = points.map(([x, y]) => [x * w, (1 - y) * h]);
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] ?? P[i];
    const p1 = P[i];
    const p2 = P[i + 1];
    const p3 = P[i + 2] ?? p2;
    d +=
      ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}` +
      ` ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)}` +
      ` ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Positions (in %) of the five gridlines and their labels. */
const xTicks = [6, 28, 50, 72, 94];
const yTicks = [100, 75, 50, 25, 0]; // % from top, bottom label first (matches introGraph.yLabels)

/**
 * Intro screen 3: the graph draws itself from scratch while you scroll.
 * axes -> gridlines + labels -> a hand-drawn line (with a pen dot) -> tagline + underline.
 * The section is tall; the chart sticks to the screen while the scroll scrubs the drawing.
 * Fully reversible. Reduced-motion users see the finished chart.
 */
export function IntroGraph() {
  const section = useRef<HTMLElement>(null);
  const plot = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });

  // Measure the plot box so the SVG can be drawn in real pixels (no stretched strokes).
  useEffect(() => {
    const el = plot.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const root = section.current;
      if (!root || !size.w || !size.h) return;
      const $ = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel, root);

      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const line = $<SVGPathElement>("[data-line]")[0];
        const dot = $<HTMLElement>("[data-dot]")[0];
        const len = line.getTotalLength();
        const setX = gsap.quickSetter(dot, "x", "px");
        const setY = gsap.quickSetter(dot, "y", "px");
        const pen = { p: 0 };
        const movePen = () => {
          const pt = line.getPointAtLength(len * pen.p);
          setX(pt.x);
          setY(pt.y);
        };
        movePen();

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
        });

        tl.fromTo($("[data-axis]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, stagger: 0.25 }, 0)
          .fromTo($("[data-grid]"), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.07 }, 0.5)
          .fromTo($("[data-label]"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, 0.6)
          .fromTo(line, { drawSVG: "0%" }, { drawSVG: "100%", duration: 5 }, 1.8)
          .fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.8)
          .to(pen, { p: 1, duration: 5, onUpdate: movePen }, 1.8)
          .fromTo($("[data-tagline]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 4.4)
          .fromTo($("[data-underline]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9 }, 5.2)
          .to({}, { duration: 1.4 }); // hold the finished chart for a moment
      });

      mm.add(mq.reduced, () => {
        gsap.set($("[data-tagline]"), { opacity: 1 });
      });
    },
    { scope: section, dependencies: [size.w, size.h], revertOnUpdate: true },
  );

  const { w, h } = size;

  return (
    <section
      ref={section}
      aria-label="How good numbers lead to growth"
      className="relative h-[320svh] bg-night text-white motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh pb-6 pt-[calc(var(--header-h)+1rem)]">
        <p className="sr-only">{introGraph.srSummary}</p>

        <div className="wrap-wide h-full">
          <div className="relative h-full">
            {/* The plot area. Labels sit outside it to the left and below. */}
            <div ref={plot} className="absolute bottom-[5.5rem] left-[3.5rem] right-3 top-4 sm:left-16 sm:right-6">
              {w > 0 && (
                <svg
                  aria-hidden
                  width={w}
                  height={h}
                  viewBox={`0 0 ${w} ${h}`}
                  className="absolute inset-0 overflow-visible"
                >
                  {/* dashed gridlines */}
                  <g className="text-white/20" stroke="currentColor" strokeDasharray="3 8" strokeWidth={1}>
                    {xTicks.map((x) => (
                      <line key={`x${x}`} data-grid x1={(x / 100) * w} x2={(x / 100) * w} y1={0} y2={h} />
                    ))}
                    {yTicks.slice(1).map((y) => (
                      <line key={`y${y}`} data-grid x1={0} x2={w} y1={(y / 100) * h} y2={(y / 100) * h} />
                    ))}
                  </g>

                  {/* axes */}
                  <g className="text-white/60" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                    <path data-axis d={`M0 ${h} L${w} ${h}`} fill="none" />
                    <path data-axis d={`M0 ${h} L0 0`} fill="none" />
                  </g>

                  {/* the hand-drawn growth line */}
                  <path
                    data-line
                    d={toPath(introGraphPoints, w, h)}
                    fill="none"
                    className="text-gold"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {/* pen dot that rides the tip of the line */}
              <span
                data-dot
                aria-hidden
                className="absolute left-0 top-0 -ml-2 -mt-2 size-4 rounded-full bg-gold opacity-0 shadow-[0_0_0_6px_rgb(217_166_46/0.25)]"
              />

              {/* y labels (outer span positions, inner span is animated) */}
              {introGraph.yLabels.map((label, i) => (
                <span
                  key={label}
                  aria-hidden
                  className="absolute right-full mr-2 -translate-y-1/2 sm:mr-3"
                  style={{ top: `${yTicks[i]}%` }}
                >
                  <span
                    data-label
                    className={`block text-[0.7rem] font-medium sm:text-sm ${
                      i === introGraph.yLabels.length - 1 ? "text-gold" : "text-white/80"
                    }`}
                  >
                    {label}
                  </span>
                </span>
              ))}

              {/* x labels */}
              {introGraph.xLabels.map((label, i) => (
                <span
                  key={label}
                  aria-hidden
                  className="absolute top-full mt-3 -translate-x-1/2"
                  style={{ left: `${xTicks[i]}%` }}
                >
                  <span
                    data-label
                    className={`block whitespace-nowrap text-[0.7rem] font-medium sm:text-sm ${
                      i === introGraph.xLabels.length - 1 ? "text-gold" : "text-white/80"
                    }`}
                  >
                    {label}
                  </span>
                </span>
              ))}

              {/* caption + axis title */}
              <p
                data-label
                aria-hidden
                className="absolute left-0 top-full mt-10 max-w-full text-[0.7rem] leading-snug text-white/60 sm:text-xs"
              >
                {introGraph.yTitle} · {introGraph.caption}
              </p>

              {/* tagline in the middle of the chart (outer div positions, h2 is animated) */}
              <div className="absolute left-1/2 top-[30%] z-10 w-[min(34rem,84%)] -translate-x-1/2 -translate-y-1/2 sm:left-[46%] sm:top-[32%] sm:w-[min(34rem,94%)]">
                <h2
                  data-tagline
                  className="text-center font-display text-[clamp(1.45rem,0.8rem+2.9vw,3.6rem)] font-normal leading-[1.15] tracking-[-0.015em]"
                >
                  <span className="block">{introGraph.taglineTop}</span>
                  <span className="relative mt-1 inline-block">
                    {introGraph.taglineAccent}
                    <svg
                      aria-hidden
                      viewBox="0 0 300 14"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full overflow-visible text-gold"
                    >
                      <path
                        data-underline
                        d="M2 9 C60 3 120 12 180 6 S270 5 298 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
