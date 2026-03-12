import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export function useVerifyEmailCode() {
  return useMutation({
    mutationFn: async (params: { email: string; code: string }) => {
      const { data, error } = await api.auth["verify-email-code"].patch(params);
      if (error) throw error;
      return data;
    },
  });
}
