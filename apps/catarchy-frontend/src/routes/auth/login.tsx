import { LoginScreen } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/auth/login")({
  component: LoginScreen,
  validateSearch: z.object({
    email: z.email().optional(),
  }),
});
