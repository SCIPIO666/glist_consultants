"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { ArrowRight, WhatsApp } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { services } from "@/data/services";
import { serviceWhatsappUrl } from "@/data/whatsappTemplates";
import { listingCopy, listingImages } from "@/data/servicesPage";
import { donutShapes, servicesBreakdown } from "@/data/servicesBreakdown";
import { ServiceDonut } from "./ServiceDonut";

/**
 * The full list, donut style: one row per service on a dark band. Number, title, intro and
 * the enquiry link sit on one side; on the other is a donut (half, three-quarter or full, set
 * per service in data/servicesBreakdown.ts) whose segments are what the service covers; hover
 * one for a glass panel with a short breakdown. Rows alternate sides.
 * Each row has the service slug as its id, so the rail above and the home-page wheel can
 * link straight to it.
 */
export function ServicesListing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        gsap.utils.toArray<HTMLElement>("[data-row]", el).forEach((row) => {
          const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel, row);
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none reverse" },
          });
          tl.fromTo(q("[data-row-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "0% 50%" }, 0)
            .fromTo(q("[data-row-num]"), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1 }, 0.1)
            .fromTo(q("[data-row-title]"), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 1.1 }, 0.2)
            .fromTo(q("[data-row-mid]"), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.3)
            // the donut fans open: segments swing out from the centre of the flat edge, one by one
            .fromTo(
              q("[data-seg]"),
              { opacity: 0, scale: 0.55, svgOrigin: "100 100" },
              { opacity: 1, scale: 1, svgOrigin: "100 100", duration: 0.9, ease: "back.out(1.4)", stagger: 0.08 },
              0.3,
            )
            .fromTo(q("[data-seg-label]"), { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.08 }, 0.7);
        });
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-row-num],[data-row-title],[data-row-mid]", { opacity: 1 });
        gsap.set("[data-row-line]", { scaleX: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="service-list" aria-label={listingCopy.srLabel} className="bg-night-deep bg-[radial-gradient(60rem_42rem_at_100%_0%,rgb(228_32_43/0.30),transparent_65%),radial-gradient(52rem_40rem_at_0%_55%,rgb(228_32_43/0.18),transparent_65%),radial-gradient(56rem_40rem_at_100%_100%,rgb(228_32_43/0.24),transparent_65%)] pb-[clamp(4rem,10svh,8rem)] pt-[clamp(2rem,6svh,4rem)] text-white">
      <ol className="wrap-wide">
        {services.map((s, i) => {
          const img = listingImages[s.slug] ?? { src: s.image, alt: "" };
          const bd = servicesBreakdown[s.slug] ?? [];
          const tasks = s.items.map((text, k) => ({
            label: bd[k]?.label ?? text.replace(/\.$/, ""),
            detail: bd[k]?.detail ?? text,
          }));
          const flip = i % 2 === 1;
          return (
            <li key={s.slug} id={s.slug} data-row className="relative scroll-mt-[calc(var(--header-h)+1rem)]">
              <span aria-hidden data-row-line className="absolute inset-x-0 top-0 h-px scale-x-0 bg-white/15 motion-reduce:scale-x-100" />
              <div
                className={cn(
                  "grid items-center gap-6 py-[clamp(4.5rem,11svh,9rem)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-20",
                  flip && "lg:grid-cols-[1.2fr_0.8fr] lg:[&>*:first-child]:order-2",
                )}
              >
                <div>
                  <div className="flex items-start gap-5">
                    <span aria-hidden data-row-num className={cn("font-display text-2xl font-light opacity-0", "font-semibold text-kra-light")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2
                      data-row-title
                      className="text-[clamp(1.75rem,1rem+2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] opacity-0"
                    >
                      {s.title}
                    </h2>
                  </div>
                  <p data-row-mid className="mt-6 max-w-[46ch] text-white/75 opacity-0">
                    {s.intro}
                  </p>
                  <div data-row-mid className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-0">
                    <Link
                      href={`/contact?service=${s.slug}`}
                      className="group inline-flex items-center gap-2 border-b-2 border-white pb-1 text-sm font-semibold transition-colors hover:border-kra-light hover:text-kra-light"
                    >
                      {listingCopy.enquire}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={serviceWhatsappUrl(s.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat on WhatsApp about ${s.title}`}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-whatsapp text-2xl text-night-deep shadow-lift transition-transform duration-300 hover:scale-110"
                    >
                      <WhatsApp />
                    </a>
                  </div>
                </div>

                <ServiceDonut slug={s.slug} title={s.title} image={img} tasks={tasks} shape={donutShapes[s.slug] ?? "top"} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
