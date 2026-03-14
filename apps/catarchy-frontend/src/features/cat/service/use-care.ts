import { api, type InferData, type InferError } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Endpoint = typeof api.cat.care.post;
export type CareResponse = InferData<Endpoint>;
export type CareError = InferError<Endpoint>;

export function useCare() {
  const queryClient = useQueryClient();

  return useMutation<CareResponse, CareError>({
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
