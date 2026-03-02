import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import type { Env } from "./env";
import { health } from "./infra/health";

// Types
type CreateAppConfig = ConstructorParameters<typeof Elysia>[0] & {
  env?: Env;
};

// Route builder
const addRoutes = <T extends Elysia>(app: T, corsOrigin: string[]) =>
  app.use(cors({ origin: corsOrigin })).use(health);

// App type export
export type App = ReturnType<typeof addRoutes>;

// App factory
export const createApp = (config?: CreateAppConfig) => {
  const env = config?.env || { CORS_ORIGIN: [] };
  return addRoutes(new Elysia({ aot: false }), env.CORS_ORIGIN);
};
