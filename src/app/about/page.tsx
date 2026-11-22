import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutOpening } from "@/components/about/AboutOpening";
import { AboutGlance } from "@/components/about/AboutGlance";
import { AboutSections } from "@/components/about/AboutSections";
import { AboutProcess } from "@/components/about/AboutProcess";
import { aboutMeta } from "@/data/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: "/about" },
  openGraph: { title: aboutMeta.title, description: aboutMeta.description, url: "/about" },
};

/**
 * ABOUT (complete). hero (M17-19) -> opening (M18) -> glance strip (M19)
 * -> sections (M20) -> process (M21). The footer comes from the shell.
 * No circle bands anywhere until the design asks for them.
 */
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutOpening />
      <AboutGlance />
      <AboutSections />
      <AboutProcess />
    </main>
  );
}
