# Catarchy Frontend

React + Vite SPA with TanStack Router/Query, Tailwind, and type-safe API integration.

## Architecture

**FSD Structure**:

```
src/
├── features/       # Feature modules (Feature Sliced Design)
├── shared/         # Shared utilities & API client
├── routes/         # TanStack Router pages (file-based)
├── app.tsx         # Root with QueryClient, Router
└── main.tsx        # Entry with env validation
```

## Dev

```bash
bun run dev          # Port 5173
bun run build
bun run format
bun run lint
```

## Environment

**Development** (`.env`):

```
VITE_API_URL=http://localhost:3000
```

**Production** (Cloudflare Workers dashboard):

```
VITE_API_URL=https://catarchy-backend.hjjam100.workers.dev
```

## Deployment

```bash
bun run build
npx wrangler pages deploy dist
```
