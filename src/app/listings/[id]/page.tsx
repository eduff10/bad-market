import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById, getListings } from "@/lib/data";

export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({ id: l.id }));
}

function formatPrice(price: number | null, currency: string): string {
  if (price === null) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const spec: [string, string][] = [
    ["Make", listing.make],
    ["Model", listing.model],
    ["Year", listing.year ? String(listing.year) : "—"],
    ["Category", listing.category],
    ["Location", listing.location],
    ["Status", listing.status],
    ["Posted", listing.postedAt],
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link
        href="/listings"
        className="mono text-xs uppercase tracking-wider text-muted hover:text-accent"
      >
        ← Back to listings
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden cut-outline-solid bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
          {listing.featured && (
            <span className="mono absolute right-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              ★ Featured
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mono mb-2 text-xs uppercase tracking-widest text-accent">
            {listing.category === "car" ? "Drift Build" : "Part"}
          </div>
          <h1 className="text-3xl font-black leading-tight text-foreground">
            {listing.title}
          </h1>
          <div className="stencil mt-4 text-3xl text-accent">
            {formatPrice(listing.price, listing.currency)}
          </div>

          <p className="mt-6 text-muted">{listing.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden cut-outline-solid bg-ink">
            {spec.map(([k, v]) => (
              <div key={k} className="bg-surface p-3">
                <dt className="mono text-[10px] uppercase tracking-wider text-muted">
                  {k}
                </dt>
                <dd className="mt-1 text-sm capitalize text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <a
            href={listing.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="stencil mt-8 inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm text-white transition-transform hover:-translate-y-0.5"
          >
            View original listing ↗
          </a>
          <p className="mono mt-3 text-[11px] uppercase tracking-wider text-muted">
            Bad Market curates — deals happen with the original seller.
          </p>
        </div>
      </div>
    </div>
  );
}
