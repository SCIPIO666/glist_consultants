"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type State = "idle" | "sending" | "done" | "error";

/** Shared sign-up logic (posts to /api/subscribe; explicit consent is required). */
function useSubscribe() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website"), consent: data.get("consent") === "on" }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "error");
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error && err.message !== "error" ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  return { state, msg, onSubmit };
}

/** Full-width sign-up block for the Insights page. */
export function SubscribeForm() {
  const { state, msg, onSubmit } = useSubscribe();

  return (
    <section aria-labelledby="subscribe-title" className="mt-12 overflow-hidden rounded-card bg-night p-7 text-white shadow-card sm:p-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-kra-light">Stay in the loop</p>
          <h2 id="subscribe-title" className="mt-3 text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] font-medium leading-tight">
            Get new tax and money guides by email
          </h2>
          <p className="mt-3 text-white/70">One short email when we publish. No spam. Unsubscribe in one click, any time.</p>
        </div>

        {state === "done" ? (
          <p role="status" className="rounded-card bg-white/10 p-5 text-lg font-medium">
            Thank you, you are subscribed. We will be in touch with the next guide.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <label htmlFor="sub-email" className="sr-only">Email address</label>
            <input
              id="sub-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="min-h-12 flex-1 rounded-pill bg-white px-5 text-ink placeholder:text-ink-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            />
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <button
              type="submit"
              disabled={state === "sending"}
              className="min-h-12 rounded-pill bg-kra px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-kra-deep disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Subscribe"}
            </button>
            <label className="flex basis-full items-start gap-3 text-sm text-white/80">
              <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[#e4202b]" />
              <span>
                Yes, I agree to receive news and tax updates from Glist Consultants by email. I can unsubscribe at any time using the link in every email. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-white">privacy notice</Link>.
              </span>
            </label>
            {state === "error" && (
              <p role="alert" className="text-sm text-white sm:basis-full">{msg}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

/** Small sign-up for the footer (dark background). */
export function SubscribeCompact() {
  const { state, msg, onSubmit } = useSubscribe();

  if (state === "done") {
    return (
      <p role="status" className="text-sm font-medium text-white">
        Thank you, you are subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xs space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-kra-light">Get our updates</p>
      <div className="flex gap-2">
        <label htmlFor="footer-sub-email" className="sr-only">Email address</label>
        <input
          id="footer-sub-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-h-11 min-w-0 flex-1 rounded-pill bg-white px-4 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <button
          type="submit"
          disabled={state === "sending"}
          className="min-h-11 shrink-0 rounded-pill bg-kra px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-kra-deep disabled:opacity-60"
        >
          {state === "sending" ? "…" : "Join"}
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-xs leading-snug text-white/70">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-[#e4202b]" />
        <span>
          I agree to receive emails from Glist Consultants and can unsubscribe at any time.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy notice</Link>.
        </span>
      </label>
      {state === "error" && <p role="alert" className="text-xs text-white">{msg}</p>}
    </form>
  );
}
