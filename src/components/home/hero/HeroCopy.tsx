import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsApp } from "@/components/ui/icons";
import { hero } from "@/data/hero";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Eyebrow + title + lead + buttons, shared by both hero variants.
 * Every block carries data-hero="item": the hero's intro timeline staggers them in.
 * They start at opacity-0 so there is no flash before GSAP takes over.
 */
export function HeroCopy({ align = "center", size = "display" }: { align?: "center" | "left"; size?: "display" | "h1" }) {
  const center = align === "center";
  return (
    <div className={cn("flex flex-col", center ? "items-center text-center" : "items-start text-left")}>
      <div data-hero="item" className="opacity-0">
        <Eyebrow className="whitespace-nowrap text-kra-light max-sm:text-[0.7rem] max-sm:tracking-[0.1em]">{hero.eyebrow}</Eyebrow>
      </div>

      <h1 className={cn("mt-5 text-white", size === "display" ? "text-display" : "text-h1")}>
        {hero.titleLines.map((line, i) => (
          <span key={line} data-hero="item" className={cn("block opacity-0", i === 1 && "italic text-kra-light")}>
            {line}
          </span>
        ))}
      </h1>

      <p data-hero="item" className={cn("mt-6 max-w-2xl text-lead text-white/75 opacity-0", center && "mx-auto")}>
        {hero.lead}
      </p>

      <div data-hero="item" className={cn("mt-9 flex flex-wrap gap-3 opacity-0", center && "justify-center")}>
        <Button href={hero.primaryCta.href} variant="cta" size="lg" arrow>
          {hero.primaryCta.label}
        </Button>
        <Button
          href={whatsappUrl(hero.whatsappMessage)}
          variant="ghost-light"
          size="lg"
          icon={<WhatsApp className="size-5 text-whatsapp" />}
        >
          Chat on WhatsApp
        </Button>
      </div>
    </div>
  );
}
