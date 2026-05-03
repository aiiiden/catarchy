import { api } from "@/features/common";

export function signUp(
  payload: Parameters<(typeof api.auth)["sign-up-email"]["post"]>[0],
) {
  return api.auth["sign-up-email"].post(payload);
}

export function signUpOptions() {
  return {
    mutationKey: ["auth", "sign-up"],
    mutationFn: signUp,
  };
}
