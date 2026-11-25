import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { FacetBackdrop } from "@/components/ui/FacetBackdrop";
import { insightsLink as copy } from "@/data/insightsLink";

/** A thin line arrow that stretches on hover, in gold. */
function LineArrow() {
  return (
    <span aria-hidden className="relative inline-block h-px w-11 bg-gold transition-[width] duration-500 ease-out-expo group-hover:w-16">
      <ArrowRight className="absolute -right-1 top-1/2 size-4 -translate-y-1/2 text-gold" />
    </span>
  );
}

/** Home insights teaser, using the original GC11 content-data contract. */
export function InsightTeaser() {
  const c = copy.featured;

  return (
    <section aria-labelledby="insights-title" className="relative isolate overflow-hidden bg-linear-to-br from-night-card via-[#0d4452] to-[#14396a] text-white">
      <FacetBackdrop className="text-brand-soft" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        style={{ backgroundImage: "radial-gradient(rgb(255 255 255 / 0.16) 1px, transparent 1.5px)", backgroundSize: "22px 22px" }}
      />

      <div className="wrap-wide flex flex-col items-center py-[clamp(4rem,10svh,7rem)]">
        <h2 id="insights-title" className="text-center text-[clamp(2.2rem,1.3rem+3.6vw,4.2rem)] font-medium leading-none tracking-[-0.02em]">
          {copy.title}
        </h2>

        <Link
          href={copy.linkHref}
          className="group mt-6 inline-flex items-center gap-5 text-sm font-semibold uppercase tracking-[0.1em] text-white"
        >
          {copy.linkLabel}
          <LineArrow />
        </Link>

        <Link
          href={c.href}
          className="group mt-[clamp(2.5rem,6svh,4rem)] grid w-full gap-8 bg-white p-6 text-ink shadow-[0_30px_60px_-30px_rgba(0,20,40,0.6)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-28px_rgba(0,20,40,0.7)] sm:p-10 md:grid-cols-[minmax(0,0.42fr)_1fr] md:items-center md:gap-12 lg:p-12"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
            <Image
              src={c.image.src}
              alt={c.image.alt}
              fill
              sizes="(min-width: 768px) 36vw, 90vw"
              quality={70}
              className="object-cover object-[50%_25%] transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand">
              <time>{c.date}</time>
            </p>
            <p className="mt-4 font-display text-[clamp(1.9rem,1.1rem+2.8vw,3.4rem)] leading-[1.08] tracking-[-0.02em] text-ink">
              {c.title}
            </p>
            <span className="mt-6 inline-flex items-center gap-5 text-sm font-semibold uppercase tracking-[0.1em]">
              {c.cta}
              <LineArrow />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
