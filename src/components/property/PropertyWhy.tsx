import { Reveal } from "@/components/motion/Reveal";
import { propertyWhy as copy } from "@/data/propertyManagement";

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8 12.5 2.8 2.8L16 9.5" />
    </svg>
  );
}

/** Section 7: a heading and three numbered, checked-off items. */
export function PropertyWhy() {
  return (
    <section aria-labelledby="pm-why-title" className="bg-mist py-[clamp(4rem,10svh,7rem)] text-ink">
      <div className="wrap-wide">
        <Reveal y={40}>
          <h2 id="pm-why-title" className="mx-auto max-w-[26ch] text-center text-h2 font-medium">{copy.title}</h2>
        </Reveal>
        <Reveal target="children" stagger={0.15} y={60} as="ol" className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/15">
          {copy.items.map((it, i) => (
            <li key={it.title} className="md:px-10 first:md:pl-0 last:md:pr-0">
              <div className="flex items-center justify-between">
                <span className="font-display text-[clamp(3rem,2rem+3vw,5rem)] font-light leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
                <Check />
              </div>
              <h3 className="mt-5 text-h3 font-medium leading-tight">{it.title}</h3>
              <p className="mt-3 text-ink-muted">{it.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
