import { api } from "@/features/common";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type ApiResponse = Awaited<
  ReturnType<typeof api.auth.check.get>
>["data"];
export type ApiError = Awaited<ReturnType<typeof api.auth.check.get>>["error"];

export async function checkSession() {
  const { data, error } = await api.auth.check.get();
  if (error) throw error;
  return data;
}

export async function refreshToken() {
  const { data, error } = await api.auth.refresh.post();
  if (error) throw error;
  return data;
}

export function checkSessionOptions() {
  return queryOptions({
    queryKey: ["auth", "check"],
    queryFn: checkSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useIsAuthenticated() {
  const { data } = useQuery(checkSessionOptions());
  return Boolean(data?.ok);
}
