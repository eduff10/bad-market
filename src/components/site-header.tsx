import Link from "next/link";
import { Logo } from "./logo";

const nav = [
  { href: "/listings", label: "Listings" },
  { href: "/videos", label: "Videos" },
  { href: "/resources", label: "Resources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="hazard-stripes h-1 w-full" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <span className="stencil text-lg text-foreground">
            BAD<span className="text-hazard">/</span>MARKET
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono rounded px-3 py-2 text-sm uppercase tracking-wide text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
