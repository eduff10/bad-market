import type { Listing, Video, Resource } from "./types";
import { mockListings, mockVideos, mockResources } from "./mock-data";

/**
 * SINGLE SOURCE OF TRUTH for Bad Market data.
 *
 * Today: returns mock data (see mock-data.ts).
 * Tomorrow: flip USE_SHEET to true and set the env vars to read
 * straight from a published Google Sheet (CSV) — no other code changes.
 *
 * How the Sheet swap works:
 *   1. Build a Google Sheet with one tab per model: "Listings", "Videos", "Resources".
 *   2. File > Share > Publish to web (publish the whole document).
 *   3. Grab the published doc's PUB_ID (the long token after /d/e/ in the
 *      published url) + each tab's gid.
 *   4. Set env vars in Vercel (and .env.local):
 *        SHEET_PUB_ID=2PACX-...
 *        SHEET_GID_LISTINGS=<gid>
 *        SHEET_GID_VIDEOS=<gid>
 *        SHEET_GID_RESOURCES=<gid>
 *   5. Set USE_SHEET = true below.
 *
 * The CSV column headers must match the field names in types.ts.
 */

const USE_SHEET = true;

// Cache for 5 min so we're not hammering Google on every request.
const REVALIDATE_SECONDS = 300;

function csvUrl(gid: string): string {
  const pubId = process.env.SHEET_PUB_ID;
  return `https://docs.google.com/spreadsheets/d/e/${pubId}/pub?gid=${gid}&single=true&output=csv`;
}

// Minimal CSV parser (handles quoted fields + commas/newlines inside quotes).
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows
    .slice(1)
    .filter((r) => r.some((cell) => cell.trim() !== ""))
    .map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => (obj[h] = (r[idx] ?? "").trim()));
      return obj;
    });
}

async function fetchSheet(gid: string): Promise<Record<string, string>[]> {
  const res = await fetch(csvUrl(gid), {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  return parseCsv(await res.text());
}

function toBool(v: string): boolean {
  return ["true", "yes", "1", "y"].includes(v.toLowerCase());
}

function toNumOrNull(v: string): number | null {
  if (!v || v.trim() === "") return null;
  const n = Number(v.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

// ---- Public API ----

export async function getListings(): Promise<Listing[]> {
  if (!USE_SHEET) return mockListings;
  const rows = await fetchSheet(process.env.SHEET_GID_LISTINGS!);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: (r.category as Listing["category"]) || "car",
    price: toNumOrNull(r.price),
    currency: r.currency || "USD",
    location: r.location,
    make: r.make,
    model: r.model,
    year: toNumOrNull(r.year),
    description: r.description,
    imageUrl: r.imageUrl,
    sourceUrl: r.sourceUrl,
    status: (r.status as Listing["status"]) || "available",
    featured: toBool(r.featured),
    postedAt: r.postedAt,
  }));
}

export async function getVideos(): Promise<Video[]> {
  if (!USE_SHEET) return mockVideos;
  const rows = await fetchSheet(process.env.SHEET_GID_VIDEOS!);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    channel: r.channel,
    youtubeId: r.youtubeId,
    tags: (r.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    addedAt: r.addedAt,
  }));
}

export async function getResources(): Promise<Resource[]> {
  if (!USE_SHEET) return mockResources;
  const rows = await fetchSheet(process.env.SHEET_GID_RESOURCES!);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    type: (r.type as Resource["type"]) || "guide",
    url: r.url,
    description: r.description,
    tags: (r.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
  }));
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  const all = await getListings();
  return all.find((l) => l.id === id);
}
