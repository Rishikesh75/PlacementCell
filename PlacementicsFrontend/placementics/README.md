# Placementics Frontend

Next.js 16 student portal for the IIITDM Placement Cell. Migrated from the Angular `PlacementCellFrontend` app.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/student/login`.

Ensure [PlacementCellBackend](https://github.com/) is running on `https://localhost:7070`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `API_BASE_URL` | Backend API base URL (server-side) |
| `NEXT_PUBLIC_APP_URL` | App URL for redirects |
| `SESSION_SECRET` | Secret for iron-session cookies (min 32 chars) |

## Routes

| Route | Description |
|-------|-------------|
| `/student/login` | Student login (BFF auth) |
| `/student/mainpage` | Navigation hub |
| `/student/interview-feedback` | Submit interview feedback |
| `/student/interview-feedback-display` | View submitted feedback |

## Architecture

- **App Router** — pages under `src/app/`
- **Domain logic** — `src/lib/domain/`, `src/lib/mappers/`
- **API layer** — `src/lib/api/` (fetch) + BFF routes in `src/app/api/auth/`
- **Auth** — iron-session httpOnly cookies + `src/middleware.ts`

## Legacy

The Angular app in `PlacementCellFrontend/` is deprecated. Use this project for all new frontend work.
