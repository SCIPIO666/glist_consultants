import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { contactMeta } from "@/data/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: contactMeta.title, description: contactMeta.description, url: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `${contactMeta.title} | ${site.name}`,
  description: contactMeta.description,
  mainEntity: {
    "@type": "ProfessionalService",
    name: site.name,
    slogan: site.tagline,
    telephone: site.phone.tel,
    email: site.email,
    areaServed: "Kenya",
  },
};

/** CONTACT (complete). No hero: the form is the page. Footer comes from the shell. */
export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ContactSection />
    </main>
  );
}
