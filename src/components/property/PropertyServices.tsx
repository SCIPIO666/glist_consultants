"use client";

import { useRef, useState, type PointerEvent } from "react";
import { gsap, ScrollTrigger, mq, useGSAP } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { DashField } from "@/components/ui/DashField";
import { propertyServices as copy } from "@/data/propertyServices";

type ServiceDisc = HTMLElement & { __serviceIndex?: number };
const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Full-screen rental property services scene.
 * The page itself is the scroller: ScrollTrigger pins the scene and scrubs
 * every glass disc bottom -> centre -> top. This intentionally avoids a nested
 * overflow scroller so Lenis and ScrollTrigger stay in sync.
 */
export function PropertyServices() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollTo } = useSmoothScroll();
  const total = copy.items.length;

  useGSAP(() => {
    const section = root.current;
    if (!section) return;

    const discs = gsap.utils.toArray<ServiceDisc>("[data-service-disc]", section);
    const contents = gsap.utils.toArray<HTMLElement>("[data-service-content]", section);
    if (!discs.length) return;

    const mm = gsap.matchMedia();

    mm.add(mq.pin, () => {
      // Keep all but the first disc out of view before the first scroll tick.
      gsap.set(discs, { autoAlpha: 0, yPercent: 115, scale: 0.84, rotation: -10 });
      gsap.set(contents, { autoAlpha: 0, y: 18 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "property-services-orbit",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(total - 1, Math.floor(self.progress * total));
            setActive((current) => (current === next ? current : next));
          },
        },
      });

      const step = 1.35; // one complete scroll beat per service
      const enterDuration = 0.34;
      const centreHold = 0.56;
      const exitDuration = 0.45;

      discs.forEach((disc, index) => {
        const content = contents[index];
        const at = index * step;
        const exitAt = at + enterDuration + centreHold;

        // Arrive from below and settle precisely in the centre.
        timeline.to(disc, {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: enterDuration,
          ease: "power2.out",
        }, at);

        // Reveal the copy after the disc has begun to settle, then keep it
        // fully visible for the entire centre pause.
        if (content) {
          timeline.to(content, {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            ease: "power2.out",
          }, at + 0.16);
        }

        if (index < total - 1) {
          // The full circle and its readable copy pause together before
          // the circle travels out through the top of the stage.
          timeline.to(disc, {
            yPercent: -118,
            autoAlpha: 0,
            scale: 0.9,
            rotation: 8,
            duration: exitDuration,
            ease: "power2.in",
          }, exitAt);

          if (content) {
            // Keep the description readable through most of the outro;
            // fade it only as the circle is nearly leaving the stage.
            timeline.to(content, {
              autoAlpha: 0,
              y: -10,
              duration: 0.18,
              ease: "power1.in",
            }, exitAt + 0.24);
          }
        } else {
          // The final service remains centred and fully readable at the end.
          timeline.to({}, { duration: centreHold + exitDuration }, at + enterDuration);
        }
      });

      // The decorative orbit is invisible; its slow rotation adds subtle depth
      // without competing with the scroll-controlled service transitions.
      gsap.to("[data-service-orbit]", {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        ScrollTrigger.getById("property-services-orbit")?.kill();
      };
    });

    // Short screens and reduced-motion users get a normal, readable service list.
    mm.add("(prefers-reduced-motion: reduce), (max-height: 559px)", () => {
      gsap.set(discs, { clearProps: "all", autoAlpha: 1, yPercent: 0, scale: 1, rotation: 0 });
      gsap.set(contents, { clearProps: "all", autoAlpha: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: root, dependencies: [total] });

  const jumping = useRef(false);

  /**
   * Skip to a service. Scrolling there would fly through every disc in between, so instead
   * the stage softly fades away, the page jumps while nothing is visible, and the chosen
   * disc fades in already settled in the centre. (Centre of a disc's hold = 0.46 of its beat.)
   */
  const jumpTo = (index: number) => {
    const section = root.current;
    if (!section || jumping.current || index === active) return;
    const target = (index + 0.46) * window.innerHeight;
    const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]", section);
    if (!ScrollTrigger.getById("property-services-orbit")) {
      scrollTo(section, target); // flat / reduced-motion layouts: plain scroll
      return;
    }
    jumping.current = true;
    gsap
      .timeline({ onComplete: () => { jumping.current = false; } })
      .to(panels, { opacity: 0, scale: 0.94, duration: 0.3, ease: "power2.in" })
      .add(() => scrollTo(section, target, { immediate: true }))
      .to(panels, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, "+=0.8");
  };

  /** Hover: the glass disc turns a full sideways flip and lifts; leaving settles it back. */
  const flipIn = (el: HTMLElement, e: PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { scale: 1.045, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    if (el.dataset.flipping) return;
    el.dataset.flipping = "1";
    gsap.to(el, {
      rotationY: 360,
      transformPerspective: 1500,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => { gsap.set(el, { rotationY: 0 }); delete el.dataset.flipping; },
    });
  };
  const flipOut = (el: HTMLElement) => gsap.to(el, { scale: 1, duration: 0.7, ease: "power2.out", overwrite: "auto" });

  return (
    <section
      ref={root}
      aria-labelledby="property-services-title"
      className="property-services-root relative isolate bg-linear-to-br from-night via-[#073440] to-[#0a2c58] text-white"
      style={{ height: `${(total + 1) * 100}svh` }}
    >
      <div className="sticky top-0 grid h-svh min-h-[34rem] grid-rows-[auto_minmax(0,1fr)] overflow-hidden lg:grid-rows-1 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] flat:static flat:h-auto flat:min-h-svh">
        {/* Fixed service index */}
        <aside
          data-service-sidebar
          className="relative z-20 flex min-h-0 flex-col justify-center px-6 py-5 sm:px-9 lg:px-[clamp(2rem,5vw,5.5rem)] lg:py-12"
        >
          <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/45">Glist Consultants</p>
          <h2 id="property-services-title" className="mb-5 text-[clamp(1.7rem,3.2vw,3.4rem)] font-medium leading-none tracking-[-0.055em]">
            Property Management Services<span className="text-kra">.</span>
          </h2>
          <nav aria-label="Rental property management services" className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-4 lg:grid-cols-1 lg:gap-y-2">
            {copy.items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => jumpTo(index)}
                aria-current={active === index ? "step" : undefined}
                className={`group flex min-w-0 items-start gap-2 text-left text-[0.7rem] leading-snug transition-colors duration-300 sm:text-sm lg:text-[clamp(0.82rem,1.05vw,1rem)] ${active === index ? "text-white" : "text-white/45 hover:text-white/85"}`}
              >
                <span className={`mt-[0.48em] h-px shrink-0 transition-all duration-300 ${active === index ? "w-4 bg-kra" : "w-2 bg-white/30 group-hover:w-3"}`} />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-4 lg:mt-8">
            <Button href={copy.cta.href} size="md" arrow>{copy.cta.label}</Button>
            <span className="font-mono text-xs tabular-nums text-white/45">
              <span className="text-kra">{pad(active + 1)}</span> / {pad(total)}
            </span>
          </div>
        </aside>

        {/* Brand-colour stage: pinned while the document scroll scrubs the discs. */}
        <div className="relative isolate min-h-[27rem] lg:min-h-0 flat:grid flat:grid-cols-1 flat:gap-5 flat:overflow-visible flat:px-5 flat:py-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* corner patterns: top-right and the opposite bottom-left */}
            <DashField focus="top-right" variant="ripple" className="absolute right-0 top-0 h-[min(60%,34rem)] w-[min(70%,42rem)] opacity-60" />
            <DashField focus="bottom-left" variant="ripple" className="absolute bottom-0 left-0 h-[min(60%,34rem)] w-[min(70%,42rem)] opacity-60" />
            <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
            <span className="absolute right-6 top-6 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/35 sm:right-8">Property management / Services</span>
          </div>

          {/* Invisible circular track: only the glass discs are visible. */}
          <div data-service-orbit aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(76vw,78svh,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full">
            <span className="absolute -top-[10%] left-1/2 size-[46%] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgb(217 166 46 / 0.62), rgb(217 166 46 / 0))" }} />
            <span className="absolute -right-[12%] top-1/2 size-[50%] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgb(74 144 226 / 0.65), rgb(74 144 226 / 0))" }} />
            <span className="absolute -bottom-[10%] left-1/2 size-[46%] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgb(45 190 175 / 0.5), rgb(45 190 175 / 0))" }} />
            <span className="absolute -right-[4%] -top-[6%] size-[44%] rounded-full blur-2xl" style={{ background: "radial-gradient(closest-side, rgb(228 32 43 / 0.7), rgb(228 32 43 / 0))" }} />
            <span className="absolute -bottom-[6%] -left-[4%] size-[44%] rounded-full blur-2xl" style={{ background: "radial-gradient(closest-side, rgb(228 32 43 / 0.55), rgb(228 32 43 / 0))" }} />
            <span className="absolute -left-[12%] top-1/2 size-[50%] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgb(31 111 214 / 0.6), rgb(31 111 214 / 0))" }} />
          </div>

          {copy.items.map((item, index) => (
            <article
              key={item.title}
              data-service-panel
              aria-label={`${item.title} service`}
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-4 py-8 sm:px-8 lg:px-12 flat:pointer-events-auto flat:static flat:min-h-[32rem]"
            >
              <div
                data-service-flip
                onPointerEnter={(e) => flipIn(e.currentTarget, e)}
                onPointerLeave={(e) => flipOut(e.currentTarget)}
                className="pointer-events-auto relative aspect-square w-[min(78vw,66svh,34rem)] lg:w-[min(48vw,70svh,42rem)] flat:mx-auto"
              >
                <div
                  data-service-disc
                  className="service-glass-disc relative grid size-full place-items-center overflow-hidden rounded-full bg-white/[0.12] p-7 text-center backdrop-blur-lg backdrop-saturate-150 shadow-[0_30px_80px_-24px_rgba(0,0,0,.5),inset_0_0_60px_rgba(255,255,255,.06)] transition-shadow duration-500 ease-out hover:shadow-[0_60px_120px_-24px_rgba(0,0,0,.7),0_0_90px_rgba(74,144,226,.22),inset_0_0_70px_rgba(255,255,255,.1)] sm:p-10 lg:backdrop-blur-xl"
                  style={{
                    background: "radial-gradient(circle at 28% 18%, rgba(255,255,255,.24), transparent 40%), linear-gradient(145deg, rgba(255,255,255,.17), rgba(255,255,255,.05) 55%, rgba(255,255,255,.1))",
                  }}
                >
                <div data-service-content className="relative z-10 mx-auto flex w-full max-w-[28rem] flex-col items-center">
                  <span className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-kra sm:mb-6">
                    {pad(index + 1)} <span className="text-white/40">/ {pad(total)}</span>
                  </span>
                  <h3 className="text-[clamp(1.2rem,2.4vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.045em] text-white">{item.title}</h3>
                  <p className="mt-4 max-w-[34ch] text-[clamp(0.86rem,1.08vw,1.04rem)] leading-[1.8] text-white/85 sm:mt-5">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-kra sm:mt-7">
                    Managed with care <ArrowRight className="size-3" />
                  </span>
                </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (prefers-reduced-motion: reduce), (max-height: 559px) {
          .property-services-root { height: auto !important; }
        }
        .service-glass-disc {
          will-change: transform, opacity;
          isolation: isolate;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-glass-disc { will-change: auto; }
        }
      `}</style>
    </section>
  );
}
