import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/client";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["config", "health"],
    queryFn: async () => {
      const { data } = await api.health.get();

      return {
        isHealthy: data?.status === "ok",
      };
    },
  });
}
