import { api, type InferData, type InferError } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

type Endpoint = typeof api.cat.get;
export type CatResponse = InferData<Endpoint>;
export type CatError = InferError<Endpoint>;

export function useCat() {
  return useQuery<CatResponse | null, CatError>({
    queryKey: ["cat"],
    queryFn: async () => {
      const { data, error, status } = await api.cat.get();
      if (status === 404) return null;
      if (error) throw error;
      return data;
    },
  });
}
