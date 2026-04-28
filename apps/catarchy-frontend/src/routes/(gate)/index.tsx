import { api } from "@/features/common";
import { GateScreen } from "@/features/gate";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(gate)/")({
  component: GateScreen,
  async beforeLoad() {
    const { data } = await api.auth.check.get();

    if (data?.ok) {
      throw redirect({
        to: "/play",
      });
    }
  },
});
