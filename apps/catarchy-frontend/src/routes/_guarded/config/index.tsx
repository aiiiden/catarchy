import { createFileRoute } from "@tanstack/react-router";

import { AppConfigScreen } from "@/features/config";

export const Route = createFileRoute("/_guarded/config/")({
  component: AppConfigScreen,
});
