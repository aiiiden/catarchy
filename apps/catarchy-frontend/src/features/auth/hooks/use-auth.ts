import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import { signOutOptions } from "../services/sign-out";

export function useAuth() {
  const signOut = useMutation(signOutOptions());
  const context = useRouteContext({ from: "__root__" });

  return {
    signOut: async () => {
      await signOut.mutateAsync();
      context.queryClient.clear();
    },
  };
}
