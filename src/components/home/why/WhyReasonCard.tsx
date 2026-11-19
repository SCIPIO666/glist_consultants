import type { WhyReason } from "@/data/whyUs";

/**
 * One numbered reason. A translucent card sitting inside a grid cell; the cell
 * (li) gives the breathing room against the vertical lines.
 * GSAP moves the <article>; do not put Tailwind translate classes on it.
 */
export function WhyReasonCard({ item, index }: { item: WhyReason; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li className="flex lg:p-4 xl:p-6">
      <article
        data-why-card
        className="group relative flex w-full flex-col justify-between gap-8 rounded-card border border-ink/10 bg-white/50 p-6 opacity-0 backdrop-blur-sm transition-[background-color,border-color] duration-300 ease-out-expo hover:border-brand/40 hover:bg-white/80 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-[clamp(2.75rem,2rem+2.2vw,4.25rem)] font-medium leading-none tracking-[-0.03em] text-brand tabular-nums">
            {num}
            <span className="text-gold">.</span>
          </span>
          <span className="rounded-pill border border-ink/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {item.tag}
          </span>
        </div>

        <div>
          <h3 className="text-h3">{item.title}</h3>
          <p className="mt-3 text-ink-muted">{item.text}</p>
        </div>

        {/* Underline that grows on hover */}
        <span
          aria-hidden
          className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-500 ease-out-expo group-hover:scale-x-100 sm:inset-x-8"
        />
      </article>
    </li>
  );
}
