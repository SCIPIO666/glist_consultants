/**
 * TEMPORARY: Alt 2 hero for side-by-side comparison. Visit /hero-alt2.
 * Delete this folder once the client has chosen.
 */
import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero/HomeHero";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function HeroAlt2Page() {
  return (
    <main>
      <HomeHero variant="alt2" />
    </main>
  );
}
