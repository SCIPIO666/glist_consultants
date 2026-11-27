import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { propertyPillars as copy } from "@/data/propertyManagement";

/** Section 2: a heading and three big cards (Find / Collect / Maintain), then one button. */
export function PropertyPillars() {
  return (
    <section aria-labelledby="pillars-title" className="bg-paper py-[clamp(4rem,10svh,7rem)] text-ink">
      <div className="wrap-wide">
        <Reveal y={40}>
          <h2 id="pillars-title" className="mx-auto max-w-[22ch] text-center text-h2 font-medium">{copy.title}</h2>
        </Reveal>
        <Reveal target="children" stagger={0.15} y={60} as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.items.map((it) => (
            <li key={it.word} className="flex flex-col bg-sand p-8 lg:p-10">
              <span className="font-display text-[clamp(2.6rem,1.6rem+3.2vw,4.4rem)] font-medium leading-none tracking-[-0.03em] text-brand">{it.word}</span>
              <span className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-kra">{it.label}</span>
              <p className="mt-4 text-ink-muted">{it.text}</p>
            </li>
          ))}
        </Reveal>
        <Reveal y={20} className="mt-10 flex justify-center">
          <Button href={copy.cta.href} variant="outline-dark" size="lg" arrow>{copy.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
