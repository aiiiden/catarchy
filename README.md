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

- Frontend: http://catarchy.net
- Backend: http://api.catarchy.net
- Docs: (Local backend url)/openapi
