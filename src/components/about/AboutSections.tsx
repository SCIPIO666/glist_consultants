import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { aboutSections, type AboutSectionData } from "@/data/aboutSections";

/**
 * One About section (Blue Owl style): a tall vertical title that stays pinned
 * beside a list of headed paragraphs while you scroll through them.
 * side="left" matches the reference screenshot; side="right" mirrors it.
 */
function AboutSection({ section, tone, side }: { section: AboutSectionData; tone: string; side: "left" | "right" }) {
  const titleId = `${section.id}-title`;
  return (
    <section id={section.id} aria-labelledby={titleId} className={cn("relative border-t border-white/10 text-white", tone)}>
      <div
        className={cn(
          "wrap-wide flex gap-6 py-[clamp(4.5rem,10vw,9rem)] sm:gap-14 lg:gap-24",
          side === "right" && "flex-row-reverse",
        )}
      >
        {/* Pinned vertical title */}
        <h2
          id={titleId}
          className="sticky top-[calc(var(--header-h)+1.5rem)] h-fit shrink-0 self-start font-display text-[clamp(2.25rem,1.4rem+3.4vw,5rem)] font-normal leading-none tracking-[-0.01em] text-brand-soft [writing-mode:vertical-rl]"
        >
          {section.title}
        </h2>

        <div className={cn("flex min-w-0 flex-1 flex-col gap-[clamp(3.5rem,9vw,7rem)]", side === "left" ? "lg:pl-[8%]" : "lg:pr-[8%]")}>
          {section.items.map((item) => (
            <Reveal key={item.heading} y={50} start="top 88%">
              <h3 className="text-[clamp(2rem,1.2rem+2.8vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                {item.heading}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Background, mission, vision and values, one after another, alternating two dark tones. */
export function AboutSections({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <>
      {aboutSections.map((s, i) => (
        <AboutSection key={s.id} section={s} tone={i % 2 === 0 ? "bg-night-deep" : "bg-night"} side={side} />
      ))}
    </>
  );
}
