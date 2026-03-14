import {
  api,
  type InferData,
  type InferError,
  type InferInput,
} from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { setTokens } from "../lib/auth-store";

type Endpoint = (typeof api.auth)["sign-in-email"]["post"];
export type SignInResponse = InferData<Endpoint>;
export type SignInParams = InferInput<Endpoint>;
export type SignInError = InferError<Endpoint>;

export function useSignIn() {
  return useMutation<SignInResponse, SignInError, SignInParams>({
    mutationFn: async (params) => {
      const { data, error } = await api.auth["sign-in-email"].post(params);
      if (error) throw error;
      setTokens(data.accessToken, data.refreshToken);
      return data;
    },
  });
}
