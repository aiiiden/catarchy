import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  return useMutation({
    mutationFn: async (params: {
      email: string;
      password: string;
      handle: string;
    }) => {
      const { data, error } = await api.auth["sign-up-email"].post(params);
      if (error) throw error;
      return data;
    },
  });
}
