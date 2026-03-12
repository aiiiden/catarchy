import { api } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

export function useCat() {
  return useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      const { data, error, status } = await api.cat.get();
      if (status === 404) return null;
      if (error) throw error;
      return data;
    },
  });
}
