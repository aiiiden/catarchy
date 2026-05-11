import { api } from "@/features/common";
import { ClientError, ServerError } from "@/features/common/lib/error";
import { mutationOptions } from "@tanstack/react-query";

export type SignInPayload = Parameters<(typeof api.auth)["sign-in-email"]["post"]>[0];
export type SignInResponse = Awaited<
  ReturnType<(typeof api.auth)["sign-in-email"]["post"]>
>["data"];
export type SignInError = Awaited<
  ReturnType<(typeof api.auth)["sign-in-email"]["post"]>
>["error"];

export async function signInWithEmail(payload: SignInPayload) {
  const { data, error } = await api.auth["sign-in-email"].post(payload);

  if (error) {
    if (error.value instanceof ClientError) {
      throw error.value;
    }

    throw new ServerError({
      message:
        error.value.message ||
        "Unexpected error occurred. Please try again later or contact support.",
      code: error.status,
    });
  }

  return data;
}

export function signInWithEmailOptions() {
  return mutationOptions<SignInResponse, ServerError | ClientError, SignInPayload>({
    mutationKey: ["auth", "sign-in"],
    mutationFn: signInWithEmail,
  });
}
