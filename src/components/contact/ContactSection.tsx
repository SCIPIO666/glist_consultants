import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { coverage } from "@/data/contactCoverage";
import { ContactPortrait } from "./ContactPortrait";
import { contactForm as copy } from "@/data/contact";

/**
 * CONTACT: no hero, straight to the form.
 * Dark page-top so the transparent fixed header reads correctly, then one big
 * card: form on the left, clipped portrait on a circle on the right.
 */
export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-night pb-[clamp(4rem,8vw,7rem)] pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3.5rem))]">
      {/* soft glow behind the card */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full bg-brand/20 blur-3xl" />

      <div className="wrap-wide relative">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-night-card shadow-lift lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form side */}
          <div className="p-6 sm:p-10 lg:p-14">
            <Reveal>
              <Eyebrow className="text-kra-light">{copy.eyebrow}</Eyebrow>
              <h1 className="mt-4 font-display text-h1 text-white">
                {copy.titleBefore} <span className="text-kra-light italic">{copy.titleMark}</span>
              </h1>
            </Reveal>
            <Reveal className="mt-8 lg:mt-10" delay={0.1}>
              <ContactForm />
            </Reveal>
            <Reveal className="mt-8 border-t border-white/10 pt-6 lg:mt-10" delay={0.2}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Follow us</p>
              <SocialLinks className="mt-4" size="lg" />
            </Reveal>

            <Reveal className="mt-8" delay={0.3}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{coverage.label}</p>
              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {coverage.places.map((p) => (
                  <li key={p} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85">
                    <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Portrait side */}
          <div className="relative overflow-hidden border-t border-white/10 bg-night/50 px-6 pt-10 sm:px-10 lg:border-l lg:border-t-0 lg:px-8 lg:pt-14">
            <ContactPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
