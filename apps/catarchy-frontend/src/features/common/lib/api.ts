import type { App } from "@backend/app";
import { treaty } from "@elysiajs/eden";
import { env } from "./env";

let isRefreshing = false;

const fetchWithRefresh = async (
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const response = await fetch(input, { ...init, credentials: "include" });

  if (response.status !== 401) return response;

  if (isRefreshing) {
    // TODO: remove after testing
    // window.location.href = "/auth/login";
    return response;
  }

  isRefreshing = true;

  try {
    const refreshed = await fetch(`${env.VITE_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshed.ok) {
      // TODO: remove after testing
      // window.location.href = "/auth/login";
      return response;
    }

    return fetch(input, { ...init, credentials: "include" });
  } finally {
    isRefreshing = false;
  }
};

export const api = treaty<App>(env.VITE_API_URL, {
  fetcher: fetchWithRefresh as typeof fetch,
  onRequest(path, options) {
    console.log("Requesting:", path, options);
  },
  onResponse(response) {
    console.log("Received response:", response);
  },
});
