import Image from "next/image";
import { CircleBand } from "@/components/motion/CircleBand";
import { Circled } from "@/components/motion/Circled";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { finalCta as copy } from "@/data/finalCta";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Last section of the home page, just above the pinned footer. One clear job:
 * send people to the contact form, with WhatsApp and phone as quick alternatives.
 */
export function HomeFinalCta() {
  return (
    <>
      <CircleBand colorClass="text-night" className="bg-night-deep" reveal />
      <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-night text-white">
        <Image
          src={copy.bgImage}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="-z-20 object-cover object-[50%_75%]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/85" />
        <div
          aria-hidden
          className="absolute -right-1/4 -top-1/3 -z-10 size-[44rem] rounded-full bg-brand/25 blur-3xl"
        />

        <div className="wrap-wide flex min-h-[80svh] flex-col items-start justify-center gap-8 py-[clamp(5rem,12svh,9rem)]">
          <Reveal y={20}>
            <Eyebrow className="text-gold">{copy.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal y={50} delay={0.1}>
            <h2 id="final-cta-title" className="max-w-[18ch] text-display font-medium">
              {copy.titleBefore}{" "}
              <Circled shape="circle" colorClass="text-gold" stroke={3}>
                {copy.titleMark}
              </Circled>{" "}
              {copy.titleAfter}
            </h2>
          </Reveal>

          <Reveal y={30} delay={0.2} className="max-w-2xl space-y-4">
            <p className="text-lead text-white/80">{copy.text}</p>
            <p className="text-lead font-semibold">{copy.closing}</p>
          </Reveal>

          <Reveal y={30} delay={0.3} className="flex flex-wrap items-center gap-3">
            <Button href={copy.primary.href} size="lg" arrow>
              {copy.primary.label}
            </Button>
            <Button
              href={whatsappUrl(copy.whatsappMessage)}
              variant="whatsapp"
              size="lg"
              icon={<WhatsApp className="text-xl" />}
            >
              {copy.whatsappLabel}
            </Button>
          </Reveal>

          <Reveal y={20} delay={0.4} className="flex flex-wrap gap-x-8 gap-y-3 text-white/80">
            <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2 hover:text-white">
              <Phone />
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail />
              {site.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
