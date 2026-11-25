import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { FacetBackdrop } from "@/components/ui/FacetBackdrop";
import { insightsLink as copy } from "@/data/insightsLink";

/** Long thin arrow in the accent colour; the shaft stretches on hover of its group. */
function LongArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 12"
      className={`h-3 w-12 shrink-0 text-gold transition-[width] duration-500 ease-out-expo group-hover:w-16 ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMaxYMid meet"
    >
      <path d="M1 6h45M41 1l5 5-5 5" />
    </svg>
  );
}

/**
 * News and Insights teaser (Henwood Court style): a brand-blue screen with soft
 * facets, a centred title and ONE white feature card, image left, text right.
 * The whole card is clickable through the stretched "Read more" link.
 */
export function InsightsLinks() {
  const f = copy.featured;
  return (
    <section aria-labelledby="insights-title" className="relative isolate overflow-hidden bg-brand text-white">
      <FacetBackdrop className="text-white" />

      <div className="wrap-wide flex min-h-svh flex-col items-center justify-center gap-10 py-[clamp(4.5rem,10svh,7rem)] lg:gap-14">
        <div className="flex flex-col items-center text-center">
          <Reveal y={40}>
            <h2 id="insights-title" className="text-h1 font-normal">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.15} className="mt-6">
            <Link
              href={copy.linkHref}
              className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-[0.12em] focus-visible:outline-white"
            >
              {copy.linkLabel}
              <LongArrow />
            </Link>
          </Reveal>
        </div>

        <Reveal y={70} delay={0.1} duration={1.2} className="w-full">
          <article className="group relative grid w-full overflow-hidden bg-white text-ink shadow-lift sm:grid-cols-[minmax(0,0.42fr)_1fr] sm:items-center">
            <div className="p-5 sm:p-8 lg:p-12">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 36vw, 90vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
            </div>

            <div className="px-5 pb-8 sm:px-4 sm:py-8 lg:px-14">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{f.date}</p>
              <h3 className="mt-4 max-w-[22ch] text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.015em] text-ink">
                {f.title}
              </h3>
              <Link
                href={f.href}
                className="mt-8 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.12em] text-ink after:absolute after:inset-0 after:content-['']"
              >
                {f.cta}
                <LongArrow />
              </Link>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
