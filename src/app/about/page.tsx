import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBackground } from "@/components/about/AboutBackground";
import { aboutMeta } from "@/data/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: "/about" },
  openGraph: { title: aboutMeta.title, description: aboutMeta.description, url: "/about" },
};

/**
 * ABOUT. Built one section per milestone:
 *   hero (M12) -> background (M13) -> mission + vision -> values -> approach -> closing CTA
 */
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutBackground />
    </main>
  );
}
