import { createFileRoute } from "@tanstack/react-router";

import { PasswordResetScreen } from "@/features/auth";

export const Route = createFileRoute("/(public)/auth/password-reset")({
  component: PasswordResetScreen,
});
