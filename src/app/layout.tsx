import type { Metadata, Viewport } from "next";
import { Poppins, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/providers/AppChrome";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Heading face (replaces Fraunces). To try another family, change only this block:
// the rest of the site reads it through the --font-display token in globals.css.
const heading = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Handwritten face for the graph labels and annotations.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tax compliance Kenya",
    "KRA returns",
    "VAT registration Kenya",
    "payroll services Kenya",
    "business registration Kenya",
    "bookkeeping Kenya",
    "rental property management Kenya",
    "financial advisory Nairobi",
    "Glist Consultants",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#002025",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${heading.variable} ${caveat.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
