import { getVideos } from "@/lib/data";

export const metadata = {
  title: "Videos — Bad Market",
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-2 mono text-xs uppercase tracking-widest text-accent">
        Watch &amp; learn
      </div>
      <h1 className="text-4xl font-black text-foreground">Videos</h1>
      <p className="mt-2 max-w-xl text-muted">
        Build guides, install walkthroughs, and driving tips — curated so you
        don&apos;t have to dig through the algorithm.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden cut-outline-solid bg-surface transition-transform hover:-translate-y-0.5"
          >
            <div className="relative aspect-video overflow-hidden bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                alt={v.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center bg-accent text-white transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="mono text-[11px] uppercase tracking-wider text-muted">
                {v.channel}
              </div>
              <h3 className="font-semibold leading-snug text-foreground group-hover:text-accent">
                {v.title}
              </h3>
              <div className="mt-auto flex flex-wrap gap-1 pt-2">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="mono border border-ink/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
