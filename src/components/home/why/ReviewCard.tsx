import type { CSSProperties } from "react";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const STAR = "12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6";

/**
 * One review. The top strip (stars + service) is what stays visible once later
 * cards stack over this one, so keep it self-contained.
 * GSAP moves the whole <article>; do not put Tailwind translate classes on it.
 */
export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <article
      data-review-card
      style={{ zIndex: index + 1, "--i": index } as CSSProperties}
      className={cn(
        "absolute inset-x-0 top-[calc(var(--offset)*var(--i))] h-[calc(100%-var(--offset)*(var(--n)-1))] overflow-hidden lg:h-[var(--card-h)] rounded-card border border-ink/10 bg-white shadow-card",
        "flat:relative flat:top-auto flat:mb-5 flat:h-auto",
      )}
    >
      <div className="flex h-[var(--offset)] items-center justify-between gap-3 border-b border-ink/10 px-4 sm:px-7">
        <div className="flex gap-1 text-gold" role="img" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" aria-hidden className={cn("size-4 sm:size-5", i >= review.stars && "opacity-25")}>
              <polygon points={STAR} fill="currentColor" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
            </svg>
          ))}
        </div>
        <span className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-brand">{review.service}</span>
      </div>

      <div className="flex h-[calc(100%-var(--offset))] flex-col justify-between gap-2 p-4 sm:gap-4 sm:p-7 flat:h-auto">
        <blockquote className="font-display text-[0.95rem] leading-snug text-ink sm:text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)]">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <footer className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full bg-night font-display text-sm sm:size-10 sm:text-base font-semibold text-gold"
          >
            {review.name.charAt(0)}
          </span>
          <p className="min-w-0 text-sm leading-tight">
            <span className="block font-semibold">{review.name}</span>
            <span className="text-ink-muted">
              {review.role}, {review.location}
            </span>
          </p>
        </footer>
      </div>
    </article>
  );
}
