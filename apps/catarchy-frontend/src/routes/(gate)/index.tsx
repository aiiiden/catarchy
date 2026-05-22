import { createFileRoute, redirect } from "@tanstack/react-router";

import { checkSessionOptions, CheckSessionResponse } from "@/features/auth";
import { GateScreen } from "@/features/gate";

export const Route = createFileRoute("/(gate)/")({
  component: GateScreen,
  async beforeLoad({ context: { queryClient } }) {
    let session: CheckSessionResponse = null;

    try {
      session = await queryClient.ensureQueryData(checkSessionOptions());
    } catch {
      // no-op, allow access to gate screen
    }

    if (session?.ok) {
      throw redirect({
        to: "/play",
      });
    }
  },
});
