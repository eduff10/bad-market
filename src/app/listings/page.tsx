import Link from "next/link";
import { getListings } from "@/lib/data";
import { ListingCard } from "@/components/listing-card";

export const metadata = {
  title: "Listings — Bad Market",
};

type Search = { [key: string]: string | string[] | undefined };

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  const filter = typeof params.type === "string" ? params.type : "all";
  const make = typeof params.make === "string" ? params.make : null;
  const location = typeof params.location === "string" ? params.location : null;

  const all = await getListings();
  let listings = all;
  if (filter === "car" || filter === "part")
    listings = listings.filter((l) => l.category === filter);
  if (make) listings = listings.filter((l) => l.make === make);
  if (location) listings = listings.filter((l) => l.location === location);

  const activeLabel = make || location || null;

  const tabs = [
    { key: "all", label: "All", count: all.length },
    { key: "car", label: "Cars", count: all.filter((l) => l.category === "car").length },
    { key: "part", label: "Parts", count: all.filter((l) => l.category === "part").length },
  ];

  function tabHref(key: string): string {
    const sp = new URLSearchParams();
    if (key !== "all") sp.set("type", key);
    if (make) sp.set("make", make);
    if (location) sp.set("location", location);
    const qs = sp.toString();
    return qs ? `/listings?${qs}` : "/listings";
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-2 mono text-xs uppercase tracking-widest text-accent">
        Curated inventory
      </div>
      <h1 className="text-4xl font-black text-foreground">
        Listings
        {activeLabel && (
          <span className="text-accent"> · {activeLabel}</span>
        )}
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Drift cars and parts sourced from across the community. Click through to
        the original listing to make contact.
      </p>
      {activeLabel && (
        <Link
          href="/listings"
          className="mono mt-3 inline-block text-xs uppercase tracking-wider text-muted hover:text-accent"
        >
          ✕ Clear filter
        </Link>
      )}

      <div className="mt-8 flex gap-2 pb-4" style={{ borderBottom: "2px dashed var(--ink)" }}>
        {tabs.map((t) => {
          const active = filter === t.key;
          return (
            <Link
              key={t.key}
              href={tabHref(t.key)}
              className={`mono px-4 py-2 text-sm uppercase tracking-wide transition-colors ${
                active
                  ? "bg-ink text-surface"
                  : "cut-outline-solid bg-surface text-foreground hover:text-accent"
              }`}
            >
              {t.label}{" "}
              <span className={active ? "text-surface/70" : "text-muted"}>
                ({t.count})
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {listings.length === 0 && (
        <p className="mono mt-16 text-center text-muted">
          No listings here yet. Check back soon.
        </p>
      )}
    </div>
  );
}
