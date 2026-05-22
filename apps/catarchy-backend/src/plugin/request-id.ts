import { Elysia } from "elysia";
import { nanoid } from "nanoid";

import { ENVIRONMENT, getEnv } from "../lib/env";
import { logger } from "../lib/logger";

export const requestId = new Elysia({ name: "requestId" })
  .onBeforeHandle(({ request, set }) => {
    const id = request.headers.get("X-Request-Id") ?? nanoid(6);
    set.headers["X-Request-Id"] = id;
    if (getEnv().ENVIRONMENT === ENVIRONMENT.LOCAL) {
      const url = new URL(request.url);
      logger.request(id, request.method, url.pathname);
    }
  })
  .onAfterHandle(({ request, set }) => {
    if (getEnv().ENVIRONMENT === ENVIRONMENT.LOCAL) {
      const id = set.headers["X-Request-Id"] as string;
      const status = typeof set.status === "number" ? set.status : 200;
      const url = new URL(request.url);
      logger.response(id, status, request.method, url.pathname);
    }
  })
  .as("global");
