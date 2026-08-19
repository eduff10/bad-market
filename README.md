# Bad Market 🪁

The drift community's hub — curated listings, videos, and resources.
MVP: a one-sided curated listing board. Future: two-sided marketplace.

Aesthetic: crash-test-dummy / industrial (near-black + hazard yellow).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Deploy target: **Vercel**
- Data source: **mock now → Google Sheet (CSV) later** (zero DB for MVP)

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Project shape

```
src/
  app/
    page.tsx                 # Home / hub
    listings/page.tsx        # Listings board (+ car/part filter)
    listings/[id]/page.tsx   # Listing detail
    videos/page.tsx          # Curated videos
    resources/page.tsx       # Directory of shops/communities/guides/events
  components/                # Header, footer, logo, listing card
  lib/
    types.ts                 # Data models (mirror the sheet columns)
    data.ts                  # ★ SINGLE SWAP POINT (mock <-> Google Sheet)
    mock-data.ts             # Placeholder data
```

## Swapping mock data → Google Sheet

Everything reads through `src/lib/data.ts`. To go live with a spreadsheet:

1. **Create a Google Sheet** with three tabs: `Listings`, `Videos`, `Resources`.
   Column headers must match the field names in `src/lib/types.ts`.

   **Listings columns:**
   `id, title, category, price, currency, location, make, model, year, description, imageUrl, sourceUrl, status, featured, postedAt`
   - `category`: `car` or `part`
   - `status`: `available`, `pending`, or `sold`
   - `featured`: `true`/`false`
   - `price`: leave blank for "Contact for price"

   **Videos columns:**
   `id, title, channel, youtubeId, tags, addedAt`
   - `youtubeId`: just the id (the part after `v=`)
   - `tags`: comma-separated

   **Resources columns:**
   `id, title, type, url, description, tags`
   - `type`: `guide`, `shop`, `community`, `tool`, or `event`
   - `tags`: comma-separated

2. **File → Share → Publish to web** (or make link-viewable). Note the sheet ID
   from the URL and each tab's `gid`.

3. **Set env vars** (locally in `.env.local`, and in Vercel Project Settings):
   ```
   SHEET_ID=<sheet id from url>
   SHEET_GID_LISTINGS=<gid>
   SHEET_GID_VIDEOS=<gid>
   SHEET_GID_RESOURCES=<gid>
   ```

4. In `src/lib/data.ts`, set `const USE_SHEET = true;`

That's it — no other code changes. Data caches for 5 min (`REVALIDATE_SECONDS`).

## Deploy to Vercel

```bash
npx vercel        # link + preview
npx vercel --prod # production
```

Or push to GitHub and import the repo in the Vercel dashboard.

## Roadmap

- [x] MVP hub (mock data)
- [ ] Wire to Google Sheet
- [ ] Real listings sourced from Facebook
- [ ] Search + more filters
- [ ] Two-sided marketplace (accounts, seller listings, messaging)
