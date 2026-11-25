import Image from "next/image";
import Link from "next/link";
import { categories, formatInsightDate, insightsPage as copy, type Insight } from "@/data/insights";
import { cn } from "@/lib/cn";

/** Long thin arrow; the shaft stretches on hover of the card (group). */
function LongArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 12"
      className="h-3 w-12 shrink-0 text-gold transition-[width] duration-500 ease-out-expo group-hover:w-16"
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
 * One wide article card, in one of two looks:
 *   "white"  white card, text on the left, photo panel on the right
 *   "image"  the photo is the card background, text over a dark gradient
 * Both: category chip, date, read time, title, description, and a "Read article"
 * link whose hit area covers the whole card.
 */
export function InsightCard({
  item,
  variant,
  priority = false,
}: {
  item: Insight;
  variant: "white" | "image";
  priority?: boolean;
}) {
  const dark = variant === "image";
  const category = categories.find((c) => c.value === item.category)?.label ?? item.category;

  const body = (
    <div
      className={cn(
        "relative flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10",
        dark ? "h-full min-h-[inherit] max-w-3xl" : "sm:order-1",
      )}
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em]">
          <span className={cn("rounded-pill px-3 py-1", dark ? "bg-white/15 text-white backdrop-blur-sm" : "bg-brand/10 text-brand")}>
            {category}
          </span>
          <time dateTime={item.date} className={dark ? "text-white/80" : "text-ink-muted"}>
            {formatInsightDate(item.date)}
          </time>
          <span aria-hidden className={dark ? "text-white/40" : "text-ink/25"}>
            /
          </span>
          <span className={dark ? "text-white/80" : "text-ink-muted"}>{item.readMinutes} min read</span>
        </div>

        <h3 className="mt-5 font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.015em] sm:max-w-[28ch]">
          {item.title}
        </h3>
        <p className={cn("mt-3 max-w-[54ch] text-base leading-relaxed", dark ? "text-white/80" : "text-ink-muted")}>
          {item.excerpt}
        </p>
      </div>

      <Link
        href={`/insights/${item.slug}`}
        className={cn(
          "inline-flex w-fit items-center gap-4 text-sm font-semibold uppercase tracking-[0.12em] after:absolute after:inset-0 after:z-10 after:content-['']",
          dark ? "text-white focus-visible:outline-white" : "text-ink",
        )}
      >
        {copy.readLabel}
        <span className="sr-only">: {item.title}</span>
        <LongArrow />
      </Link>
    </div>
  );

  return (
    <article
      className={cn(
        "group relative isolate min-h-[19rem] overflow-hidden rounded-card shadow-card transition-shadow duration-500 ease-out-expo hover:shadow-lift lg:min-h-[21rem]",
        dark ? "bg-night-deep text-white" : "flex flex-col bg-white text-ink sm:grid sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
      )}
    >
      {dark ? (
        <>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60rem, 100vw"
            quality={65}
            className="-z-20 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            style={{ objectPosition: item.image.focus }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-night-deep/95 via-night-deep/65 to-night/25 sm:bg-linear-to-r sm:from-night-deep/90 sm:via-night-deep/60 sm:to-night/10"
          />
          {body}
        </>
      ) : (
        <>
          {body}
          <div className="relative order-first aspect-[16/9] overflow-hidden sm:order-2 sm:aspect-auto">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 40vw, 100vw"
              quality={65}
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              style={{ objectPosition: item.image.focus }}
            />
          </div>
        </>
      )}
    </article>
  );
}
