import { api, type InferError } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearTokens, getRefreshToken } from "../lib/auth-store";

type Endpoint = (typeof api.auth)["sign-out"]["post"];
export type SignOutError = InferError<Endpoint>;

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation<void, SignOutError>({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return;
      const { error } = await api.auth["sign-out"].post({ refreshToken });
      if (error) throw error;
    },
    onSettled: () => {
      clearTokens();
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["cat"] });
    },
  });
}
