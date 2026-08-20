import { FeedbackForm } from "./feedback-form";

export const metadata = {
  title: "Tell Us What You Want | Bad Market",
  description:
    "Looking for a specific car, part, or resource? Tell the Bad Market crew what you want and we'll go find it — and reach back out when we do.",
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="mb-2 mono text-xs uppercase tracking-widest text-accent">
        Wishlist / Feedback
      </div>
      <h1 className="text-4xl font-black text-foreground">
        Tell us what you want.
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Can&apos;t find the build, the part, or the answer you&apos;re after?
        The Market grows from this exact list. Drop what you&apos;re hunting for
        or what would make the site better — we read every one and reach back
        out when we track it down.
      </p>

      <div className="drift-divider my-8" />

      <FeedbackForm />
    </div>
  );
}
