import { createFileRoute } from "@tanstack/react-router";

import { PasswordResetScreen } from "@/features/auth";

export const Route = createFileRoute("/auth/password-reset")({
  component: PasswordResetScreen,
});
