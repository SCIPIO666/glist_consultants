import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { propertyClosing as copy } from "@/data/propertyManagement";
import { site, whatsappUrl } from "@/lib/site";

/** Sections 11 and 12: the final call to action over a photo, then a quick "Have a question?" strip. */
export function PropertyClosing() {
  return (
    <>
      <section aria-labelledby="pm-cta-title" className="relative isolate overflow-hidden bg-night text-white">
        <Image src={copy.image} alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/70 via-night/85 to-night-deep" />
        <div className="wrap-wide flex flex-col items-center gap-8 py-[clamp(5rem,14svh,9rem)] text-center">
          <Reveal y={40}>
            <h2 id="pm-cta-title" className="max-w-[18ch] text-h1 font-medium">{copy.title}</h2>
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <p className="max-w-xl text-lead text-white/80">{copy.text}</p>
          </Reveal>
          <Reveal y={24} delay={0.2}>
            <Button href={copy.cta.href} size="lg" arrow>{copy.cta.label}</Button>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pm-question-title" className="bg-night-deep py-[clamp(3rem,7svh,5rem)] text-white">
        <div className="wrap-wide flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 id="pm-question-title" className="text-h3 font-medium">{copy.question.title}</h2>
            <p className="mt-2 text-white/70">{copy.question.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${site.phone.tel}`} variant="ghost-light" icon={<Phone />}>{site.phone.display}</Button>
            <Button href={whatsappUrl("Hello Glist Consultants, I have a question about rental property management.")} variant="whatsapp" icon={<WhatsApp className="text-xl" />}>WhatsApp</Button>
            <Button href={`mailto:${site.email}`} variant="ghost-light" icon={<Mail />}>Email us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
