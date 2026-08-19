import Link from "next/link";
import type { Listing } from "@/lib/types";

function formatPrice(price: number | null, currency: string): string {
  if (price === null) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

const statusStyles: Record<Listing["status"], string> = {
  available: "bg-ink text-surface",
  pending: "bg-surface-2 text-foreground border-2 border-dashed border-ink",
  sold: "bg-accent text-white",
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex flex-col overflow-hidden cut-outline-solid bg-surface transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 flex gap-2 p-3">
          <span
            className={`mono px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyles[listing.status]}`}
          >
            {listing.status}
          </span>
          <span className="mono bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-surface">
            {listing.category}
          </span>
        </div>
        {listing.featured && (
          <span className="mono absolute right-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            ★ Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="mono text-[11px] uppercase tracking-wider text-muted">
          {listing.make} · {listing.location}
        </div>
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent">
          {listing.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="stencil text-lg text-accent">
            {formatPrice(listing.price, listing.currency)}
          </span>
          <span className="mono text-[11px] uppercase tracking-wider text-muted transition-colors group-hover:text-foreground">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
