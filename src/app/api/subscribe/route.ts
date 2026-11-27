/**
 * POST /api/subscribe
 * Newsletter sign-up (Insights page banner + the small footer form).
 *
 * What happens to an address:
 *  1. An email "New newsletter subscriber" is sent to CONTACT_TO_EMAIL (default: the firm's address) through
 *     Resend, with the sign-up source (insights / footer). Nothing is stored on the website itself.
 *  2. OPTIONAL: if RESEND_AUDIENCE_ID is also set, the address is added to that Resend audience, which gives
 *     you a real, private list to send newsletters to. If that call fails the sign-up still counts.
 * Without RESEND_API_KEY it answers 503 and the form shows an error.
 *
 * Emails are deliberately NOT saved in Sanity: a Sanity dataset is public to read by default.
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
  const source = clean(body.source, 20) === "footer" ? "the website footer" : "the Insights page";

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email is not configured" }, { status: 503 });
  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: email,
      subject: "New newsletter subscriber",
      html: `<h2>New newsletter subscriber</h2><p>${esc(email)}</p><p>Signed up from ${source}.</p>`,
    }),
  });
  if (!res.ok) return Response.json({ error: "Could not subscribe" }, { status: 502 });

  const audience = process.env.RESEND_AUDIENCE_ID;
  if (audience) {
    try {
      await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audience)}/contacts`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, unsubscribed: false }),
      });
    } catch {
      /* the notification already went out; the list add is a bonus */
    }
  }
  return Response.json({ ok: true });
}
