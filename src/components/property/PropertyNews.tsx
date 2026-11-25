import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { propertyNews as copy } from "@/data/propertyManagement";

/** Section 10: three news cards (title, excerpt, date, arrow). Sample titles for now. */
export function PropertyNews() {
  return (
    <section aria-labelledby="pm-news-title" className="bg-paper py-[clamp(4rem,10svh,7rem)] text-ink">
      <div className="wrap-wide">
        <Reveal y={30} className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="pm-news-title" className="text-h2 font-medium">{copy.title}</h2>
          <Link href={copy.all.href} className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-semibold hover:border-brand hover:text-brand">
            {copy.all.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <Reveal target="children" stagger={0.12} y={50} as="ul" className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.items.map((it) => (
            <li key={it.title}>
              <Link href={it.href} className="group flex h-full flex-col border border-ink/15 p-7 transition-[border-color,box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand hover:shadow-card">
                <time className="text-xs font-bold uppercase tracking-[0.12em] text-brand">{it.date}</time>
                <h3 className="mt-3 text-xl font-semibold leading-snug">{it.title}</h3>
                <p className="mt-3 flex-1 text-ink-muted">{it.excerpt}</p>
                <ArrowRight className="mt-6 size-6 text-gold transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
