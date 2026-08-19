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

  const all = await getListings();
  const listings =
    filter === "car" || filter === "part"
      ? all.filter((l) => l.category === filter)
      : all;

  const tabs = [
    { key: "all", label: "All", count: all.length },
    { key: "car", label: "Cars", count: all.filter((l) => l.category === "car").length },
    { key: "part", label: "Parts", count: all.filter((l) => l.category === "part").length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-2 mono text-xs uppercase tracking-widest text-hazard">
        Curated inventory
      </div>
      <h1 className="text-4xl font-black text-foreground">Listings</h1>
      <p className="mt-2 max-w-xl text-muted">
        Drift cars and parts sourced from across the community. Click through to
        the original listing to make contact.
      </p>

      <div className="mt-8 flex gap-2 border-b border-border pb-4">
        {tabs.map((t) => {
          const active = filter === t.key;
          return (
            <Link
              key={t.key}
              href={t.key === "all" ? "/listings" : `/listings?type=${t.key}`}
              className={`mono px-4 py-2 text-sm uppercase tracking-wide transition-colors ${
                active
                  ? "bg-hazard text-black"
                  : "border border-border bg-surface text-muted hover:text-foreground"
              }`}
            >
              {t.label}{" "}
              <span className={active ? "text-black/60" : "text-muted"}>
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
