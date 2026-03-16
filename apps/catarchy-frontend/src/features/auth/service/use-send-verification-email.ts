import {
  type InferData,
  type InferError,
  type InferInput,
  api,
} from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

type Endpoint = (typeof api.auth)["send-verification-email"]["post"];
export type SendVerificationEmailResponse = InferData<Endpoint>;
export type SendVerificationEmailParams = InferInput<Endpoint>;
export type SendVerificationEmailError = InferError<Endpoint>;

export function useSendVerificationEmail() {
  return useMutation<
    SendVerificationEmailResponse,
    SendVerificationEmailError,
    SendVerificationEmailParams
  >({
    mutationFn: async (params) => {
      const { data, error } =
        await api.auth["send-verification-email"].post(params);
      if (error) throw error;
      return data;
    },
  });
}
