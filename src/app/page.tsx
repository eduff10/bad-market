import Link from "next/link";
import { getListings } from "@/lib/data";
import { ListingCard } from "@/components/listing-card";
import { Logo } from "@/components/logo";

export default async function Home() {
  const listings = await getListings();
  const featured = listings.filter((l) => l.featured && l.status !== "sold").slice(0, 3);
  const carCount = listings.filter((l) => l.category === "car").length;
  const partCount = listings.filter((l) => l.category === "part").length;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hazard-stripes absolute inset-x-0 bottom-0 h-2 opacity-60" />
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="mono mb-6 inline-flex items-center gap-2 border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-2 w-2 animate-pulse bg-hazard" />
            Now curating · {carCount} cars · {partCount} parts
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-foreground md:text-7xl">
            The drift community&apos;s{" "}
            <span className="text-hazard">hub</span> for builds, parts &amp;
            knowledge.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Bad Market centralizes the best drift listings, videos, and
            resources in one place. Find your next build. Skip the sketchy DMs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/listings"
              className="stencil bg-hazard px-6 py-3 text-sm text-black transition-transform hover:-translate-y-0.5"
            >
              Browse Listings
            </Link>
            <Link
              href="/resources"
              className="stencil border border-border bg-surface px-6 py-3 text-sm text-foreground transition-colors hover:border-hazard-dim"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mono mb-1 text-xs uppercase tracking-widest text-hazard">
              Hand-picked
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Featured Listings
            </h2>
          </div>
          <Link
            href="/listings"
            className="mono text-sm uppercase tracking-wide text-muted hover:text-foreground"
          >
            See all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              href: "/listings",
              kicker: "01",
              title: "Listings",
              body: "Curated drift cars and parts, pulled from across the community.",
            },
            {
              href: "/videos",
              kicker: "02",
              title: "Videos",
              body: "Build guides, install walkthroughs, and driving tips worth your time.",
            },
            {
              href: "/resources",
              kicker: "03",
              title: "Resources",
              body: "Trusted shops, communities, guides, and events in one directory.",
            },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col gap-3 border border-border bg-surface p-6 transition-colors hover:border-hazard-dim"
            >
              <span className="stencil text-4xl text-surface-2 transition-colors group-hover:text-hazard-dim">
                {s.kicker}
              </span>
              <h3 className="text-xl font-bold text-foreground group-hover:text-hazard">
                {s.title}
              </h3>
              <p className="text-sm text-muted">{s.body}</p>
              <span className="mono mt-2 text-xs uppercase tracking-wider text-muted group-hover:text-foreground">
                Enter →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-center gap-4 border border-border bg-surface px-6 py-12 text-center">
          <Logo className="h-12 w-12" />
          <h2 className="max-w-2xl text-2xl font-bold text-foreground">
            Built by drifters, for drifters.
          </h2>
          <p className="max-w-lg text-sm text-muted">
            We&apos;re starting as a hub — the cleanest place to find builds and
            learn the craft. A full two-sided marketplace is coming. Get in
            early.
          </p>
        </div>
      </section>
    </>
  );
}
