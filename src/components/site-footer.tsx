import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-7" />
            <span className="stencil text-foreground">
              BAD<span className="text-hazard">/</span>MARKET
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/listings" className="mono text-sm text-muted hover:text-foreground">
              Listings
            </Link>
            <Link href="/videos" className="mono text-sm text-muted hover:text-foreground">
              Videos
            </Link>
            <Link href="/resources" className="mono text-sm text-muted hover:text-foreground">
              Resources
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 md:flex-row md:justify-between">
          <p className="mono text-xs uppercase tracking-wider text-muted">
            © {new Date().getFullYear()} Bad Market — Drift responsibly. Or don&apos;t.
          </p>
          <p className="mono text-xs uppercase tracking-wider text-muted">
            Listings curated from the community
          </p>
        </div>
      </div>
    </footer>
  );
}
