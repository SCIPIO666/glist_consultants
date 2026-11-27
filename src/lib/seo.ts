import { site } from "@/lib/site";
import { services } from "@/data/services";
import { coverage } from "@/data/contactCoverage";

/** Turn "/about" into "https://yoursite.com/about". Set NEXT_PUBLIC_SITE_URL in production. */
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path, site.url).toString();
}

const sameAs = Object.values(site.social).filter(Boolean);

/** Sitewide business entity (used once, in the root layout). No made-up address, rating or price. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": absoluteUrl("/#organization"),
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/logo/logo-full.png"),
        image: absoluteUrl("/opengraph-image"),
        slogan: site.tagline,
        description: site.description,
        telephone: site.phone.tel,
        email: site.email,
        areaServed: [{ "@type": "Country", name: "Kenya" }, ...coverage.places.map((name) => ({ "@type": "City", name }))],
        knowsAbout: services.map((s) => s.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.short, url: absoluteUrl(`/services#${s.slug}`) },
          })),
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: site.name,
        inLanguage: "en-KE",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
    ],
  };
}

/** Breadcrumb trail, e.g. breadcrumbJsonLd([["Home","/"],["Our Services","/services"]]). */
export function breadcrumbJsonLd(trail: ReadonlyArray<readonly [name: string, path: string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

/** The seven services as a list of Service entities (services page). */
export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.intro,
        url: absoluteUrl(`/services#${s.slug}`),
        serviceType: s.title,
        provider: { "@id": absoluteUrl("/#organization") },
        areaServed: "Kenya",
      },
    })),
  };
}

/** One service on its own page (property management). */
export function serviceJsonLd(opts: { name: string; description: string; path: string; offers?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.name,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Kenya",
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: opts.offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
          },
        }
      : {}),
  };
}
