# Gigaplex

**Tagline:** Securing the Future of Gig Workers.

Premium, investor-demo-ready web app: React (Vite) + TypeScript + Tailwind CSS v4 + Framer Motion + Recharts + React Router + Zustand, with an Express API scaffold, JWT/RBAC patterns, SQL schema, and deterministic demo data (124+ workers).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server (http://localhost:5173) — proxies `/api` to the backend when it runs on 8787. |
| `npm run server` | Express API on port **8787**. |
| `npm run dev:full` | Vite + API together. |
| `npm run build` | Production bundle to `dist/`. |
| `npm run preview` | Preview the production build. |

## Auth (demo)

- **Worker:** From `/login`, use **Continue (demo worker)** or sign up and complete onboarding.
- **Admin:** **Admin preview login** — opens `/app/admin` (RBAC enforced in API for admin-only routes).

For API-backed login, `POST /api/auth/login` with JSON `{ "email": "you@corp.com", "password": "anything" }` returns a JWT. Send `Authorization: Bearer <token>` to protected routes.

## Architecture

- `src/app/` — `App.tsx`, `router.tsx`, route guards.
- `src/components/ui/` — Glassmorphism primitives (`GlassCard`, `Button`, `Input`, `Badge`, `Skeleton`).
- `src/components/layout/` — Dashboard shell, AI assistant panel, toasts, page transitions.
- `src/pages/` — Landing, auth, onboarding, and `/app/*` product surfaces.
- `src/data/demoDataset.ts` — Seeded generators for tables, charts, and trust metrics.
- `server/` — Express app, JWT middleware, RBAC, deterministic seed (`server/lib/seed.mjs`).
- `server/schema.sql` — PostgreSQL-oriented DDL for users, earnings, payouts, support, savings, rewards, ratings, AI predictions.

## Security notes (production)

- Replace `JWT_SECRET` and store in a secrets manager.
- Hash passwords (`bcrypt`/`argon2`), never log PII, encrypt payout payloads at rest (column stub in schema).
- Implement rate limits, idempotency keys on payouts, and webhook signature verification for gig platforms.

## PWA

`public/manifest.json` is included; add `vite-plugin-pwa` when you are ready for service worker caching strategies.
