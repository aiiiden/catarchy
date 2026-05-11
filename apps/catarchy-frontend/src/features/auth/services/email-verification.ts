import { api } from "@/features/common";
import { ClientError, ServerError } from "@/features/common/lib/error";
import { mutationOptions } from "@tanstack/react-query";

export type SendVerificationEmailPayload = Parameters<
  (typeof api.auth)["send-verification-email"]["post"]
>[0];
export type SendVerificationEmailResponse = Awaited<
  ReturnType<(typeof api.auth)["send-verification-email"]["post"]>
>["data"];
export type SendVerificationEmailError = Awaited<
  ReturnType<(typeof api.auth)["send-verification-email"]["post"]>
>["error"];

export type SendVerificationEmailConflictData = Extract<
  NonNullable<SendVerificationEmailError>,
  { status: 409 }
>["value"] extends { data: infer D }
  ? D
  : never;

export function isSendVerificationEmailConflictError(
  error: ServerError,
): error is ServerError<SendVerificationEmailConflictData> {
  return error.code === 409;
}

export async function sendVerificationEmail({ email }: { email: string }) {
  const { data, error } = await api.auth["send-verification-email"].post({
    email,
  });

  if (error) {
    if (error.value instanceof ClientError) {
      throw error.value;
    }

    const message =
      error.value.message ||
      "Unexpected error occurred. Please try again later or contact support.";

    if (error.status === 409) {
      throw new ServerError<SendVerificationEmailConflictData>({
        message,
        code: 409,
        data: (error.value as { data?: SendVerificationEmailConflictData }).data,
      });
    }

    throw new ServerError({ message, code: error.status });
  }

  return data;
}

export function sendVerificationEmailOptions() {
  return mutationOptions<
    SendVerificationEmailResponse,
    ServerError<SendVerificationEmailConflictData> | ServerError | ClientError,
    SendVerificationEmailPayload
  >({
    mutationKey: ["auth", "send-verification-email"],
    mutationFn: sendVerificationEmail,
  });
}

export type VerifyEmailCodePayload = Parameters<
  (typeof api.auth)["verify-email-code"]["patch"]
>[0];
export type VerifyEmailCodeResponse = Awaited<
  ReturnType<(typeof api.auth)["verify-email-code"]["patch"]>
>["data"];
export type VerifyEmailCodeError = Awaited<
  ReturnType<(typeof api.auth)["verify-email-code"]["patch"]>
>["error"];

export async function verifyEmailCode({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const { data, error } = await api.auth["verify-email-code"].patch({
    email,
    code,
  });

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

export function verifyEmailCodeOptions() {
  return mutationOptions<
    VerifyEmailCodeResponse,
    ServerError | ClientError,
    VerifyEmailCodePayload
  >({
    mutationKey: ["auth", "verify-email-code"],
    mutationFn: verifyEmailCode,
  });
}
