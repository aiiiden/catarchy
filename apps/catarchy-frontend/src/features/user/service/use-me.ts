import { api } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const { data, error } = await api.user.me.get();
      if (error) throw error;
      return data;
    },
  });
}
