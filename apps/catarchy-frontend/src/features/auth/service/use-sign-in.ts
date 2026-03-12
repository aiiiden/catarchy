import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { setTokens } from "../lib/auth-store";

export function useSignIn() {
  return useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { data, error } = await api.auth["sign-in-email"].post(params);
      if (error) throw error;
      setTokens(data.accessToken, data.refreshToken);
      return data;
    },
  });
}
