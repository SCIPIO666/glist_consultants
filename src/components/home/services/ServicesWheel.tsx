"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { services } from "@/data/services";
import { servicesSection as copy } from "@/data/servicesSection";
import { serviceIcons } from "./ServiceIcons";

const N = services.length;
const STEP = 360 / N; // degrees per panel
const GAP_DEG = 1.4; // visible gap between panels
const R_OUT = 0.46; // outer radius, as a fraction of the wheel box
const R_IN = 0.2; // hub radius
const R_MID = (R_OUT + R_IN) / 2 + 0.02; // where icon + label sit
const LIFT = 0.022; // how far a hovered panel moves outward (fraction of the box)

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (deg: number, r: number) => `${(0.5 + r * Math.sin(rad(deg))).toFixed(4)} ${(0.5 - r * Math.cos(rad(deg))).toFixed(4)}`;

/** Ring-sector path in 0..1 box units (used with clipPathUnits="objectBoundingBox"). Panel 0 is centred at 12 o'clock. */
function sectorPath(i: number) {
  const a0 = i * STEP - STEP / 2 + GAP_DEG / 2;
  const a1 = i * STEP + STEP / 2 - GAP_DEG / 2;
  return `M ${pt(a0, R_IN)} L ${pt(a0, R_OUT)} A ${R_OUT} ${R_OUT} 0 0 1 ${pt(a1, R_OUT)} L ${pt(a1, R_IN)} A ${R_IN} ${R_IN} 0 0 0 ${pt(a0, R_IN)} Z`;
}

const clipId = (i: number) => `gc-wheel-sector-${i}`;

/**
 * A wheel of seven clickable panels, one per service. Scrolling reveals it clockwise from
 * the 12 o'clock panel (scrubbed, so scrolling back un-reveals it). It is pinned by the
 * parent section, which is why the scrub trigger is the closest <section>.
 *
 * Hover / focus: the panel lifts out of the wheel with a deeper shadow and the service photo
 * fades in as its background. Layers (each owns one job, so GSAP and CSS never fight):
 *   outer   - GSAP scrub (opacity / scale / rotate)
 *   lift    - CSS translate + drop-shadow on hover
 *   link    - clip-path sector (also the hit area) holding colour, photo, icon and label
 */
export function ServicesWheel() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const host = root.current;
      const section = host?.closest("section");
      if (!host || !section) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-sector]", host).slice(1); // 12 o'clock one is visible from the start
      const mm = gsap.matchMedia();

      mm.add(mq.pin, () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.to({}, { duration: 0.3 }); // short rest before the first reveal
        panels.forEach((p, i) => {
          tl.fromTo(
            p,
            { autoAlpha: 0, scale: 0.55, rotation: -STEP },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 1 },
            0.3 + i * 0.75,
          );
        });
        tl.to({}, { duration: 0.8 }); // rest on the full wheel
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="@container relative mx-auto aspect-square w-[min(100%,54svh)] lg:w-[min(100%,78svh)] lg:max-w-[40rem] flat:w-full flat:max-w-[32rem]">
      {/* Clip paths: zero-size, not display:none (that would break the references) */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          {services.map((s, i) => (
            <clipPath key={s.slug} id={clipId(i)} clipPathUnits="objectBoundingBox">
              <path d={sectorPath(i)} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* Hub */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 grid size-[36%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-night-deep"
      >
        <div className="text-center leading-none">
          <p className="font-display text-[11cqw] font-medium text-gold">{String(N).padStart(2, "0")}</p>
          <p className="mt-[1.4cqw] text-[2.4cqw] font-semibold uppercase tracking-[0.22em] text-white/70">services</p>
        </div>
      </div>

      <ul aria-label={copy.srListLabel} className="absolute inset-0">
        {services.map((s, i) => {
          const a = i * STEP;
          const Icon = serviceIcons[s.slug];
          const label = copy.wheelLabels[s.slug] ?? s.title;
          const style = {
            "--lx": `${(LIFT * Math.sin(rad(a)) * 100).toFixed(2)}cqw`,
            "--ly": `${(-LIFT * Math.cos(rad(a)) * 100).toFixed(2)}cqw`,
            "--cx": `${((0.5 + R_MID * Math.sin(rad(a))) * 100).toFixed(2)}%`,
            "--cy": `${((0.5 - R_MID * Math.cos(rad(a))) * 100).toFixed(2)}%`,
          } as CSSProperties;
          return (
            <li
              key={s.slug}
              data-sector
              style={style}
              className={
                "pointer-events-none absolute inset-0 hover:z-10 focus-within:z-10 " +
                (i === 0 ? "" : "invisible opacity-0 flat:visible flat:opacity-100")
              }
            >
              <div className="pointer-events-none size-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.28)] transition-[translate,filter] duration-500 ease-out-expo [li:hover>&]:translate-x-[var(--lx)] [li:hover>&]:translate-y-[var(--ly)] [li:hover>&]:drop-shadow-[0_26px_30px_rgba(0,0,0,0.6)] [li:focus-within>&]:translate-x-[var(--lx)] [li:focus-within>&]:translate-y-[var(--ly)] [li:focus-within>&]:drop-shadow-[0_26px_30px_rgba(0,0,0,0.6)]">
                <Link
                  href={`/services#${s.slug}`}
                  aria-label={s.title}
                  style={{ clipPath: `url(#${clipId(i)})` }}
                  className="group pointer-events-auto absolute inset-0 block overflow-hidden bg-night-card outline-none"
                >
                  {/* Panel colour (alternates a touch so neighbours read apart) */}
                  <span
                    aria-hidden
                    className={
                      "absolute inset-0 transition-opacity duration-500 " +
                      (i % 2 === 0 ? "bg-night-card" : "bg-[#0e444c]")
                    }
                  />
                  {/* Photo: only on hover / focus */}
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 640px, 90vw"
                    quality={60}
                    className="object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out-expo scale-110 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-night-deep/0 transition-colors duration-500 group-hover:bg-night-deep/55 group-focus-visible:bg-night-deep/55"
                  />
                  {/* Light edge so the lifted panel has depth */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25 opacity-100"
                  />
                  <span
                    className="absolute flex w-[21%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[1.4cqw] text-center text-white"
                    style={{ left: "var(--cx)", top: "var(--cy)" }}
                  >
                    {Icon && <Icon className="size-[6.4cqw] text-gold transition-transform duration-500 ease-out-expo group-hover:scale-110 group-focus-visible:scale-110" />}
                    <span className="text-[max(0.66rem,2.7cqw)] font-semibold leading-tight">{label}</span>
                  </span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
