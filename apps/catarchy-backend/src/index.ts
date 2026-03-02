import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { createApp } from "./app";
import { envSchema } from "./env";

export type { App } from "./app";

interface WorkerEnv {
  CORS_ORIGIN?: string;
}

const getApp = (env: WorkerEnv) => {
  if (!env.CORS_ORIGIN) {
    throw new Error("❌ CORS_ORIGIN environment variable is required");
  }

  const result = envSchema.safeParse({
    CORS_ORIGIN: env.CORS_ORIGIN,
  });

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    }
    throw new Error("Invalid environment variables");
  }

  return createApp({ adapter: CloudflareAdapter, env: result.data });
};

export default {
  async fetch(request: Request, env: WorkerEnv) {
    try {
      const app = getApp(env);
      return app.fetch(request);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return new Response(
        JSON.stringify({
          error: message,
          env: { CORS_ORIGIN: env.CORS_ORIGIN ? "set" : "missing" },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
