import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

import { SignInScreen } from "@/features/auth";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInScreen,
  validateSearch: z.object({
    email: z.email().optional(),
  }),
});
