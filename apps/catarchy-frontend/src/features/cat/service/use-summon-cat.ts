import { api } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSummonCat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { name: string }) => {
      const { data, error } = await api.cat.post(params);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cat"] });
    },
  });
}
