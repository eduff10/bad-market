import { NextResponse } from "next/server";

type FeedbackPayload = {
  intent?: string;
  message?: string;
  email?: string;
  contactOk?: boolean;
};

const intentLabels: Record<string, string> = {
  "looking-for": "Looking for something",
  resource: "Wants a resource",
  feature: "Feature request",
  general: "General feedback",
};

export async function POST(req: Request) {
  let body: FeedbackPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Message required" },
      { status: 400 }
    );
  }

  const record = {
    intent: body.intent ?? "general",
    intentLabel: intentLabels[body.intent ?? "general"] ?? "General feedback",
    message,
    email: (body.email ?? "").trim(),
    contactOk: body.contactOk ?? false,
    at: new Date().toISOString(),
  };

  // Always log server-side as a fallback.
  console.log("[feedback]", record);

  // Forward to the configured sink (Formspree, webhook, etc.) when set.
  const webhook = process.env.FEEDBACK_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Formspree-friendly named fields (also fine for any JSON sink)
          type: record.intentLabel,
          message: record.message,
          email: record.email || "(none given)",
          _replyto: record.email || undefined,
          contactOk: record.contactOk ? "Yes" : "No",
          time: record.at,
          intent: record.intent,
        }),
      });
    } catch (err) {
      console.error("[feedback] webhook forward failed", err);
      // Don't fail the user's submission if the sink is down.
    }
  }

  return NextResponse.json({ ok: true });
}
