import { api } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";

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
