import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero/HomeHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * HOME. Sections are added one milestone at a time, in this order:
 *   hero (M4) -> intro -> services -> why us -> reviews -> insights -> final CTA
 * The footer is already part of the shell.
 */
export default function Home() {
  return (
    <main>
      <HomeHero />

      {/* TEMPORARY: remove when the intro section arrives (M5). */}
      <section className="bg-sand">
        <div className="wrap section-y text-center">
          <p className="eyebrow text-brand">Coming next</p>
          <h2 className="mt-4 text-h2">The intro section goes here.</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Scroll to the bottom to check the {site.shortName} footer reveal.
          </p>
        </div>
      </section>
    </main>
  );
}
