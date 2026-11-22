/**
 * POST /api/contact
 * Validates the enquiry and emails it through Resend when configured.
 *
 *   RESEND_API_KEY   your Resend key
 *   CONTACT_TO_EMAIL where enquiries go (defaults to the site email)
 *   CONTACT_FROM     verified sender, e.g. "Glist Website <enquiries@yourdomain.co.ke>"
 *
 * Without RESEND_API_KEY it answers 503 so the form shows its WhatsApp fallback.
 * Swap the fetch below for Sanity, a webhook or any other provider later.
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

  // Honeypot: pretend success so bots learn nothing
  if (clean(body.website, 50)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 30);
  const service = clean(body.service, 120);
  const message = clean(body.message, 3000);

  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please check your details" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email is not configured" }, { status: 503 });

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone) || "n/a"}</p>
    <p><strong>Service:</strong> ${esc(service) || "n/a"}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(message).replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: email,
      subject: `Website enquiry from ${name}${service ? `: ${service}` : ""}`,
      html,
    }),
  });

  if (!res.ok) return Response.json({ error: "Could not send" }, { status: 502 });
  return Response.json({ ok: true });
}
