# Evergreen — CHH Industry website

Marketing site for **Evergreen** (CHH Industry): doors, doorframes, SPC flooring,
staircases, wall panels and service shafts. Bilingual (TH/EN).

**Stack:** React 19 · Vite 6 · Tailwind CSS 4 · React Router 7

## Project layout

```
.
├── pages/            # Route pages (Home, products, Contact, News, Catalog, Login)
│   └── admin/        # Back-office (Dashboard, News, Products, Accounts)
├── components/       # Layout (Navbar/Footer), Sections, UI
├── contexts/         # LanguageContext (TH/EN) + AuthContext (PocketBase)
├── lib/              # pb.ts — PocketBase client + content types
├── data/             # Static catalog/image data
├── server/           # Zero-dependency Node API (contact → LINE) — runs in Docker
├── pocketbase/       # PocketBase Dockerfile + pb_migrations (content/admin DB)
├── public/           # Static assets (images, logo)
├── Dockerfile        # Builds the nginx image that serves dist/
├── nginx.conf        # SPA serving + /api + /pb proxies + security headers
└── docker-compose.yml# web (nginx) + api (Node) + pb (PocketBase) behind Traefik
```

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev          # Vite dev server on http://localhost:3000
npm run build        # Production build into dist/
npx tsc --noEmit     # Type check
```

The contact form posts to `/api/contact-line`. In local dev there is no API
running, so submissions will fail unless you also run the backend:

```bash
LINE_CHANNEL_ACCESS_TOKEN=xxx LINE_GROUP_ID=yyy node server/index.js
```

## Deployment

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`:

1. Type check + `npm run build`.
2. `scp` `dist/`, `Dockerfile`, `nginx.conf`, `docker-compose.yml` and `server/`
   to the VPS (`/srv/chhindustry-web`).
3. `docker compose up -d --build` — rebuilds the **web** (nginx) and **api**
   (Node) containers, routed by Traefik (TLS).

### Server secrets

On the server, create `/srv/chhindustry-web/.env` (see [`.env.example`](.env.example)):

```
LINE_CHANNEL_ACCESS_TOKEN=...
LINE_GROUP_ID=...
INITIAL_ADMIN_EMAIL=admin@chhindustry.com
INITIAL_ADMIN_PASSWORD=<a strong password>
```

`docker compose` reads this file automatically. The nginx container proxies
`/api/` (contact) and `/pb/` (PocketBase) over the private `appnet` network, so
neither backend is exposed publicly.

GitHub Actions secrets used by the workflow: `SERVER_HOST`, `SERVER_USER`,
`SERVER_PASSWORD`.

## Back-office (CMS)

Content (products + news/promotions), admin accounts, and image uploads are
stored in **PocketBase** (`pocketbase/`), persisted in the `pb_data` Docker
volume. Collections are created automatically by the migrations in
`pocketbase/pb_migrations/` on first start.

- **Admin login:** `https://chhindustry.com/login` → back-office at `/admin`.
- **First admin** is seeded from `INITIAL_ADMIN_EMAIL` / `INITIAL_ADMIN_PASSWORD`
  on the very first deploy (empty volume). After that, add/remove admins under
  **Admin → Accounts**. ⚠️ Change the initial password after first login.
- **What admins manage:**
  - **News & Promotions** → public **/news** page.
  - **Products** → public **/catalog** page (filterable by category).
- **Public reads** only show records with `published = true`; writes require an
  authenticated admin (enforced by PocketBase API rules).

### PocketBase super-admin (optional)

The website back-office covers day-to-day content. If you need PocketBase's own
admin UI (raw DB, backups, settings), create a superuser on the server:

```bash
docker compose exec chhindustry-pb /pb/pocketbase superuser create you@example.com 'strong-password'
```

Then open `https://chhindustry.com/pb/_/`.

### Local dev against PocketBase

```bash
# terminal 1 — PocketBase (download the binary from pocketbase.io)
INITIAL_ADMIN_EMAIL=admin@local INITIAL_ADMIN_PASSWORD=changeme123 \
  ./pocketbase serve --migrationsDir=pocketbase/pb_migrations

# terminal 2 — Vite, pointed at local PocketBase
VITE_PB_URL=http://127.0.0.1:8090 npm run dev
```
