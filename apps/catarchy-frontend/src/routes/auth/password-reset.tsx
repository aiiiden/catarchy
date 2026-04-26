import { PasswordResetScreen } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/password-reset")({
  component: PasswordResetScreen,
});
