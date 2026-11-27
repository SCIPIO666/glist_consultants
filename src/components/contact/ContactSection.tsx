import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";
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
