import { api } from "@/features/common";
import { mutationOptions } from "@tanstack/react-query";

type RegisterFcmTokenPayload = Parameters<
  (typeof api.notification.token)["post"]
>[0];
type RegisterFcmTokenResponse = Awaited<
  ReturnType<(typeof api.notification.token)["post"]>
>["data"];
type RegisterFcmTokenError = Awaited<
  ReturnType<(typeof api.notification.token)["post"]>
>["error"];

export async function registerFcmToken({ token }: { token: string }) {
  const { data, error } = await api.notification.token.post({
    token,
  });

  if (error) {
    throw error;
  }

  return data;
}

export function registerFcmTokenOptions() {
  return mutationOptions<
    RegisterFcmTokenResponse,
    RegisterFcmTokenError,
    RegisterFcmTokenPayload
  >({
    mutationKey: ["notification", "register-fcm-token"],
    mutationFn: registerFcmToken,
  });
}
