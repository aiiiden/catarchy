import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { checkSessionOptions } from "@/features/auth";

export const Route = createFileRoute("/_guarded")({
  async beforeLoad({ context: { queryClient } }) {
    try {
      const session = await queryClient.ensureQueryData(checkSessionOptions());
      if (!session?.ok) {
        throw new Error("Session check failed");
      }
    } catch {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Outlet,
});
