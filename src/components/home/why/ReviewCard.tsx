import type { CSSProperties } from "react";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const STAR = "12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6";

/**
 * One review on a deep-teal-to-blue gradient card. The top strip (stars + service)
 * is what stays visible once later cards stack over this one, so keep it self-contained.
 * GSAP moves the whole <article>; do not put Tailwind translate classes on it.
 */
export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <article
      data-review-card
      style={{ zIndex: index + 1, "--i": index } as CSSProperties}
      className={cn(
        "absolute inset-x-0 top-[calc(var(--offset)*var(--i))] h-[calc(100%-var(--offset)*(var(--n)-1))] overflow-hidden",
        "rounded-card border border-white/15 bg-linear-to-br from-night-card via-[#0c4f6e] to-brand text-white",
        "shadow-[0_-6px_14px_-8px_rgb(0_10_12/0.55)] sm:shadow-[0_-14px_32px_-10px_rgb(0_10_12/0.6)]",
        "will-change-transform [backface-visibility:hidden]",
        "flat:relative flat:top-auto flat:mb-5 flat:h-auto",
      )}
    >
      <div className="flex h-[var(--offset)] items-center justify-between gap-3 border-b border-white/15 bg-night-deep/20 px-4 sm:px-7">
        <div className="flex gap-1 text-gold" role="img" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" aria-hidden className={cn("size-4 sm:size-5", i >= review.stars && "opacity-25")}>
              <polygon points={STAR} fill="currentColor" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
            </svg>
          ))}
        </div>
        <span className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-white/80">{review.service}</span>
      </div>

      <div className="flex h-[calc(100%-var(--offset))] flex-col justify-between gap-2 p-4 sm:gap-4 sm:p-7 flat:h-auto">
        <blockquote className="font-display text-[0.95rem] leading-snug sm:text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)] lg:text-[clamp(1.4rem,0.9rem+1.1vw,2rem)] lg:leading-[1.3]">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <footer className="flex items-end justify-between gap-4 text-xs font-bold uppercase tracking-[0.1em] sm:text-sm">
          <span className="text-kra-light">
            {review.name}
            <span className="ml-2 font-medium normal-case tracking-normal text-white/70">{review.role}</span>
          </span>
          <span className="shrink-0 text-right text-white/80">{review.location}</span>
        </footer>
      </div>
    </article>
  );
}
