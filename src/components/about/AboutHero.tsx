import { PageHero } from "@/components/layout/PageHero";
import { Magnetic } from "@/components/motion/Magnetic";
import { Coin } from "@/components/ui/Coin";
import { aboutHero as copy } from "@/data/about";

/** About page hero: one large coin photo with two smaller ones tucked behind it. */
export function AboutHero() {
  const { main, small1, small2 } = copy.images;
  return (
    <PageHero
      breadcrumb={copy.breadcrumb}
      eyebrow={copy.eyebrow}
      titleLines={copy.titleLines}
      lead={copy.lead}
      primaryCta={copy.primaryCta}
      secondaryCta={copy.secondaryCta}
      visual={
        <div className="relative mx-auto h-[min(26rem,78vw)] w-[min(30rem,92%)] lg:h-[min(34rem,62svh)] lg:w-full">
          <Magnetic strength={0.12} className="absolute right-0 top-1/2 w-[72%] -translate-y-1/2" innerClassName="w-full">
            <Coin {...main} shape="circle" depth={16} priority sizes="(min-width: 1024px) 28rem, 70vw" />
          </Magnetic>
          <Magnetic strength={0.3} className="absolute bottom-[4%] left-0 w-[34%]" innerClassName="w-full">
            <Coin {...small1} shape="circle" depth={10} sizes="12rem" />
          </Magnetic>
          <Magnetic strength={0.3} className="absolute left-[14%] top-0 w-[24%]" innerClassName="w-full">
            <Coin {...small2} shape="circle" depth={8} sizes="9rem" />
          </Magnetic>
        </div>
      }
    />
  );
}
