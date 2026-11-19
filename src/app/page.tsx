import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero/HomeHero";
import { HomeIntro } from "@/components/home/intro/HomeIntro";
import { HomeServices } from "@/components/home/services/HomeServices";
import { HomeWhyUs } from "@/components/home/why/HomeWhyUs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * HOME. Sections are added one milestone at a time, in this order:
 *   hero (M4) -> intro (M5) -> services (M6) -> why us: reasons (M7), stats (M8), reviews (M9)
 *   -> insights -> final CTA
 * The footer is already part of the shell.
 */
export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeWhyUs />
    </main>
  );
}
