import { checkSessionOptions } from "@/features/auth/services/session";
import { GateScreen } from "@/features/gate";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(gate)/")({
  component: GateScreen,
  async beforeLoad({ context: { queryClient } }) {
    try {
      const session = await queryClient.ensureQueryData(checkSessionOptions());

      console.log(session);

      if (session?.ok) {
        throw redirect({
          to: "/play",
        });
      }
    } catch (error) {
      // no-op, allow access to gate screen
    }
  },
});
