import { createFileRoute } from "@tanstack/react-router";

import { ConsensusScreen } from "@/features/congress";

export const Route = createFileRoute("/_guarded/congress/")({
  component: ConsensusScreen,
});
