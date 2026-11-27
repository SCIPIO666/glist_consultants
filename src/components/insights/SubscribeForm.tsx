"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type State = "idle" | "sending" | "done" | "error";

/** Shared sign-up logic: posts to /api/subscribe. `source` says which form it came from. */
function useSubscribe(source: string) {
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
        body: JSON.stringify({ email: data.get("email"), website: data.get("website"), source }),
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

/** Newsletter sign-up for the Insights page: the full banner. */
export function SubscribeForm() {
  const { state, msg, onSubmit } = useSubscribe("insights");

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

/** Small version for the footer: one line, label on top, email box with a round button. */
export function SubscribeCompact({ className }: { className?: string }) {
  const { state, msg, onSubmit } = useSubscribe("footer");

  return (
    <div className={cn("max-w-xs", className)}>
      <p id="footer-sub-label" className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-kra-light">New guides by email</p>
      {state === "done" ? (
        <p role="status" className="mt-3 text-sm text-white/85">Thank you, you are subscribed.</p>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-labelledby="footer-sub-label" className="mt-3">
          <div className="flex items-center rounded-pill bg-white/10 p-1 ring-1 ring-white/20 focus-within:ring-gold">
            <label htmlFor="footer-sub-email" className="sr-only">Email address</label>
            <input
              id="footer-sub-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <button
              type="submit"
              disabled={state === "sending"}
              aria-label="Subscribe"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-night-deep transition-transform hover:scale-105 disabled:opacity-60"
            >
              {state === "sending" ? <span className="size-3 animate-pulse rounded-full bg-night-deep" /> : (
                <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              )}
            </button>
          </div>
          {state === "error" && <p role="alert" className="mt-2 text-xs text-white">{msg}</p>}
        </form>
      )}
    </div>
  );
}
