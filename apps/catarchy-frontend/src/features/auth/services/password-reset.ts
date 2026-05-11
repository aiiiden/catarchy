import { api } from "@/features/common";
import { ClientError, ServerError } from "@/features/common/lib/error";
import { mutationOptions } from "@tanstack/react-query";

export type SendResetEmailPayload = Parameters<
  (typeof api.auth)["send-reset-password-email"]["post"]
>[0];
export type SendResetEmailResponse = Awaited<
  ReturnType<(typeof api.auth)["send-reset-password-email"]["post"]>
>["data"];
export type SendResetEmailError = Awaited<
  ReturnType<(typeof api.auth)["send-reset-password-email"]["post"]>
>["error"];

export type SendResetEmailConflictData = Extract<
  NonNullable<SendResetEmailError>,
  { status: 409 }
>["value"] extends { data: infer D }
  ? D
  : never;

export function isSendResetEmailConflictError(
  error: ServerError,
): error is ServerError<SendResetEmailConflictData> {
  return error.code === 409;
}

export type VerifyResetCodePayload = Parameters<
  (typeof api.auth)["verify-email-code"]["patch"]
>[0];
export type VerifyResetCodeResponse = Awaited<
  ReturnType<(typeof api.auth)["verify-email-code"]["patch"]>
>["data"];
export type VerifyResetCodeError = Awaited<
  ReturnType<(typeof api.auth)["verify-email-code"]["patch"]>
>["error"];

export type ResetPasswordPayload = Parameters<
  (typeof api.auth)["reset-password"]["post"]
>[0];
export type ResetPasswordResponse = Awaited<
  ReturnType<(typeof api.auth)["reset-password"]["post"]>
>["data"];
export type ResetPasswordError = Awaited<
  ReturnType<(typeof api.auth)["reset-password"]["post"]>
>["error"];

export async function sendResetPasswordEmail(payload: SendResetEmailPayload) {
  const { data, error } = await api.auth["send-reset-password-email"].post(payload);

  if (error) {
    if (error.value instanceof ClientError) {
      throw error.value;
    }

    const message =
      error.value.message ||
      "Unexpected error occurred. Please try again later or contact support.";

    if (error.status === 409) {
      throw new ServerError<SendResetEmailConflictData>({
        message,
        code: 409,
        data: (error.value as { data?: SendResetEmailConflictData }).data,
      });
    }

    throw new ServerError({ message, code: error.status });
  }

  return data;
}

export async function verifyResetCode(payload: VerifyResetCodePayload) {
  const { data, error } = await api.auth["verify-email-code"].patch(payload);

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

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data, error } = await api.auth["reset-password"].post(payload);

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

export function sendResetEmailOptions() {
  return mutationOptions<
    SendResetEmailResponse,
    ServerError<SendResetEmailConflictData> | ServerError | ClientError,
    SendResetEmailPayload
  >({
    mutationKey: ["auth", "send-reset-password-email"],
    mutationFn: sendResetPasswordEmail,
  });
}

export function verifyResetCodeOptions() {
  return mutationOptions<
    VerifyResetCodeResponse,
    ServerError | ClientError,
    VerifyResetCodePayload
  >({
    mutationKey: ["auth", "verify-email-code"],
    mutationFn: verifyResetCode,
  });
}

export function resetPasswordOptions() {
  return mutationOptions<
    ResetPasswordResponse,
    ServerError | ClientError,
    ResetPasswordPayload
  >({
    mutationKey: ["auth", "reset-password"],
    mutationFn: resetPassword,
  });
}
