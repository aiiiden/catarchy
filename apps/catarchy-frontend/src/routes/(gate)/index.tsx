import { GateScreen } from "@/features/gate";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(gate)/")({
  component: GateScreen,
});
