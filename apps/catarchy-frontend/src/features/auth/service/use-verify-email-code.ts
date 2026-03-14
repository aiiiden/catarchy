import {
  api,
  type InferData,
  type InferError,
  type InferInput,
} from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

type Endpoint = (typeof api.auth)["verify-email-code"]["patch"];
export type VerifyEmailCodeResponse = InferData<Endpoint>;
export type VerifyEmailCodeParams = InferInput<Endpoint>;
export type VerifyEmailCodeError = InferError<Endpoint>;

export function useVerifyEmailCode() {
  return useMutation<VerifyEmailCodeResponse, VerifyEmailCodeError, VerifyEmailCodeParams>({
    mutationFn: async (params) => {
      const { data, error } = await api.auth["verify-email-code"].patch(params);
      if (error) throw error;
      return data;
    },
  });
}
