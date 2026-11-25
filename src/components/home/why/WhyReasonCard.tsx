import type { WhyReason } from "@/data/whyUs";

/**
 * One numbered row. On desktop the row spans the two right-hand columns: number and
 * heading sit in the first, the description in the second (so the vertical line between
 * them divides every row). GSAP moves the <li>; keep Tailwind translate classes off it.
 */
export function WhyReasonCard({ item, index }: { item: WhyReason; index: number }) {
  return (
    <li
      data-why-row
      className="grid items-start gap-3 border-t border-ink/15 py-7 first:border-t-0 lg:h-full lg:grid-cols-2 lg:items-center lg:gap-0 lg:py-0"
    >
      <div className="flex items-center gap-4 lg:gap-6 lg:px-8 xl:px-10">
        <span
          aria-hidden
          className="font-display text-[clamp(3rem,2rem+3.4vw,5.5rem)] font-light leading-none tracking-tight text-brand"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-h3 font-medium leading-tight text-ink">{item.title}</h3>
      </div>
      <p className="max-w-[34ch] text-ink-muted lg:px-8 xl:px-10">{item.text}</p>
    </li>
  );
}
