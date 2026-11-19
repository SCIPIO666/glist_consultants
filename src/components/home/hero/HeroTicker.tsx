import { Marquee } from "@/components/motion/Marquee";
import { heroTicker } from "@/data/hero";
import { cn } from "@/lib/cn";

type Props = {
  /** "light" = on white, "dark" = on the dark teal base. */
  tone?: "light" | "dark";
  /** Opposite to whatever sits above it. Alt 1's coins run left, so this runs right. */
  direction?: "left" | "right";
  className?: string;
};

/** Big service names with a gold "G" between them. Loops and reacts to scroll. */
export function HeroTicker({ tone = "light", direction = "right", className }: Props) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "border-y py-5 sm:py-7",
        light ? "border-ink/10 bg-paper" : "border-white/10 bg-night-deep",
        className,
      )}
    >
      <Marquee direction={direction} speed={60} repeat={1}>
        {heroTicker.flatMap((word, i) => [
          <span
            key={word}
            className={cn(
              "block px-6 font-display text-[clamp(2.25rem,5.2vw,5rem)] leading-none tracking-tight sm:px-10",
              light ? (i % 2 ? "text-brand" : "text-ink") : i % 2 ? "text-brand-soft" : "text-white",
            )}
          >
            {word}
          </span>,
          <span
            key={`${word}-dot`}
            aria-hidden
            className="grid size-9 place-items-center rounded-full bg-gold font-display text-lg leading-none text-night-deep sm:size-12 sm:text-2xl"
          >
            G
          </span>,
        ])}
      </Marquee>
    </div>
  );
}
