import { createFileRoute } from "@tanstack/react-router";

import { TermsOfServiceScreen } from "@/features/term";

export const Route = createFileRoute("/(public)/toc")({
  component: TermsOfServiceScreen,
});
