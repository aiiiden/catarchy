import { api } from "@/features/common";
import { ClientError, ServerError } from "@/features/common/lib/error";
import { mutationOptions } from "@tanstack/react-query";

export type SignUpPayload = Parameters<(typeof api.auth)["sign-up-email"]["post"]>[0];
export type SignUpResponse = Awaited<
  ReturnType<(typeof api.auth)["sign-up-email"]["post"]>
>["data"];
export type SignUpError = Awaited<
  ReturnType<(typeof api.auth)["sign-up-email"]["post"]>
>["error"];

export type SignUpConflictData = Extract<
  NonNullable<SignUpError>,
  { status: 409 }
>["value"] extends { data: infer D }
  ? D
  : never;

export function isSignUpConflictError(
  error: ServerError,
): error is ServerError<SignUpConflictData> {
  return error.code === 409;
}

export async function signUp(payload: SignUpPayload) {
  const { data, error } = await api.auth["sign-up-email"].post(payload);

  if (error) {
    if (error.value instanceof ClientError) {
      throw error.value;
    }

    const message =
      error.value.message ||
      "Unexpected error occurred. Please try again later or contact support.";

    if (error.status === 409) {
      throw new ServerError<SignUpConflictData>({
        message,
        code: 409,
        data: (error.value as { data?: SignUpConflictData }).data,
      });
    }

    throw new ServerError({ message, code: error.status });
  }

  return data;
}

export function signUpOptions() {
  return mutationOptions<
    SignUpResponse,
    ServerError<SignUpConflictData> | ServerError | ClientError,
    SignUpPayload
  >({
    mutationKey: ["auth", "sign-up"],
    mutationFn: signUp,
  });
}
