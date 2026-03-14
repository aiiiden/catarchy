import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/features/auth";
import { env } from "@/features/config";
import { logger } from "@/shared/lib/logger";
import type { App } from "@backend/index";
import { treaty } from "@elysiajs/eden";
import { nanoid } from "nanoid";

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${env.VITE_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const accessToken = getAccessToken();
  const headers = new Headers(init?.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401 && getRefreshToken()) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      const newHeaders = new Headers(init?.headers);
      newHeaders.set("Authorization", `Bearer ${getAccessToken()}`);
      response = await fetch(input, { ...init, headers: newHeaders });
    } else {
      clearTokens();
      window.location.href = "/login";
    }
  }

  return response;
}

export const api = treaty<App>(env.VITE_API_URL, {
  fetcher: authFetch as unknown as typeof fetch,
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
