import { getResources } from "@/lib/data";
import type { ResourceType } from "@/lib/types";

export const metadata = {
  title: "Resources | Bad Market",
};

const typeLabels: Record<ResourceType, string> = {
  guide: "Guide",
  shop: "Shop",
  community: "Community",
  tool: "Tool",
  event: "Event",
};

const typeAccent: Record<ResourceType, string> = {
  guide: "text-accent",
  shop: "text-foreground",
  community: "text-accent",
  tool: "text-foreground",
  event: "text-accent",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  // Group by type
  const groups = resources.reduce<Record<string, typeof resources>>(
    (acc, r) => {
      (acc[r.type] ||= []).push(r);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-2 mono text-xs uppercase tracking-widest text-accent">
        Directory
      </div>
      <h1 className="text-4xl font-black text-foreground">Resources</h1>
      <p className="mt-2 max-w-xl text-muted">
        Trusted shops, communities, guides, and events. A starting map for the
        drift world.
      </p>

      <div className="mt-10 space-y-10">
        {Object.entries(groups).map(([type, items]) => (
          <section key={type}>
            <h2 className="stencil mb-4 text-sm text-muted">
              {typeLabels[type as ResourceType] ?? type}s
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 cut-outline-solid bg-surface p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div
                    className={`mono text-[10px] uppercase tracking-wider ${typeAccent[r.type]}`}
                  >
                    {typeLabels[r.type]}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted">{r.description}</p>
                  <span className="mono mt-2 text-[11px] uppercase tracking-wider text-muted group-hover:text-foreground">
                    Visit ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
