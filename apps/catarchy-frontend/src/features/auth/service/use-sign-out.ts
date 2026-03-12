import { api } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearTokens, getRefreshToken } from "../lib/auth-store";

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
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
