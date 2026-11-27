import Image from "next/image";
import Link from "next/link";
import { formatInsightMonth, insightsPage as copy, type Insight } from "@/data/insights";

/** Long thin arrow; the shaft stretches on hover of the card (group). */
function LongArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 12"
      className="h-3 w-12 shrink-0 text-kra transition-[width] duration-500 ease-out-expo group-hover:w-16"
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
 * Minimal article card, the same look as the Home "News and Insights" teaser:
 * white card, photo on the left, then date, title and a "Read more" link.
 * The link's hit area covers the whole card. (Category, description and read
 * time stay in the data for the filters and the article page, but are not shown here.)
 */
export function InsightCard({ item, priority = false }: { item: Insight; priority?: boolean }) {
  return (
    <article className="group relative grid overflow-hidden rounded-card bg-white text-ink shadow-card transition-shadow duration-500 ease-out-expo hover:shadow-lift sm:grid-cols-[minmax(0,0.4fr)_1fr] sm:items-center">
      <div className="p-5 sm:p-7 lg:p-9">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22rem, (min-width: 640px) 34vw, 90vw"
            quality={70}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            style={{ objectPosition: item.image.focus }}
          />
        </div>
      </div>

      <div className="px-5 pb-7 sm:px-2 sm:py-7 sm:pr-9 lg:pr-12">
        <time dateTime={item.date} className={`text-sm font-semibold uppercase tracking-[0.12em] ${item.category === "tax-updates" || item.service === "taxation" ? "text-kra" : "text-brand"}`}>
          {formatInsightMonth(item.date)}
        </time>
        <h3 className="mt-3 max-w-[24ch] font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.6rem)] font-normal leading-[1.12] tracking-[-0.015em]">
          {item.title}
        </h3>
        <Link
          href={`/insights/${item.slug}`}
          className="mt-6 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.12em] text-ink after:absolute after:inset-0 after:content-['']"
        >
          {copy.readLabel}
          <span className="sr-only">: {item.title}</span>
          <LongArrow />
        </Link>
      </div>
    </article>
  );
}
