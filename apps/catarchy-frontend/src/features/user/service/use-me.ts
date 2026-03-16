import { type InferData, type InferError, api } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

type Endpoint = typeof api.user.me.get;
export type MeResponse = InferData<Endpoint>;
export type MeError = InferError<Endpoint>;

export function useMe() {
  return useQuery<MeResponse, MeError>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const { data, error } = await api.user.me.get();
      if (error) throw error;
      return data;
    },
  });
}
