import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { propertyFocus as copy } from "@/data/propertyManagement";

/** Section 4: three numbered image cards, each with a "Read more" link. A card without an image gets a gradient. */
export function PropertyFocus() {
  return (
    <section aria-labelledby="focus-title" className="bg-sand py-[clamp(4rem,10svh,7rem)] text-ink">
      <div className="wrap-wide">
        <Reveal y={40}>
          <h2 id="focus-title" className="max-w-[24ch] text-h2 font-medium">{copy.title}</h2>
        </Reveal>
        <Reveal target="children" stagger={0.15} y={60} as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.items.map((it, i) => (
            <li key={it.title} className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-night text-white">
              {it.image ? (
                <Image src={it.image} alt="" fill sizes="(min-width: 768px) 33vw, 92vw" quality={70} className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
              ) : (
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1F6FD6_0%,transparent_60%),linear-gradient(160deg,#0B3A41,#001519)]" />
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night-deep/90 via-night/40 to-transparent" />
              <div className="relative p-7">
                <span className="font-display text-sm font-medium text-kra">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-h3 font-medium leading-tight">{it.title}</h3>
                <p className="mt-2 text-white/75">{it.text}</p>
                <Link href={it.href} className="mt-5 inline-flex items-center gap-2 border-b border-white/60 pb-0.5 text-sm font-semibold uppercase tracking-[0.1em] after:absolute after:inset-0 hover:border-kra">
                  Read more
                </Link>
              </div>
            </li>
          ))}
        </Reveal>
        <Reveal y={20} className="mt-10">
          <Button href={copy.cta.href} variant="outline-dark" size="lg" arrow>{copy.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
