import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.name} collects and uses your personal information.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Short privacy notice linked from the newsletter and contact forms.
 * Have the client (or their adviser) review it before relying on it.
 */
export default function PrivacyPage() {
  return (
    <main className="bg-mist text-ink">
      <div className="wrap max-w-[48rem] pb-[clamp(4rem,8vw,7rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))]">
        <h1 className="text-h1 font-medium">Privacy notice</h1>
        <p className="mt-4 text-ink-muted">How {site.name} handles your personal information.</p>

        <div className="mt-10 space-y-8 text-lg leading-[1.75]">
          <section>
            <h2 className="font-display text-2xl font-medium">What we collect</h2>
            <p className="mt-2">Only what you give us: your name, email address, phone number and message when you use the contact form or WhatsApp, and your email address when you subscribe to our updates.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-medium">Why we use it</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 marker:text-kra">
              <li>To reply to your enquiry and provide the service you ask about.</li>
              <li>If you tick the consent box, to send you news, tax reminders and guides by email.</li>
            </ul>
            <p className="mt-2">We do not sell your information. We share it only with the tools that deliver our emails and host this website, under their own privacy terms.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-medium">Unsubscribing and your rights</h2>
            <p className="mt-2">Every email has an unsubscribe link, and you can also write to us at <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> to see, correct or delete your information, or to withdraw your consent at any time. We handle your data in line with the Kenya Data Protection Act, 2019.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-medium">Contact</h2>
            <p className="mt-2">{site.name}, <a className="underline" href={`tel:${site.phone.tel}`}>{site.phone.display}</a>, <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
