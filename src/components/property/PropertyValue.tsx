import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { DashField } from "@/components/ui/DashField";
import { propertyValue as copy } from "@/data/propertyValue";

/**
 * PROPERTY VALUE PROPOSITION (section 4). Light (sand) with the dash corner patterns,
 * top-right and bottom-left, matching the services section.
 * Left: title, then the photo. Both slide in from the left (reversible).
 * Right: intro, two "problem" lines, then four minimalist glass cards, entering in turn.
 */
export function PropertyValue() {
  return (
    <section aria-labelledby="pv-title" className="relative isolate overflow-hidden bg-sand py-[clamp(4.5rem,11svh,8rem)] text-ink">
      <DashField focus="top-right" variant="ripple" className="absolute right-0 top-0 -z-10 h-[min(60%,38rem)] w-[min(75%,44rem)] opacity-70" />
      <DashField focus="bottom-left" variant="ripple" className="absolute bottom-0 left-0 -z-10 h-[min(60%,38rem)] w-[min(75%,44rem)] opacity-70" />

      <div className="wrap-wide grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* LEFT: title, image */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <Reveal x={-70} y={0}>
            <h2 id="pv-title" className="max-w-[15ch] text-h2 font-medium">{copy.title}</h2>
          </Reveal>
          <Reveal x={-90} y={0} delay={0.12} duration={1.3} className="mt-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-night shadow-lift lg:aspect-[4/4.2]">
              <Image
                src={copy.image.src}
                alt={copy.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 92vw"
                quality={75}
                className="object-cover"
                style={{ objectPosition: copy.image.position }}
              />
            </div>
          </Reveal>
        </div>

        {/* RIGHT: content */}
        <div className="lg:pt-4">
          <Reveal x={70} y={0}>
            <p className="max-w-2xl text-lead text-ink-muted">{copy.intro}</p>
          </Reveal>

          <Reveal target="children" stagger={0.14} x={60} y={0} as="ul" className="mt-10 space-y-6">
            {copy.challenges.map((c) => (
              <li key={c.title} className="border-l-2 border-gold pl-5">
                <h3 className="text-xl font-semibold leading-snug">{c.title}</h3>
                <p className="mt-1.5 max-w-xl text-ink-muted">{c.text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal target="children" stagger={0.12} x={60} y={0} as="ul" className="mt-12 grid gap-4 sm:grid-cols-2">
            {copy.points.map((p, i) => (
              <li
                key={p.title}
                className="group rounded-card border border-white/70 bg-white/55 p-6 shadow-[0_1px_2px_rgb(15_42_82/0.05),0_18px_40px_-24px_rgb(15_42_82/0.3)] backdrop-blur-md transition-[translate,box-shadow,background-color] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-white/80 hover:shadow-card"
              >
                <span className="text-sm font-bold tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{p.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
