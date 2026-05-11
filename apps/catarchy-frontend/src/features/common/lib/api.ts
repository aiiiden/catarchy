import type { App } from "@backend/app";
import { treaty } from "@elysiajs/eden";
import { ClientError, NetworkError, ServerConnectionError } from "./error";

let refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${window.location.origin}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function fetchWithRefresh(input: RequestInfo | URL, init?: RequestInit) {
  try {
    const response = await fetch(input, { ...init, credentials: "include" });

    const requestId = response.headers.get("x-request-id");

    if (response.status === 502 && !requestId) {
      throw new ServerConnectionError(
        "Unable to connect to the server. Please try again later.",
      );
    }

    const isCheckEndpoint = getPathname(input).endsWith("/auth/check");
    const isRefreshEndpoint = getPathname(input).endsWith("/auth/refresh");

    if (response.status !== 401) return response;

    if (isRefreshEndpoint || isCheckEndpoint) {
      return response;
    }

    const refreshed = await refreshToken();

    if (!refreshed) {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
      return response;
    }

    return await fetch(input, { ...init, credentials: "include" });
  } catch (error) {
    if (error instanceof ClientError) {
      throw error;
    }
    throw new NetworkError(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again later.",
    );
  }
}

export const api = treaty<App>(`${window.location.origin}/api`, {
  fetcher: fetchWithRefresh as typeof fetch,
});

function getPathname(input: RequestInfo | URL) {
  if (typeof input === "string") {
    return new URL(input, window.location.origin).pathname;
  }

  if (input instanceof URL) {
    return input.pathname;
  }

  if (input instanceof Request) {
    return new URL(input.url, window.location.origin).pathname;
  }

  return "";
}
