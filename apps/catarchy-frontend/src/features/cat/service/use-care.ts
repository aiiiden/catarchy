import { api } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await api.cat.care.post();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cat"] });
    },
  });
}
