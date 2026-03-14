import {
  api,
  type InferData,
  type InferError,
  type InferInput,
} from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

type Endpoint = (typeof api.auth)["sign-up-email"]["post"];
export type SignUpResponse = InferData<Endpoint>;
export type SignUpParams = InferInput<Endpoint>;
export type SignUpError = InferError<Endpoint>;

export function useSignUp() {
  return useMutation<SignUpResponse, SignUpError, SignUpParams>({
    mutationFn: async (params) => {
      const { data, error } = await api.auth["sign-up-email"].post(params);
      if (error) throw error;
      return data;
    },
  });
}
