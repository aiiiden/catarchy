import { env } from "@/features/config";
import { logger } from "@/shared/lib/logger";
import type { App } from "@backend/index";
import { treaty } from "@elysiajs/eden";
import { nanoid } from "nanoid";

export const api = treaty<App>(env.VITE_API_URL, {
  onRequest(path, options) {
    const requestId = nanoid(6);
    (options.headers as Record<string, string>)["X-Request-Id"] = requestId;

    const headers: Record<string, string> = {};

    for (const [key, value] of Object.entries(options.headers || {})) {
      headers[key] = value as string;
    }

    logger.api.request({
      path,
      method: options.method,
      body: options.body,
      requestId,
      headers,
    });
  },
  async onResponse(response) {
    const responseClone = response.clone();

    logger.api.response({
      requestId: responseClone.headers.get("X-Request-Id") || undefined,
      path: responseClone.url.replace(env.VITE_API_URL, ""),
      status: responseClone.status,
      statusText: responseClone.statusText,
      response: await responseClone.json().catch(() => "Non-JSON response"),
    });
  },
});
