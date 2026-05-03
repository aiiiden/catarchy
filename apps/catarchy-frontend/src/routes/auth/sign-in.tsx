import { SignInScreen } from "@/features/auth";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInScreen,
  validateSearch: z.object({
    email: z.email().optional(),
  }),
});
