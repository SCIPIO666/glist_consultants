import type { Metadata } from "next";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyPillars } from "@/components/property/PropertyPillars";
import { PropertyEnquiry } from "@/components/property/PropertyEnquiry";
import { PropertyFocus } from "@/components/property/PropertyFocus";
import { PropertyAbout } from "@/components/property/PropertyAbout";
import { PropertyWhy } from "@/components/property/PropertyWhy";
import { PropertyTasks } from "@/components/property/PropertyTasks";
import { PropertyTestimonials } from "@/components/property/PropertyTestimonials";
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
 * PROPERTY MANAGEMENT. Modelled section by section on the reference page:
 * hero -> three big cards -> enquiry form -> three feature cards -> about -> mission
 * -> numbered check-offs -> task cards -> testimonials -> news -> final CTA + question strip.
 */
export default function PropertyManagementPage() {
  return (
    <main>
      <PropertyHero />
      <PropertyPillars />
      <PropertyEnquiry />
      <PropertyFocus />
      <PropertyAbout />
      <PropertyWhy />
      <PropertyTasks />
      <PropertyTestimonials />
      <PropertyNews />
      <PropertyClosing />
    </main>
  );
}
