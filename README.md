# Catarchy

Bun monorepo: React frontend + Elysia backend on Cloudflare.

## Tech Stack

- **Frontend**: React, Vite, Tailwind, TanStack Router/Query, Eden, Zod
- **Backend**: Elysia, OpenAPI, Zod, Cloudflare Workers

## Dev

```bash
bun install

# Terminal 1: Frontend
cd apps/catarchy-frontend && bun run dev

# Terminal 2: Backend
cd apps/catarchy-backend && bun run dev
```

## Deploy

```bash
# Frontend
cd apps/catarchy-frontend && bun run build && npx wrangler pages deploy dist

# Backend
cd apps/catarchy-backend && npx wrangler deploy
```

## URLs

- Frontend: https://catarchy-frontend.hjjam100.workers.dev
- Backend: https://catarchy-backend.hjjam100.workers.dev
- Docs: https://catarchy-backend.hjjam100.workers.dev/openapi
