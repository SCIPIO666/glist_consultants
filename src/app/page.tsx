import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero/HomeHero";
import { HomeIntro } from "@/components/home/intro/HomeIntro";
import { HomeServices } from "@/components/home/services/HomeServices";
import { HomeWhyUs } from "@/components/home/why/HomeWhyUs";
import { HomeInsights } from "@/components/home/insights/HomeInsights";
import { HomeFinalCta } from "@/components/home/cta/HomeFinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * HOME (complete). Built one milestone at a time:
 *   hero (M4) -> intro (M5) -> services (M6) -> why us: reasons (M7), stats (M8), reviews (M9)
 *   -> insights (M10) -> final CTA (M11)
 * The footer is part of the shell (components/layout/SiteShell).
 */
export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeWhyUs />
      <HomeInsights />
      <HomeFinalCta />
    </main>
  );
}
