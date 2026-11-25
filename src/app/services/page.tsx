import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { ServicesListing } from "@/components/services/ServicesListing";

const title = "Our Services";
const description =
  "Tax and compliance, payroll, registrations, bookkeeping, stock taking, personal financial advisory and rental property management in Kenya.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

/** SERVICES: hero -> intro with a sideways rail of the seven services -> the full list. */
export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesIntro />
      <ServicesListing />
    </main>
  );
}
