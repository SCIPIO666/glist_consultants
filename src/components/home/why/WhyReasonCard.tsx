import type { WhyReason } from "@/data/whyUs";

/**
 * One numbered reason: a translucent card split by the section's second vertical
 * line into [number | heading + description].
 *
 * Sizes come from CSS variables set on the parent column (WhyReasons):
 *   --gap  space between the card and the column's edges
 *   --num  distance from the column's left edge to the number/text divider
 *
 * GSAP moves the <article>, the number and the body; do not put Tailwind
 * translate/scale classes on them.
 */
export function WhyReasonCard({ item, index }: { item: WhyReason; index: number }) {
  return (
    <li className="px-[var(--gap)]">
      <article
        data-why-card
        className="group relative grid grid-cols-[calc(var(--num)-var(--gap))_minmax(0,1fr)] items-stretch overflow-hidden rounded-card border border-ink/10 bg-white/55 opacity-0 backdrop-blur-sm transition-[background-color,border-color] duration-300 ease-out-expo hover:border-brand/40 hover:bg-white/85"
      >
        <div className="flex items-center justify-center py-5 pl-2 pr-1 sm:pl-4">
          <span
            data-why-num
            className="font-display text-[clamp(2.75rem,2rem+2.4vw,4.75rem)] font-medium leading-none tracking-[-0.03em] text-brand tabular-nums"
          >
            {index + 1}
            <span className="text-gold">.</span>
          </span>
        </div>

        {/* On phones this border is the divider; on desktop the section's long line does that job. */}
        <div
          data-why-body
          className="flex flex-col justify-center border-l border-ink/15 py-5 pl-5 pr-5 sm:pr-8 lg:border-l-0 lg:pl-[clamp(1.25rem,2.4vw,2.5rem)]"
        >
          <h3 className="text-[clamp(1.25rem,1rem+0.9vw,1.875rem)] font-medium leading-[1.15]">{item.title}</h3>
          <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ink-muted sm:text-base">{item.text}</p>
        </div>

        {/* Underline that grows on hover */}
        <span
          aria-hidden
          className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
        />
      </article>
    </li>
  );
}
