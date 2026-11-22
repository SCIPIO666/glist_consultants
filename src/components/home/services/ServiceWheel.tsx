import Image from "next/image";
import { Logo } from "@/components/layout/Logo";
import { services } from "@/data/services";
import { servicesSection } from "@/data/servicesSection";
import { cn } from "@/lib/cn";
import { ServiceIcon } from "./ServiceIcon";
import { arcPath, wedgeCentre, wedgeClip } from "./wheelGeometry";

/** Colours of the arcs around the outside, clockwise from 12 o'clock. */
const arcColours = [
  "text-brand-soft",
  "text-gold",
  "text-cta",
  "text-whatsapp",
  "text-brand",
  "text-gold",
  "text-cta",
];

/**
 * The circular services grid. A square box holding seven ring segments, a hub and
 * coloured arcs. The segments are clipped with CSS clip-path, so only the visible
 * wedge is hoverable and clickable.
 *
 * Hooks for the scroll animation (see ServicesWheel):
 *   [data-hub]   the centre badge
 *   [data-wedge] one per service, in clockwise order from 12 o'clock
 *   [data-arc]   the coloured arc beside each wedge
 *
 * GSAP moves [data-wedge] with `transform`; the hover lift uses Tailwind's separate
 * `scale` property, so the two never fight.
 */
export function ServiceWheel({ className }: { className?: string }) {
  const n = services.length;
  return (
    <div className={cn("@container relative aspect-square", className)}>
      {/* Coloured arcs */}
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        {services.map((s, i) => (
          <path
            key={s.slug}
            data-arc
            d={arcPath(i, n)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className={arcColours[i % arcColours.length]}
          />
        ))}
      </svg>

      {/* Hub */}
      <div
        data-hub
        className="absolute inset-[32%] grid place-items-center rounded-full bg-night-deep opacity-0 shadow-lift ring-[0.6cqw] ring-gold/80 flat:opacity-100"
      >
        <Logo variant="mark" className="w-[72%]" sizes="12rem" />
      </div>

      {/* Wedges */}
      {services.map((s, i) => {
        const [cx, cy] = wedgeCentre(i, n);
        const label = servicesSection.wheelLabels[s.slug] ?? [s.title];
        return (
          <div
            key={s.slug}
            data-wedge
            className="group/w pointer-events-none absolute inset-0 opacity-0 transition-[scale,filter] duration-500 ease-out-expo flat:opacity-100 [filter:drop-shadow(0_3px_5px_rgb(0_21_25/0.28))] hover:z-20 hover:scale-[1.045] hover:[filter:drop-shadow(0_26px_26px_rgb(0_21_25/0.6))] focus-within:z-20 focus-within:scale-[1.045] focus-within:[filter:drop-shadow(0_26px_26px_rgb(0_21_25/0.6))]"
          >
            <a
              href={`/services#${s.slug}`}
              aria-label={`${s.title}: view services`}
              style={{ clipPath: wedgeClip(i, n) }}
              className="pointer-events-auto absolute inset-0 block text-ink outline-none transition-colors duration-500 hover:text-white focus-visible:text-white"
            >
              {/* Face */}
              <span aria-hidden className="absolute inset-0 bg-linear-to-br from-white via-white to-sand" />

              {/* Service photo, shown on hover, centred on this wedge */}
              <span
                aria-hidden
                className="absolute aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 scale-110 opacity-0 transition-[opacity,scale] duration-700 ease-out-expo group-hover/w:scale-100 group-hover/w:opacity-100 group-focus-within/w:scale-100 group-focus-within/w:opacity-100"
                style={{ left: `${cx}%`, top: `${cy}%` }}
              >
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 28rem, 70vw" className="object-cover" />
              </span>
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-night-deep/90 via-night-deep/60 to-night/40 opacity-0 transition-opacity duration-500 group-hover/w:opacity-100 group-focus-within/w:opacity-100"
              />

              {/* Icon + name */}
              <span
                className="absolute flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[1.2cqw] text-center"
                style={{ left: `${cx}%`, top: `${cy}%` }}
              >
                <ServiceIcon slug={s.slug} className="size-[8.5cqw] transition-transform duration-500 ease-out-expo group-hover/w:-translate-y-[0.6cqw] group-hover/w:scale-110" />
                <span className="text-[max(0.68rem,2.9cqw)] font-semibold leading-[1.15]">
                  {label.map((line, k) => (
                    <span key={k} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
