import { api } from "@/features/common";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function checkToken() {
  return api.auth.check.get();
}

export function checkTokenOptions() {
  return queryOptions({
    queryKey: ["auth", "check"],
    queryFn: checkToken,
    staleTime: Infinity,
  });
}

export function useIsAuthenticated() {
  const { data } = useQuery(checkTokenOptions());

  return Boolean(data?.data?.ok);
}
