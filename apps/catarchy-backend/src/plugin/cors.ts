import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { getEnv } from "../lib/env";

export const corsPlugin = new Elysia({ name: "cors" }).use(
  cors({
    origin: getEnv().CORS_ORIGIN,
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    exposeHeaders: ["X-Request-Id"],
  }),
);
