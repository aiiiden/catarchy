import type { App } from "@backend/app";
import { treaty } from "@elysiajs/eden";

let refreshPromise: Promise<boolean> | null = null;

const normalizeContentType = (response: Response) =>
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

const fetchWithRefresh = async (
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const response = await fetch(input, { ...init, credentials: "include" });
  const isCheckEndpoint =
    typeof input === "string" && input.endsWith("/auth/check");

  if (response.status !== 401) return normalizeContentType(response);

  if (!refreshPromise && !isCheckEndpoint) {
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

  const refreshed = await refreshPromise;

  if (!refreshed) {
    window.location.href = "/auth/sign-in";
    return response; // for type consistency
  }

  return normalizeContentType(
    await fetch(input, { ...init, credentials: "include" }),
  );
};

export const api = treaty<App>(`${window.location.origin}/api`, {
  fetcher: fetchWithRefresh as typeof fetch,
});
