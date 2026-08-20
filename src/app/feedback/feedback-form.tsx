"use client";

import { useState } from "react";

type Intent = "looking-for" | "resource" | "feature" | "general";

const intents: { value: Intent; label: string; hint: string }[] = [
  {
    value: "looking-for",
    label: "I'm hunting for something",
    hint: "e.g. more BMWs, an S13 coupe, a specific part…",
  },
  {
    value: "resource",
    label: "Wish there was a resource on…",
    hint: "e.g. how to start drifting, tire budgets, first build…",
  },
  {
    value: "feature",
    label: "The site should do…",
    hint: "e.g. price alerts, saved searches, seller DMs…",
  },
  {
    value: "general",
    label: "Just some feedback",
    hint: "Tell us what's good, what sucks, what's missing.",
  },
];

export function FeedbackForm() {
  const [intent, setIntent] = useState<Intent>("looking-for");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [contactOk, setContactOk] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const active = intents.find((i) => i.value === intent)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("submitting");

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent, message, email, contactOk }),
      });
    } catch {
      // Even if the endpoint isn't wired yet, don't block the user.
    }

    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="cut-outline-solid bg-surface p-8 text-center">
        <div className="mono text-xs uppercase tracking-widest text-accent">
          Received
        </div>
        <h2 className="mt-2 text-2xl font-black text-foreground">
          We got it. 🏁
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thanks for telling us what you&apos;re after. This is exactly how the
          Market grows — we read every one and reach back out when we find what
          you&apos;re looking for.
        </p>
        <button
          onClick={() => {
            setMessage("");
            setEmail("");
            setStatus("idle");
          }}
          className="mono mt-6 inline-block cut-outline-solid bg-surface-2 px-5 py-3 text-sm uppercase tracking-wider text-foreground transition-colors hover:text-accent"
        >
          Send another ↗
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <div className="stencil mb-3 text-sm text-muted">What&apos;s up?</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {intents.map((i) => {
            const selected = i.value === intent;
            return (
              <button
                key={i.value}
                type="button"
                onClick={() => setIntent(i.value)}
                className={`cut-outline-solid p-4 text-left transition-transform hover:-translate-y-0.5 ${
                  selected
                    ? "bg-accent/15 text-foreground"
                    : "bg-surface text-muted"
                }`}
              >
                <div
                  className={`mono text-[11px] uppercase tracking-wider ${
                    selected ? "text-accent" : "text-muted"
                  }`}
                >
                  {selected ? "● Selected" : "○"}
                </div>
                <div className="mt-1 font-semibold text-foreground">
                  {i.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="feedback-message"
          className="stencil mb-2 block text-sm text-muted"
        >
          Details
        </label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={active.hint}
          rows={5}
          required
          className="w-full cut-outline-solid bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label
          htmlFor="feedback-email"
          className="stencil mb-2 block text-sm text-muted"
        >
          Email <span className="text-muted/70">(optional)</span>
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full cut-outline-solid bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <label className="mono mt-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
          <input
            type="checkbox"
            checked={contactOk}
            onChange={(e) => setContactOk(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Cool to reach back out when we find it
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || !message.trim()}
        className="mono w-full cut-outline-solid bg-accent px-6 py-4 text-sm font-bold uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-40 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send it →"}
      </button>
    </form>
  );
}
