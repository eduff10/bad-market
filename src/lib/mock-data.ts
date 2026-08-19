import type { Listing, Video, Resource } from "./types";

// MOCK DATA — placeholder until wired to the Google Sheet.
// See src/lib/data.ts for the swap point.

export const mockListings: Listing[] = [
  {
    id: "l-001",
    title: "1991 Nissan 240SX S13 — LS-Swapped Missile",
    category: "car",
    price: 12500,
    currency: "USD",
    location: "Houston, TX",
    make: "Nissan",
    model: "240SX (S13)",
    year: 1991,
    description:
      "Clean LS1 swap, T56 6-speed, welded diff, angle kit, hydro e-brake. Fresh coilovers. Ready to skid.",
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    sourceUrl: "https://facebook.com/marketplace/item/example1",
    status: "available",
    featured: true,
    postedAt: "2026-08-14",
  },
  {
    id: "l-002",
    title: "Wisefab Front Lock Kit — S14/S15",
    category: "part",
    price: 1450,
    currency: "USD",
    location: "Dallas, TX",
    make: "Nissan",
    model: "S14 / S15",
    year: null,
    description:
      "Full Wisefab front lock/angle kit. Used one season, no bends. Massive steering angle upgrade.",
    imageUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
    sourceUrl: "https://facebook.com/marketplace/item/example2",
    status: "available",
    featured: true,
    postedAt: "2026-08-16",
  },
  {
    id: "l-003",
    title: "2004 Mazda RX-8 — Drift Ready, LS Swap Prepped",
    category: "car",
    price: 6800,
    currency: "USD",
    location: "Austin, TX",
    make: "Mazda",
    model: "RX-8",
    year: 2004,
    description:
      "Rotor gone (as expected). Swap mounts fabbed, subframe reinforced. Rolling shell + parts. Perfect base build.",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    sourceUrl: "https://facebook.com/marketplace/item/example3",
    status: "pending",
    featured: false,
    postedAt: "2026-08-12",
  },
  {
    id: "l-004",
    title: "BC Racing BR Coilovers — E46 Non-M",
    category: "part",
    price: 900,
    currency: "USD",
    location: "San Antonio, TX",
    make: "BMW",
    model: "E46",
    year: null,
    description:
      "BC Racing BR series, 30-way adjustable. ~1 year old, rebuildable. Springs included.",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
    sourceUrl: "https://facebook.com/marketplace/item/example4",
    status: "available",
    featured: false,
    postedAt: "2026-08-18",
  },
  {
    id: "l-005",
    title: "1995 Nissan Silvia S14 Kouki — Clean Shell",
    category: "car",
    price: null,
    currency: "USD",
    location: "Oklahoma City, OK",
    make: "Nissan",
    model: "Silvia (S14)",
    year: 1995,
    description:
      "Rare Kouki front end, rust-free shell, no engine. Contact for price — serious builds only.",
    imageUrl:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80",
    sourceUrl: "https://facebook.com/marketplace/item/example5",
    status: "available",
    featured: true,
    postedAt: "2026-08-17",
  },
  {
    id: "l-006",
    title: "Set of 4 — 18x9.5 +12 Work Meister Replicas",
    category: "part",
    price: 750,
    currency: "USD",
    location: "Fort Worth, TX",
    make: "Universal",
    model: "5x114.3",
    year: null,
    description:
      "18x9.5 +12, 5x114.3. Curb rash on two (it's a drift car, relax). Tires 40% tread.",
    imageUrl:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80",
    sourceUrl: "https://facebook.com/marketplace/item/example6",
    status: "sold",
    featured: false,
    postedAt: "2026-08-09",
  },
];

export const mockVideos: Video[] = [
  {
    id: "v-001",
    title: "How To Build A Drift Car On A Budget",
    channel: "Adam LZ",
    youtubeId: "dQw4w9WgXcQ",
    tags: ["build", "budget", "beginner"],
    addedAt: "2026-08-10",
  },
  {
    id: "v-002",
    title: "Angle Kit Install — Full Walkthrough",
    channel: "Driftworks",
    youtubeId: "dQw4w9WgXcQ",
    tags: ["install", "angle-kit", "guide"],
    addedAt: "2026-08-13",
  },
  {
    id: "v-003",
    title: "Learning To Drift — First Track Day Tips",
    channel: "Chelsea DeNofa",
    youtubeId: "dQw4w9WgXcQ",
    tags: ["driving", "beginner", "track"],
    addedAt: "2026-08-15",
  },
];

export const mockResources: Resource[] = [
  {
    id: "r-001",
    title: "Beginner's Guide to Drift Car Setup",
    type: "guide",
    url: "https://example.com/drift-setup-guide",
    description: "Suspension, alignment, and diff basics for your first build.",
    tags: ["setup", "beginner"],
  },
  {
    id: "r-002",
    title: "Enjuku Racing",
    type: "shop",
    url: "https://enjukuracing.com",
    description: "Parts supplier — swap kits, angle kits, and drift essentials.",
    tags: ["parts", "shop"],
  },
  {
    id: "r-003",
    title: "r/Drifting",
    type: "community",
    url: "https://reddit.com/r/drifting",
    description: "Active community for builds, questions, and event planning.",
    tags: ["community", "forum"],
  },
  {
    id: "r-004",
    title: "Local Drift Events Calendar",
    type: "event",
    url: "https://example.com/events",
    description: "Track days, comps, and grassroots meets near you.",
    tags: ["events", "track"],
  },
];
