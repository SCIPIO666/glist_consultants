import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/contact/ContactForm";
import { services } from "@/data/services";
import { propertyEnquiry as copy } from "@/data/propertyManagement";

const defaultService = services.find((s) => s.slug === copy.defaultServiceSlug)?.title ?? "";

/** Section 3: an enquiry form on a dark panel. It is the same form as the Contact page, pre-set to this service. */
export function PropertyEnquiry() {
  return (
    <section id={copy.id} aria-labelledby="enquire-title" className="scroll-mt-24 bg-night py-[clamp(4rem,10svh,7rem)] text-white">
      <div className="wrap-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal y={40}>
          <Eyebrow className="text-gold">{copy.eyebrow}</Eyebrow>
          <h2 id="enquire-title" className="mt-4 text-h2 font-medium">{copy.title}</h2>
          <p className="mt-5 max-w-sm text-lead text-white/75">{copy.text}</p>
        </Reveal>
        <Reveal y={50} delay={0.1} className="rounded-[1.5rem] border border-white/10 bg-night-card p-6 sm:p-10">
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
