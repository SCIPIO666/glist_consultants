import type { CSSProperties } from "react";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const STAR = "12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6";

/**
 * One bright review card: stars, quote, uppercase name, date. The star strip at the top
 * is what stays visible once later cards stack over this one, so keep it self-contained.
 * GSAP moves the whole <article>; do not put Tailwind translate classes on it.
 */
export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <article
      data-review-card
      style={{ zIndex: index + 1, "--i": index } as CSSProperties}
      className={cn(
        "absolute inset-x-0 top-[calc(var(--offset)*var(--i))] h-[calc(100%-var(--offset)*(var(--n)-1))] overflow-hidden lg:h-[var(--card-h)]",
        "bg-gradient-to-br from-brand via-brand to-[#2a58d8] text-white shadow-[0_-14px_30px_-12px_rgba(0,10,20,0.55)] ring-1 ring-white/15",
        "flat:relative flat:top-auto flat:mb-5 flat:h-auto",
      )}
    >
      <div className="flex h-[var(--offset)] items-center px-5 sm:px-8">
        <div className="flex gap-1.5 text-gold" role="img" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" aria-hidden className={cn("size-4 sm:size-5", i >= review.stars && "opacity-25")}>
              <polygon points={STAR} fill="currentColor" />
            </svg>
          ))}
        </div>
      </div>

      <div className="flex h-[calc(100%-var(--offset))] flex-col justify-between gap-3 px-5 pb-5 sm:px-8 sm:pb-7 flat:h-auto flat:gap-6">
        <blockquote className="text-[0.9rem] leading-snug sm:text-[clamp(1rem,0.9rem+0.35vw,1.15rem)] sm:leading-relaxed">
          {review.quote}
        </blockquote>
        <footer className="flex items-end justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em] text-white sm:text-sm">
          <span>{review.name}</span>
          <time className="tabular-nums">{review.date}</time>
        </footer>
      </div>
    </article>
  );
}
