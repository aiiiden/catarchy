import { AppConfigScreen } from "@/features/config";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guarded/config/")({
  component: AppConfigScreen,
});
