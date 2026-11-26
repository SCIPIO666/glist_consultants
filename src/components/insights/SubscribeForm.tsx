"use client";

import { useState, type FormEvent } from "react";

type State = "idle" | "sending" | "done" | "error";

/** Newsletter sign-up for the Insights page (posts to /api/subscribe). */
export function SubscribeForm() {
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
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "error");
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error && err.message !== "error" ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <section aria-labelledby="subscribe-title" className="mt-12 overflow-hidden rounded-card bg-night p-7 text-white shadow-card sm:p-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-kra-light">Stay in the loop</p>
          <h2 id="subscribe-title" className="mt-3 text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] font-medium leading-tight">
            Get new tax and money guides by email
          </h2>
          <p className="mt-3 text-white/70">One short email when we publish. No spam, unsubscribe any time.</p>
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
            {state === "error" && (
              <p role="alert" className="text-sm text-white sm:basis-full">{msg}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
