import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export function useSendVerificationEmail() {
  return useMutation({
    mutationFn: async (params: { email: string }) => {
      const { data, error } =
        await api.auth["send-verification-email"].post(params);
      if (error) throw error;
      return data;
    },
  });
}
