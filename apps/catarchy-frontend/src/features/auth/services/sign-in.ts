import { api } from "@/features/common";

type Payload = Parameters<(typeof api.auth)["sign-in-email"]["post"]>[0];

export function signInWithEmail(payload: Payload) {
  return api.auth["sign-in-email"].post(payload);
}

export function signInWithEmailOptions() {
  return {
    mutationKey: ["auth", "sign-in"],
    mutationFn: signInWithEmail,
  };
}
