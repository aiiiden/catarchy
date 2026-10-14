# Catarchy

Bun monorepo: React frontend + Elysia backend on Cloudflare.

## Tech Stack

- **Frontend**: React 19.3, Vite 8, CSS Modules, TanStack Router/Query, Eden, Zod
- **Backend**: Elysia, OpenAPI, Zod, Cloudflare Workers
- **Tooling**: Bun 1.4.3, TypeScript 6, Oxlint, Oxfmt

## Dev

```bash
bun install

# Terminal 1: Frontend
cd apps/catarchy-frontend && bun run dev

# Terminal 2: Backend
cd apps/catarchy-backend && bun run dev
```

Use the Bun version in `.bun-version`. Node.js 22.12 or later is required for
Node-based tools.

## Code quality

Run these commands from the repository root; they cover both apps and the shared
package:

```bash
bun run lint          # Oxlint, including React Hooks and import boundaries
bun run lint:fix      # Apply safe lint fixes
bun run format        # Oxfmt, including import sorting
bun run format:check  # Check formatting without writing files
bun run typecheck    # Backend declarations, then frontend type checking
bun run test         # Backend unit tests
bun run check        # All code quality checks
bun run build        # Backend, then frontend and service worker
```

CI runs `bun run check` and `bun run build`. Generated routes, database migrations,
and build output are excluded from formatting. Backend declaration imports are
rewritten to relative paths so Eden types resolve correctly in the frontend.

Install the recommended Oxc extension in VS Code, or the Oxc extension in Zed, for
formatting and lint fixes on save. TypeScript stays on 6.0.3 because the CSS Modules
language service plugin requires the JavaScript-based compiler API.

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
