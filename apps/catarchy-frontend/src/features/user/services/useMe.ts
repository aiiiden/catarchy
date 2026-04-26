import { api } from "@/features/common";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.user.me.get();
      return data;
    },
    staleTime: Infinity,
  });
}
