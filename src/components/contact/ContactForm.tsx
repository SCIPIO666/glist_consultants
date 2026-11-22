"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons";
import { services } from "@/data/services";
import { contactForm as copy } from "@/data/contact";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-white/15 bg-night/60 px-4 py-3.5 text-base text-white placeholder:text-white/40 " +
  "transition-[border-color,box-shadow] duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const label = "mb-2 block text-sm font-semibold text-white/80";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [waMessage, setWaMessage] = useState<string | undefined>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    setWaMessage(
      `Hello Glist Consultants, my name is ${data.name}. ${data.service ? `I am interested in: ${data.service}. ` : ""}${data.message}`,
    );
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-gold/30 bg-night/60 p-8">
        <h2 className="font-display text-h3 text-white">{copy.success.title}</h2>
        <p className="mt-3 max-w-md text-white/70">{copy.success.text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={whatsappUrl(waMessage)} variant="whatsapp" icon={<WhatsApp className="text-xl" />}>
            {copy.whatsapp}
          </Button>
          <Button variant="ghost-light" onClick={() => setStatus("idle")}>
            {copy.success.again}
          </Button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-5" aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>{copy.fields.name.label}</label>
          <input id="c-name" name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" placeholder={copy.fields.name.placeholder} className={field} />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>{copy.fields.email.label}</label>
          <input id="c-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder={copy.fields.email.placeholder} className={field} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className={label}>{copy.fields.phone.label}</label>
          <input id="c-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder={copy.fields.phone.placeholder} className={field} />
        </div>
        <div>
          <label htmlFor="c-service" className={label}>{copy.fields.service.label}</label>
          <select id="c-service" name="service" defaultValue="" className={cn(field, "appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11")}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d9a62e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            <option value="" disabled>{copy.fields.service.placeholder}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title} className="text-night-deep">{s.title}</option>
            ))}
            <option value="General enquiry" className="text-night-deep">General enquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="c-message" className={label}>{copy.fields.message.label}</label>
        <textarea id="c-message" name="message" required minLength={10} maxLength={3000} rows={5} placeholder={copy.fields.message.placeholder} className={cn(field, "resize-y")} />
      </div>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-alert-bg px-4 py-3 text-sm font-medium text-alert">
          {copy.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" variant="cta" size="lg" arrow disabled={sending} className={sending ? "opacity-70" : undefined}>
          {sending ? copy.sending : copy.submit}
        </Button>
        <Button href={whatsappUrl()} variant="whatsapp" size="lg" icon={<WhatsApp className="text-xl" />}>
          {copy.whatsapp}
        </Button>
      </div>
      <p className="text-sm text-white/50">{copy.note}</p>
    </form>
  );
}
