import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { services } from "@/data/services";
import { listingCopy, listingImages } from "@/data/servicesPage";

/**
 * The full list: one row per service with a hairline above it. Number and title on the left,
 * the description and task list in the middle, a photo on the right, and an enquiry link that
 * opens the contact form for that service. Each row has the service slug as its id, so the
 * rail above and the home-page wheel can link straight to it.
 */
export function ServicesListing() {
  return (
    <section id="service-list" aria-label={listingCopy.srLabel} className="bg-paper pb-[clamp(4rem,10svh,8rem)] text-ink">
      <ol className="wrap-wide">
        {services.map((s, i) => {
          const img = listingImages[s.slug] ?? { src: s.image, alt: "" };
          return (
            <li key={s.slug} id={s.slug} className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-ink/20">
              <Reveal y={50} start="top 88%" className="grid gap-8 py-[clamp(2.5rem,7svh,5rem)] lg:grid-cols-[0.8fr_1.1fr_1fr] lg:gap-12">
                <div className="flex items-start gap-5">
                  <span aria-hidden className="font-display text-2xl font-light text-cta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[clamp(1.6rem,1rem+1.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em]">{s.title}</h2>
                </div>

                <div>
                  <p className="max-w-[46ch] text-ink-muted">{s.intro}</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-ink-muted sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?service=${s.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
                  >
                    {listingCopy.enquire}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-night lg:self-start">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    quality={70}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
