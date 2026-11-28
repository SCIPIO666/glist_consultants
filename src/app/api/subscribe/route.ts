/**
 * POST /api/subscribe
 * Newsletter sign-up from the Insights page. Needs explicit consent.
 * With BREVO_API_KEY + BREVO_LIST_ID the address goes into that Brevo list; otherwise it is
 * emailed to the firm through Resend (same env vars as /api/contact), else 503.
 * Later you can swap the fetch for Mailchimp, Brevo, Sanity or any list provider.
 */
import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (clean(body.website, 50)) return Response.json({ ok: true }); // honeypot

  const email = clean(body.email, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Please enter a valid email" }, { status: 422 });

  // Explicit, unticked-by-default consent is required (Kenya Data Protection Act, 2019)
  if (body.consent !== true) return Response.json({ error: "Please tick the box to agree to receive emails" }, { status: 422 });
  const consentAt = new Date().toISOString();

  // Preferred: Brevo list. Brevo adds the unsubscribe link to every campaign automatically.
  const brevoKey = process.env.BREVO_API_KEY;
  const brevoList = Number(process.env.BREVO_LIST_ID);
  if (brevoKey && brevoList) {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": brevoKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, listIds: [brevoList], updateEnabled: true }),
    });
    if (r.ok || r.status === 204) return Response.json({ ok: true });
    // Brevo's reason shows in the server terminal / Vercel logs (never sent to the visitor)
    console.error("[subscribe] Brevo refused:", r.status, await r.text().catch(() => ""));
    return Response.json({ error: "Could not subscribe" }, { status: 502 });
  }

  // Fallback: email the address (with proof of consent) to the firm through Resend.
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email is not configured" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: email,
      subject: "New newsletter subscriber",
      html: `<h2>New newsletter subscriber</h2><p>${esc(email)}</p><p>Added from the Insights page. Consent given: yes, at ${consentAt}.</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[subscribe] Resend refused:", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Could not subscribe" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
