"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "@/components/ui/icons";
import { services } from "@/data/services";
import { listingCopy, listingImages } from "@/data/servicesPage";

/**
 * The full list: one row per service with a hairline above it. Number and title on the left,
 * the description and task list in the middle, a photo on the right, and an enquiry link that
 * opens the contact form for that service. Each row has the service slug as its id, so the
 * rail above and the home-page wheel can link straight to it.
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
          const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, row);
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: row, start: "top 78%", toggleActions: "play none none reverse" },
          });
          tl.fromTo(q("[data-row-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "0% 50%" }, 0)
            // left: number, then title, slide in from the left
            .fromTo(q("[data-row-num]"), { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 1 }, 0.1)
            .fromTo(q("[data-row-title]"), { opacity: 0, x: -90 }, { opacity: 1, x: 0, duration: 1.1 }, 0.2)
            // middle: intro, bullets one by one, link rise up
            .fromTo(q("[data-row-mid]"), { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1, stagger: 0.07 }, 0.3)
            // right: the photo wipes in from the right while settling
            .fromTo(q("[data-row-img]"), { opacity: 1, x: 90, clipPath: "inset(0% 0% 0% 100%)" }, { x: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.out" }, 0.25)
            .fromTo(q("[data-row-img] img"), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0.25);
        });
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-row-num],[data-row-title],[data-row-mid],[data-row-img]", { opacity: 1 });
        gsap.set("[data-row-line]", { scaleX: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="service-list" aria-label={listingCopy.srLabel} className="bg-paper pb-[clamp(4rem,10svh,8rem)] text-ink">
      <ol className="wrap-wide">
        {services.map((s, i) => {
          const img = listingImages[s.slug] ?? { src: s.image, alt: "" };
          return (
            <li key={s.slug} id={s.slug} data-row className="relative scroll-mt-[calc(var(--header-h)+1rem)]">
              <span aria-hidden data-row-line className="absolute inset-x-0 top-0 h-px scale-x-0 bg-ink/20 motion-reduce:scale-x-100" />
              <div className="grid gap-8 py-[clamp(2.5rem,7svh,5rem)] lg:grid-cols-[0.8fr_1.1fr_1fr] lg:gap-12">
                <div className="flex items-start gap-5">
                  <span aria-hidden data-row-num className="font-display text-2xl font-light text-cta opacity-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 data-row-title className="opacity-0 text-[clamp(1.6rem,1rem+1.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em]">{s.title}</h2>
                </div>

                <div>
                  <p data-row-mid className="max-w-[46ch] text-ink-muted opacity-0">{s.intro}</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-ink-muted sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} data-row-mid className="flex gap-2.5 opacity-0">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    data-row-mid
                    href={`/contact?service=${s.slug}`}
                    className="group mt-7 opacity-0 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
                  >
                    {listingCopy.enquire}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                <div data-row-img className="relative aspect-[4/3] overflow-hidden bg-night lg:self-start [clip-path:inset(0_0_0_100%)] motion-reduce:[clip-path:none]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    quality={70}
                    className="object-cover"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
