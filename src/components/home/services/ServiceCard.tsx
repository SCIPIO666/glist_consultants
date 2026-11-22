import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/data/services";

type Props = {
  service: Service;
  index: number;
  total: number;
  ctaLabel: string;
};

/**
 * One card of the stack: photo background, letter badge, title, one-line blurb
 * and a Read more link to its place on the services page.
 * GSAP moves the whole <article>; do not put Tailwind translate classes on it.
 */
export function ServiceCard({ service, index, total, ctaLabel }: Props) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <article
      data-svc-card
      style={{ zIndex: index + 1 }}
      className="absolute inset-0 overflow-hidden rounded-card border border-white/10 bg-night-card shadow-lift flat:relative flat:mb-5 flat:h-[26rem]"
    >
      <Image
        src={service.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 34rem, 92vw"
        quality={60}
        loading="eager"
        fetchPriority="low"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night-deep/95 via-night-deep/45 to-night/10" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-center justify-between">
          {/* <span className="grid size-10 place-items-center rounded-full bg-gold font-display text-lg font-semibold text-night-deep">
            {service.letter}
          </span> */}
          <span className="text-sm tabular-nums text-white/70">
            {pad(index + 1)} / {pad(total)}
          </span>
        </div>

        <div>
          <h3 className="text-h3">{service.title}</h3>
          <p className="mt-2 line-clamp-2 max-w-sm text-sm text-white/80 sm:line-clamp-none sm:text-base">{service.short}</p>
          <Button href={`/services#${service.slug}`} variant="ghost-light" arrow className="mt-4 sm:mt-5">
            {ctaLabel}
          </Button>
        </div>
      </div>

      {/* GSAP darkens cards as newer ones stack on top of them */}
      <div data-dim aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-night-deep opacity-0" />
    </article>
  );
}
