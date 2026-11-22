import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutOpening } from "@/components/about/AboutOpening";
import { AboutGlance } from "@/components/about/AboutGlance";
import { aboutMeta } from "@/data/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: "/about" },
  openGraph: { title: aboutMeta.title, description: aboutMeta.description, url: "/about" },
};

/**
 * ABOUT (redesign). One section per milestone:
 *   hero (M17-19) -> opening (M18) -> "Glist at a glance" strip (M19) -> sections
 *   (background, mission, vision, values) -> process
 * No circle bands anywhere until the design asks for them.
 */
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutOpening />
      <AboutGlance />
    </main>
  );
}
