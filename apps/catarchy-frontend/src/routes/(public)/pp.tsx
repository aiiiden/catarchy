import { createFileRoute } from "@tanstack/react-router";

import { PrivacyPolicyScreen } from "@/features/term";

export const Route = createFileRoute("/(public)/pp")({
  component: PrivacyPolicyScreen,
});
