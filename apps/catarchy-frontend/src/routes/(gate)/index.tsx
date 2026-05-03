import { checkTokenOptions } from "@/features/auth/services/token-state";
import { GateScreen } from "@/features/gate";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(gate)/")({
  component: GateScreen,
  async beforeLoad({ context: { queryClient } }) {
    const { data } = await queryClient.ensureQueryData(checkTokenOptions());

    if (data?.ok) {
      throw redirect({
        to: "/play",
      });
    }
  },
});
