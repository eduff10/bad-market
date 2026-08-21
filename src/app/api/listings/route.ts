import { NextResponse } from "next/server";

type ListingPayload = {
  id?: string;
  title?: string;
  category?: string;
  price?: number | string | null;
  currency?: string;
  location?: string;
  make?: string;
  model?: string;
  year?: number | string | null;
  description?: string;
  imageUrl?: string;
  sourceUrl?: string;
  status?: string;
  featured?: boolean | string;
  postedAt?: string;
};

export async function POST(req: Request) {
  let body: ListingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const title = (body.title ?? "").trim();
  if (!title) {
    return NextResponse.json(
      { ok: false, error: "Title required" },
      { status: 400 }
    );
  }

  const record = {
    id: body.id ?? `l-${Date.now()}`,
    title,
    category: body.category ?? "car",
    price: body.price ?? "",
    currency: body.currency ?? "USD",
    location: body.location ?? "",
    make: body.make ?? "",
    model: body.model ?? "",
    year: body.year ?? "",
    description: body.description ?? "",
    imageUrl: body.imageUrl ?? "",
    sourceUrl: body.sourceUrl ?? "",
    status: body.status ?? "available",
    featured: body.featured ?? false,
    postedAt: body.postedAt ?? new Date().toISOString(),
  };

  const webhook = process.env.LISTINGS_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "LISTINGS_WEBHOOK_URL not configured" },
      { status: 500 }
    );
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.error("[listings] webhook forward failed", err);
    return NextResponse.json(
      { ok: false, error: "Forward failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: record.id });
}
