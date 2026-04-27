import type { App } from "@backend/app";
import { treaty } from "@elysiajs/eden";

let isRefreshing = false;

const fetchWithRefresh = async (
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const response = await fetch(input, { ...init, credentials: "include" });

  const normalized =
    response.headers.get("content-type")?.startsWith("text/plain") &&
    response.headers.get("transfer-encoding") === "chunked"
      ? new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: (() => {
            const h = new Headers(response.headers);
            h.set("content-type", "application/json");
            return h;
          })(),
        })
      : response;

  if (normalized.status !== 401) return normalized;

  if (isRefreshing) {
    window.location.href = "/auth/login";
    return response;
  }

  isRefreshing = true;

  try {
    const refreshed = await fetch(
      `${window.location.origin}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!refreshed.ok) {
      window.location.href = "/auth/login";
      return response;
    }

    return fetch(input, { ...init, credentials: "include" });
  } finally {
    isRefreshing = false;
  }
};

export const api = treaty<App>(`${window.location.origin}/api`, {
  fetcher: fetchWithRefresh as typeof fetch,
});
