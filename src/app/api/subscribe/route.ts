/**
 * POST /api/subscribe
 * Newsletter sign-up from the Insights page. Emails the new address to the firm through
 * Resend (same env vars as /api/contact). Without RESEND_API_KEY it answers 503.
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
      html: `<h2>New newsletter subscriber</h2><p>${esc(email)}</p><p>Added from the Insights page.</p>`,
    }),
  });
  if (!res.ok) return Response.json({ error: "Could not subscribe" }, { status: 502 });
  return Response.json({ ok: true });
}
