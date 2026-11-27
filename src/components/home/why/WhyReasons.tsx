"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "@/components/ui/icons";
import { whyReasons as copy } from "@/data/whyUs";
import { whyIcons } from "./WhyIcons";

/**
 * Colours for this block (a deeper, calmer red than the brand's bright KRA red).
 * Change them here to retune the whole composition.
 */
const INK = "#002025"; // site night teal: title, badges
const INK_DEEP = "#001519";
const DISC = "#0b3a41"; // the big disc (site night-card teal)
const PAGE = "#eef2f4"; // section background: cool light, matches the site's mist/sand
const CREAM = "#ffffff"; // big circle + pills + phone card
const ACCENT = "#d9a62e"; // gold: question mark, button, orbit dot
const ACCENT_HOVER = "#c4931f";
const RING = "#1f6fd6"; // site blue: the thin ring
const BODY = "#3f5a60"; // pill paragraph
const WINE = INK; // (kept for the helper names below)
const WINE_DEEP = INK_DEEP;

/**
 * Desktop geometry. Everything hangs off two CSS variables set on the section:
 *   --H  stage height  = max(100svh, 46rem)   (never shorter than 46rem, so nothing gets squeezed)
 *   --S  stage size    = min(0.94 H, 56vw)
 * The circles share one centre at (CX, CY) in units of S; the pills sit on a ring of radius R.
 */
const ANGLES = [-42, -15, 15, 42]; // degrees around the ring, top to bottom
const CX = 0.26;
const CY = 0.5;
const R = 0.64;

function Title({ lines, id, className, layout }: { lines: string[]; id?: string; className: string; layout: "d" | "m" }) {
  const last = lines.length - 1;
  return (
    <h2 id={id} className={className} style={{ color: WINE }}>
      {lines.map((line, i) => (
        // Each line sits in its own clipping box so it can slide up out of it.
        <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <span
            {...{ [`data-${layout}`]: "line" }}
            // The last line ("us?") is smaller and bolder, like the inspiration.
            className={i === last ? "block text-[0.72em] font-semibold" : "block"}
          >
            {line.endsWith("?") ? (
              <>
                {line.slice(0, -1)}
                <span style={{ color: ACCENT }}>?</span>
              </>
            ) : (
              line
            )}
          </span>
        </span>
      ))}
    </h2>
  );
}

function Cta({ className = "" }: { className?: string }) {
  return (
    <Link
      href={copy.cta.href}
      className={`group inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8 text-base font-semibold text-[#001519] transition-[background-color,transform] duration-300 ease-out-expo hover:bg-(--hover) active:scale-[0.98] ${className}`}
      style={{ background: ACCENT, "--hover": ACCENT_HOVER } as CSSProperties}
    >
      <span>{copy.cta.label}</span>
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** One reason as a cream pill with a dark icon badge at its left end. */
function Pill({ item, index, layout }: { item: { title: string; text: string }; index: number; layout: "d" | "m" }) {
  const Icon = whyIcons[index % whyIcons.length];
  const a = ANGLES[index % ANGLES.length];
  const style =
    layout === "d"
      ? ({
          "--pill-x": `calc(var(--S) * ${CX} + var(--S) * ${R} * cos(${a}deg) - var(--pill-h) / 2)`,
          "--pill-y": `calc(var(--S) * ${CY} + var(--S) * ${R} * sin(${a}deg) - var(--pill-h) / 2)`,
        } as CSSProperties)
      : undefined;

  return (
    <li
      data-pill
      data-layout={layout}
      style={style}
      className={
        layout === "d"
          ? "absolute left-(--pill-x) top-(--pill-y) h-(--pill-h) w-[calc(var(--pill-w)+var(--pill-h)/2)] [--pill-h:clamp(5.25rem,calc(var(--S)*0.12),6.75rem)] [--pill-w:clamp(18rem,calc(var(--S)*0.5),26rem)]"
          : "relative [--pill-h:5rem]"
      }
    >
      <div className={layout === "d" ? "relative h-full" : "relative"}>
        <span
          data-badge
          aria-hidden
          className="absolute left-0 top-0 z-10 grid size-(--pill-h) place-items-center rounded-full text-[#e8c25a]"
          style={{ background: WINE_DEEP, boxShadow: `0 0 0 5px ${PAGE}, 0 8px 22px -6px rgba(0,32,37,.45)` }}
        >
          <Icon className="size-[44%]" />
        </span>
        <div
          data-pill-body
          className={`ml-[calc(var(--pill-h)/2)] flex flex-col justify-center rounded-[2.25rem] py-3 pl-[calc(var(--pill-h)/2_+_1rem)] pr-6 shadow-[0_12px_32px_-12px_rgba(0,32,37,0.35)] ring-1 ring-[#002025]/10 lg:rounded-full lg:pr-8 ${
            layout === "d" ? "h-full" : "min-h-(--pill-h)"
          }`}
          style={{ background: CREAM }}
        >
          <h3 className="text-[clamp(1rem,0.9rem+0.3vw,1.25rem)] font-semibold leading-tight" style={{ color: WINE }}>
            {item.title}
          </h3>
          <p className="mt-1 text-[clamp(0.78rem,0.72rem+0.18vw,0.92rem)] leading-snug" style={{ color: BODY }}>
            {item.text}
          </p>
        </div>
      </div>
    </li>
  );
}

/**
 * Why us, part 1 of 3 (from the red-circle inspiration).
 *
 *  DESKTOP  A big cream circle (cropped by the left edge) holds the title and button. A deep red
 *           disc and a thin ring sit around it. Four roomy pill reasons sit on the ring, and a
 *           small gold dot orbits it slowly.
 *  PHONES   A cream card with the title and button, then the four pills stacked.
 *
 * Entry (plays once, on scroll): the discs grow from their centre, the ring draws, the title
 * slides up line by line, then the pills arrive one after another with their badges popping in.
 * Reduced motion: everything is simply there.
 */
export function WhyReasons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel, el);
      const mm = gsap.matchMedia();

      const pillIn = (pill: HTMLElement, fromX: number) => {
        const tl = gsap.timeline();
        tl.fromTo(pill, { x: fromX, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0)
          .fromTo(pill.querySelector("[data-badge]"), { scale: 0 }, { scale: 1, duration: 0.7, ease: "back.out(1.8)" }, 0.15)
          .fromTo(pill.querySelector("[data-pill-body]"), { clipPath: "inset(0 100% 0 0 round 999px)" }, { clipPath: "inset(0 0% 0 0 round 999px)", duration: 0.9, ease: "power3.out" }, 0.1);
        return tl;
      };

      mm.add(`${mq.motionOk} and ${mq.desktop}`, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", once: true } });
        tl.fromTo(q("[data-d=disc]"), { scale: 0.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out", stagger: 0.16 }, 0)
          .fromTo(q("[data-d=ring]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.8, ease: "power2.inOut" }, 0.35)
          .fromTo(q("[data-d=faint]"), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.6)
          .fromTo(q("[data-d=line]"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.12 }, 0.8)
          .fromTo(q("[data-d=cta]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 1.25);

        q<HTMLElement>("[data-pill][data-layout=d]").forEach((pill, i) => {
          tl.add(pillIn(pill, 110), 1.1 + i * 0.22);
        });

        // A small gold dot circles the ring, slowly, forever.
        const orbit = q<HTMLElement>("[data-d=orbit]");
        tl.fromTo(orbit, { opacity: 0 }, { opacity: 1, duration: 1 }, 2.4);
        const spin = gsap.to(orbit, { rotation: 360, duration: 70, ease: "none", repeat: -1, transformOrigin: "0 0" });
        return () => spin.kill();
      });

      mm.add(`${mq.motionOk} and ${mq.mobile}`, () => {
        const card = q<HTMLElement>("[data-m=card]");
        gsap
          .timeline({ scrollTrigger: { trigger: card[0], start: "top 85%", once: true } })
          .fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0)
          .fromTo(q("[data-m=line]"), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.25)
          .fromTo(q("[data-m=cta]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.7);

        q<HTMLElement>("[data-pill][data-layout=m]").forEach((pill) => {
          gsap.timeline({ scrollTrigger: { trigger: pill, start: "top 92%", once: true } }).add(pillIn(pill, 70));
        });
      });
    },
    { scope: root },
  );

  const lines = copy.titleLines;

  return (
    <section
      ref={root}
      aria-label={copy.srLabel}
      className="relative isolate overflow-hidden"
      style={
        {
          "--H": "max(100svh, 46rem)",
          "--S": "min(calc(var(--H) * 0.94), 56vw)",
          background: `radial-gradient(110% 90% at 30% 50%, #f8fafb 0%, ${PAGE} 55%, #dde6ea 100%)`,
        } as CSSProperties
      }
    >
      {/* Soft glow top right, so the dark corner is not flat */}
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[34rem] rounded-full blur-[120px]" style={{ background: "rgba(31,111,214,0.12)" }} />

      {/* ============ DESKTOP STAGE ============ */}
      <div className="relative hidden h-(--H) lg:block">
        <div className="absolute top-1/2 -mt-[calc(var(--S)/2)] size-(--S) left-[max(calc(var(--S)*-0.08),calc((100vw-1.55*var(--S))*0.35))]">
          {/* Faint outer ring for depth */}
          <div
            data-d="faint"
            aria-hidden
            className="absolute rounded-full border border-dashed border-[#002025]/20"
            style={{ left: `calc(var(--S) * ${CX - 0.84})`, top: `calc(var(--S) * ${CY - 0.84})`, width: "calc(var(--S) * 1.68)", height: "calc(var(--S) * 1.68)" }}
          />
          {/* Red disc */}
          <div
            data-d="disc"
            aria-hidden
            className="absolute rounded-full shadow-[inset_0_0_90px_rgba(0,21,25,0.45)]"
            style={{ left: `calc(var(--S) * ${CX - 0.54})`, top: `calc(var(--S) * ${CY - 0.54})`, width: "calc(var(--S) * 1.08)", height: "calc(var(--S) * 1.08)", background: DISC }}
          />
          {/* Cream circle: holds the title */}
          <div
            data-d="disc"
            aria-hidden
            className="absolute rounded-full shadow-[0_30px_80px_-20px_rgba(0,21,25,0.55)]"
            style={{ left: `calc(var(--S) * ${CX - 0.46})`, top: `calc(var(--S) * ${CY - 0.46})`, width: "calc(var(--S) * 0.92)", height: "calc(var(--S) * 0.92)", background: CREAM }}
          />
          {/* Thin ring the pills sit on */}
          <svg
            aria-hidden
            viewBox="0 0 1000 1000"
            className="pointer-events-none absolute max-w-none overflow-visible"
            style={{ left: `calc(var(--S) * ${CX - R})`, top: `calc(var(--S) * ${CY - R})`, width: `calc(var(--S) * ${R * 2})`, height: `calc(var(--S) * ${R * 2})` }}
          >
            <circle data-d="ring" cx="500" cy="500" r="498" fill="none" stroke={RING} strokeWidth="2.4" />
          </svg>
          {/* Gold dot orbiting the ring (the wrapper is a zero-size point at the circles' centre) */}
          <div data-d="orbit" aria-hidden className="absolute size-0" style={{ left: `calc(var(--S) * ${CX})`, top: `calc(var(--S) * ${CY})` }}>
            <span className="absolute size-3 rounded-full bg-gold shadow-[0_0_16px_rgba(217,166,46,0.9)]" style={{ left: `calc(var(--S) * ${R} - 0.375rem)`, top: "-0.375rem" }} />
          </div>

          {/* Title and button inside the cream circle */}
          <div
            className="absolute top-0 flex h-full flex-col justify-center"
            style={{ left: `calc(var(--S) * ${CX - 0.46} + var(--S) * 0.17)`, width: `calc(var(--S) * 0.5)` }}
          >
            <Title
              lines={lines}
              id="why-title"
              className="font-display font-medium leading-[0.98] tracking-[-0.035em] text-[length:calc(var(--S)*0.115)]"
              layout="d"
            />
            <div data-d="cta" className="mt-[calc(var(--S)*0.05)]">
              <Cta />
            </div>
          </div>

          {/* The four reasons, on the ring */}
          <ul role="list" aria-label={copy.srListLabel}>
            {copy.items.map((item, i) => (
              <Pill key={item.title} item={item} index={i} layout="d" />
            ))}
          </ul>
        </div>
      </div>

      {/* ============ PHONES AND TABLETS ============ */}
      <div className="relative px-[var(--gutter)] pb-20 pt-[calc(var(--header-h)+1.5rem)] lg:hidden">
        {/* Echo of the desktop rings, behind the card */}
        <div aria-hidden className="pointer-events-none absolute -left-32 top-24 -z-10 size-[26rem] rounded-full shadow-[inset_0_0_60px_rgba(0,21,25,0.45)]" style={{ background: DISC }} />
        <div aria-hidden className="pointer-events-none absolute -right-48 top-8 -z-10 size-[32rem] rounded-full border border-[#002025]/20" />

        <div data-m="card" className="relative rounded-[2.25rem] p-8 shadow-[0_30px_70px_-24px_rgba(0,32,37,0.45)] ring-1 ring-[#002025]/10 sm:p-12" style={{ background: CREAM }}>
          <Title
            lines={lines}
            className="font-display text-[clamp(3rem,2rem+5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.035em]"
            layout="m"
          />
          <div data-m="cta" className="mt-8">
            <Cta />
          </div>
        </div>

        <ul role="list" aria-label={copy.srListLabel} className="mt-10 space-y-5">
          {copy.items.map((item, i) => (
            <Pill key={item.title} item={item} index={i} layout="m" />
          ))}
        </ul>
      </div>
    </section>
  );
}
