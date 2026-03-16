import {
  type InferData,
  type InferError,
  type InferInput,
  api,
} from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Endpoint = typeof api.cat.post;
export type SummonCatResponse = InferData<Endpoint>;
export type SummonCatParams = InferInput<Endpoint>;
export type SummonCatError = InferError<Endpoint>;

export function useSummonCat() {
  const queryClient = useQueryClient();

  return useMutation<SummonCatResponse, SummonCatError, SummonCatParams>({
    mutationFn: async (params) => {
      const { data, error } = await api.cat.post(params);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cat"] });
    },
  });
}
