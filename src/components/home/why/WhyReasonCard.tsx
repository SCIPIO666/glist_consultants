import type { WhyReason } from "@/data/whyUs";

/**
 * One numbered reason as a frosted-glass card: translucent white, strong backdrop
 * blur, a bright inner edge and a soft sheen. The blurred orbs and gold specks in
 * WhyReasons sit behind it, which is what makes the glass read as glass.
 *
 * Layout: [number | heading + description].
 * Spacing from the section edges comes from the --gap CSS variable on the parent column.
 * GSAP moves the <article>, the number and the body; do not put Tailwind
 * translate/scale classes on them.
 */
export function WhyReasonCard({ item, index }: { item: WhyReason; index: number }) {
  return (
    <li className="px-[var(--gap)]">
      <article
        data-why-card
        className="group relative grid grid-cols-[clamp(4.75rem,7vw,7.5rem)_minmax(0,1fr)] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/30 opacity-0 shadow-[0_10px_40px_-10px_rgba(15,42,82,0.28),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-500 ease-out-expo hover:border-kra-light/60 hover:bg-white/50 hover:shadow-[0_18px_50px_-12px_rgba(15,42,82,0.38),inset_0_1px_0_rgba(255,255,255,1)]"
      >
        {/* Glass sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/70 via-white/10 to-transparent"
        />

        <div className="relative flex items-center justify-center border-r border-white/70 py-5">
          <span
            data-why-num
            className="bg-linear-to-b from-brand to-brand-soft bg-clip-text font-display text-[clamp(2.75rem,2rem+2.4vw,4.75rem)] font-medium leading-none tracking-[-0.03em] text-transparent tabular-nums"
          >
            {index + 1}
            <span className="text-kra [-webkit-text-fill-color:currentColor]">.</span>
          </span>
        </div>

        <div data-why-body className="relative flex flex-col justify-center py-5 pl-5 pr-5 sm:pl-7 sm:pr-8 lg:pl-[clamp(1.25rem,2.4vw,2.5rem)]">
          <h3 className="text-[clamp(1.25rem,1rem+0.9vw,1.875rem)] font-medium leading-[1.15]">{item.title}</h3>
          <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ink-muted sm:text-base">{item.text}</p>
        </div>

        {/* Underline that grows on hover */}
        <span
          aria-hidden
          className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-kra-light transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
        />
      </article>
    </li>
  );
}
