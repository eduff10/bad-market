import { NextResponse } from "next/server";

type FeedbackPayload = {
  intent?: string;
  message?: string;
  email?: string;
  contactOk?: boolean;
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

  // For now, just log server-side. Swap this for a DB insert, email,
  // Google Sheet, Airtable, or Slack webhook when you're ready to route it.
  console.log("[feedback]", {
    intent: body.intent ?? "general",
    message,
    email: body.email ?? "",
    contactOk: body.contactOk ?? false,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
