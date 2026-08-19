import Link from "next/link";
import { getListings, getVideos, getResources } from "@/lib/data";

export default async function Home() {
  const [listings, videos, resources] = await Promise.all([
    getListings(),
    getVideos(),
    getResources(),
  ]);

  const active = listings.filter((l) => l.status !== "sold");
  const carCount = active.filter((l) => l.category === "car").length;
  const partCount = active.filter((l) => l.category === "part").length;

  // Build category indexes with counts (Craigslist-style link lists).
  const countBy = (key: "make" | "location") => {
    const map = new Map<string, number>();
    for (const l of active) {
      const v = l[key];
      if (!v) continue;
      map.set(v, (map.get(v) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };

  const makes = countBy("make");
  const locations = countBy("location");
  const featured = active.filter((l) => l.featured).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      {/* Search / status bar */}
      <div className="mb-6 flex flex-col gap-3 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            drift classifieds
          </h1>
          <p className="mono mt-1 text-xs uppercase tracking-widest text-muted">
            <span className="text-accent">{carCount}</span> cars ·{" "}
            <span className="text-accent">{partCount}</span> parts ·{" "}
            <span className="text-accent">{videos.length}</span> videos ·{" "}
            <span className="text-accent">{resources.length}</span> resources
          </p>
        </div>
        <Link
          href="/listings"
          className="stencil cut-outline-solid bg-surface px-5 py-2.5 text-center text-sm text-foreground transition-transform hover:-translate-y-0.5"
        >
          Browse all listings →
        </Link>
      </div>
      <hr className="drift-divider-dotted mb-8" />

      {/* CATEGORY INDEX: the Craigslist grid */}
      <div className="cut-outline relative bg-surface/80 p-6 backdrop-blur-sm">
      <span className="cut-tag absolute -top-2.5 left-4">index</span>
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-4">
        {/* Column 1: For Sale */}
        <IndexColumn title="for sale">
          <IndexLink href="/listings?type=car" label="cars / builds" count={carCount} />
          <IndexLink href="/listings?type=part" label="parts" count={partCount} />
          <IndexLink href="/listings" label="all listings" count={active.length} />
        </IndexColumn>

        {/* Column 2: By Make */}
        <IndexColumn title="by make">
          {makes.map(([make, n]) => (
            <IndexLink
              key={make}
              href={`/listings?make=${encodeURIComponent(make)}`}
              label={make.toLowerCase()}
              count={n}
            />
          ))}
        </IndexColumn>

        {/* Column 3: By Location */}
        <IndexColumn title="by location">
          {locations.map(([loc, n]) => (
            <IndexLink
              key={loc}
              href={`/listings?location=${encodeURIComponent(loc)}`}
              label={loc.toLowerCase()}
              count={n}
            />
          ))}
        </IndexColumn>

        {/* Column 4: Community */}
        <IndexColumn title="community">
          <IndexLink href="/videos" label="videos / guides" count={videos.length} />
          <IndexLink href="/resources" label="resources" count={resources.length} />
        </IndexColumn>
      </div>
      </div>

      {/* FEATURED: compact strip */}
      {featured.length > 0 && (
        <section className="mt-12 pt-8">
          <hr className="drift-divider mb-6" />
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="stencil text-sm text-accent">★ featured</h2>
            <Link
              href="/listings"
              className="mono text-xs uppercase tracking-wide text-muted hover:text-accent"
            >
              see all →
            </Link>
          </div>
          <ul className="cut-outline-solid divide-y divide-dashed divide-[#1a1416]/40 bg-surface">
            {featured.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/listings/${l.id}`}
                  className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-surface-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.imageUrl}
                    alt={l.title}
                    className="h-12 w-16 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground group-hover:text-accent">
                      {l.title}
                    </div>
                    <div className="mono text-[11px] uppercase tracking-wider text-muted">
                      {l.make} · {l.location} · {l.category}
                    </div>
                  </div>
                  <div className="stencil shrink-0 text-sm text-accent">
                    {l.price === null
                      ? "inquire"
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: l.currency,
                          maximumFractionDigits: 0,
                        }).format(l.price)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mission note */}
      <hr className="drift-divider-dotted mt-10" />
      <p className="mono pt-6 text-xs uppercase tracking-wider text-muted">
        Bad Market curates drift listings from across the community. Deals happen
        with the original seller. Two-sided marketplace coming soon.
      </p>
    </div>
  );
}

function IndexColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="stencil mb-3 pb-2 text-sm text-foreground" style={{ borderBottom: "2px dashed var(--ink)" }}>
        {title}
      </h2>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function IndexLink({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-baseline justify-between gap-2 text-sm"
      >
        <span className="text-foreground underline decoration-dotted decoration-[var(--pink-line)] underline-offset-2 transition-colors group-hover:text-accent group-hover:decoration-accent">
          {label}
        </span>
        <span className="mono text-[11px] text-muted">{count}</span>
      </Link>
    </li>
  );
}
