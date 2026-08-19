import Link from "next/link";

const nav = [
  { href: "/listings", label: "Listings" },
  { href: "/videos", label: "Videos" },
  { href: "/resources", label: "Resources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="stencil text-lg text-foreground">
            BAD<span className="text-accent">/</span>MARKET
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono px-3 py-2 text-sm uppercase tracking-wide text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="drift-divider mx-5" />
    </header>
  );
}
