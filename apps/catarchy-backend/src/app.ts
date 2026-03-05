import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { getEnv } from "./lib/env";
import { errorHandler } from "./plugin/error-handler";
import { healthRouter } from "./infra/health";
import { openapiPlugin } from "./infra/openapi";
import { authRouter } from "./domain/auth";
import { emailRouter } from "./infra/email";

type CreateAppConfig = {
  adapter?: NonNullable<ConstructorParameters<typeof Elysia>[0]>["adapter"];
};

export const createApp = ({ adapter }: CreateAppConfig = {}) => {
  const env = getEnv();
  return new Elysia({ adapter, normalize: false })
    .use(errorHandler)
    .use(openapiPlugin())
    .use(cors({ origin: env.CORS_ORIGIN }))
    .use(healthRouter())
    .use(authRouter())
    .use(emailRouter());
};

export type App = ReturnType<typeof createApp>;
