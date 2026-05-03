import { api } from "@/features/common";
import { mutationOptions } from "@tanstack/react-query";

export function signOut() {
  return api.auth["sign-out"].post();
}

export function signOutOptions() {
  return mutationOptions({
    mutationFn: signOut,
  });
}
