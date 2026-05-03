import { api } from "@/features/common";
import { mutationOptions } from "@tanstack/react-query";

export function sendResetPasswordEmail(
  payload: Parameters<
    (typeof api.auth)["send-reset-password-email"]["post"]
  >[0],
) {
  return api.auth["send-reset-password-email"].post(payload);
}

export function sendResetEmailOptions() {
  return mutationOptions({
    mutationKey: ["auth", "send-reset-password-email"],
    mutationFn: sendResetPasswordEmail,
  });
}

export function verifyResetCodeOptions() {
  return mutationOptions({
    mutationKey: ["auth", "verify-email-code"],
    mutationFn: (
      payload: Parameters<(typeof api.auth)["verify-email-code"]["patch"]>[0],
    ) => api.auth["verify-email-code"].patch(payload),
  });
}

export function resetPasswordOptions() {
  return mutationOptions({
    mutationKey: ["auth", "reset-password"],
    mutationFn: (
      payload: Parameters<(typeof api.auth)["reset-password"]["post"]>[0],
    ) => api.auth["reset-password"].post(payload),
  });
}
