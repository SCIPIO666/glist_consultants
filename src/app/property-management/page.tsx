import type { Metadata } from "next";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyIntro } from "@/components/property/PropertyIntro";
import { PropertyServices } from "@/components/property/PropertyServices";
import { PropertyValue } from "@/components/property/PropertyValue";
import { PropertyNews } from "@/components/property/PropertyNews";
import { PropertyClosing } from "@/components/property/PropertyClosing";
import { propertyMeta } from "@/data/propertyManagement";

export const metadata: Metadata = {
  title: propertyMeta.title,
  description: propertyMeta.description,
  alternates: { canonical: "/property-management" },
  openGraph: { title: propertyMeta.title, description: propertyMeta.description, url: "/property-management" },
};

/**
 * PROPERTY MANAGEMENT, rebuilt section by section from the redesign brief.
 * Done:  1 hero (unchanged) -> 2 mask-gradient intro -> 3 services listing -> 4 value proposition
 * Kept:  recent news, final CTA + question strip
 * Next:  5 circular reviews -> 6 decorative CTA
 */
export default function PropertyManagementPage() {
  return (
    <main>
      <PropertyHero />
      <PropertyIntro />
      <PropertyServices />
      <PropertyValue />
      {/* 5 circular reviews, 6 decorative CTA go here */}
      <PropertyNews />
      <PropertyClosing />
    </main>
  );
}
