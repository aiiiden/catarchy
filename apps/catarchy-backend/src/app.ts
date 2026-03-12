import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { authRouter } from "./domain/auth";
import { catRouter } from "./domain/cat";
import { userRouter } from "./domain/user";
import { emailRouter } from "./infra/email";
import { healthRouter } from "./infra/health";
import { openapiPlugin } from "./infra/openapi";
import { getEnv } from "./lib/env";
import { errorHandler } from "./plugin/error-handler";

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
    .use(catRouter())
    .use(emailRouter())
    .use(userRouter());
};

export type App = ReturnType<typeof createApp>;
