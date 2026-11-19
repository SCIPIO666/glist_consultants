import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { insightsLink as copy } from "@/data/insightsLink";

/**
 * Insights link block. A photo background with four colour panels, one per
 * topic. On desktop the hovered (or focused) panel grows and its neighbours
 * give way; on mobile the panels stack as full-width rows.
 */
export function InsightsLinks() {
  return (
    <section aria-labelledby="insights-title" className="relative isolate overflow-hidden bg-night-deep text-white">
      <Image
        src={copy.bgImage}
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night-deep/80" />

      <div className="wrap-wide flex min-h-svh flex-col justify-center gap-10 py-[clamp(4.5rem,10svh,7rem)]">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal y={20}>
              <Eyebrow className="text-gold">{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal y={40} delay={0.1} className="mt-4">
              <h2 id="insights-title" className="text-h1 font-medium">
                {copy.title}
              </h2>
            </Reveal>
            <Reveal y={24} delay={0.2} className="mt-5 max-w-lg">
              <p className="text-lead text-white/70">{copy.lead}</p>
            </Reveal>
          </div>
          <Reveal y={24} delay={0.3}>
            <Button href={copy.cta.href} variant="ghost-light" size="lg" arrow>
              {copy.cta.label}
            </Button>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          target="children"
          y={50}
          stagger={0.12}
          className="grid gap-3 sm:grid-cols-2 lg:flex lg:h-[clamp(22rem,52svh,30rem)] lg:flex-row lg:gap-3"
        >
          {copy.topics.map((t, i) => (
            <li
              key={t.slug}
              className="flex lg:grow lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-expo lg:hover:grow-[2] lg:focus-within:grow-[2]"
            >
              <Link
                href={`/insights?topic=${t.slug}`}
                className={cn(
                  "group relative flex w-full flex-col justify-between gap-10 overflow-hidden rounded-card p-6 sm:p-8 lg:gap-0",
                  "focus-visible:outline-white",
                  t.panel,
                )}
              >
                <span className="text-sm font-semibold tabular-nums tracking-widest opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-h3 xl:whitespace-nowrap">{t.title}</h3>
                  <p className="mt-3 max-w-xs text-sm opacity-90 sm:text-base lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-[max-height,opacity] lg:duration-700 lg:ease-out-expo lg:group-hover:max-h-32 lg:group-hover:opacity-90 lg:group-focus-visible:max-h-32 lg:group-focus-visible:opacity-90">
                    {t.blurb}
                  </p>
                </div>

                <span
                  aria-hidden
                  className={cn(
                    "absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-current text-lg transition-[background-color,color,transform] duration-300 sm:right-7 sm:top-7",
                    "group-hover:rotate-12",
                    t.disc,
                  )}
                >
                  <ArrowUpRight />
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
