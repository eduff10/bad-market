// Core data models for Bad Market.
// These mirror the columns in the source spreadsheet so the swap
// from mock -> Google Sheet is a drop-in.

export type ListingCategory = "car" | "part";
export type ListingStatus = "available" | "pending" | "sold";

export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  price: number | null; // null = "contact for price"
  currency: string; // "USD"
  location: string;
  make: string; // e.g. "Nissan"
  model: string; // e.g. "240SX (S13)"
  year: number | null;
  description: string;
  imageUrl: string;
  sourceUrl: string; // original Facebook listing
  status: ListingStatus;
  featured: boolean;
  postedAt: string; // ISO date
}

export interface Video {
  id: string;
  title: string;
  channel: string;
  youtubeId: string; // just the id, we build the embed/thumb
  tags: string[];
  addedAt: string;
}

export type ResourceType = "guide" | "shop" | "community" | "tool" | "event";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  description: string;
  tags: string[];
}
