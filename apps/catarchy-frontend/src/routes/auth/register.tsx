import { createFileRoute } from "@tanstack/react-router";

import { SignupScreen } from "@/features/auth";

export const Route = createFileRoute("/auth/register")({
  component: SignupScreen,
});
