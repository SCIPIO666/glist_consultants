import type { Metadata } from "next";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyIntro } from "@/components/property/PropertyIntro";
import { PropertyServices } from "@/components/property/PropertyServices";
import { PropertyValue } from "@/components/property/PropertyValue";
import { PropertyPoints } from "@/components/property/PropertyPoints";
import { PropertyReviews } from "@/components/property/PropertyReviews";
import { PropertyNews } from "@/components/property/PropertyNews";
import { PropertyClosing } from "@/components/property/PropertyClosing";
import { propertyMeta } from "@/data/propertyManagement";
import { propertyServices } from "@/data/propertyServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: propertyMeta.title,
  description: propertyMeta.description,
  alternates: { canonical: "/property-management" },
  openGraph: { title: propertyMeta.title, description: propertyMeta.description, url: "/property-management" },
};

/**
 * PROPERTY MANAGEMENT, rebuilt section by section from the redesign brief.
 * Done:  1 hero (unchanged) -> 2 mask-gradient intro -> 3 services listing -> 4 value proposition + four-petal "what we take care of"
 *        -> 5 circular reviews
 * Kept:  recent news, final CTA + question strip
 * Next:  6 decorative CTA (background images, overlays, looping image visibility)
 */
export default function PropertyManagementPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Rental Property Management",
            description: propertyMeta.description,
            path: "/property-management",
            offers: propertyServices.items.map((i) => i.title),
          }),
          breadcrumbJsonLd([["Home", "/"], ["Property Management", "/property-management"]]),
        ]}
      />
      <PropertyHero />
      <PropertyIntro />
      <PropertyServices />
      <PropertyValue />
      <PropertyPoints />
      <PropertyReviews />
      {/* 6 decorative CTA goes here */}
      <PropertyNews />
      <PropertyClosing />
    </main>
  );
}
