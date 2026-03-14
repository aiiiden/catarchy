import { type SignUpParams, useSignUp } from "@/features/auth";
import { Button, Scaffold, TextInput } from "@/features/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().email(),
});

export const Route = createFileRoute("/signup-email")({
  validateSearch: searchSchema.parse,
  component: SignUpEmailPage,
});

function SignUpEmailPage() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const signUp = useSignUp();

  const form = useForm<SignUpParams>({
    mode: "onSubmit",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: { email, handle: "", password: "" },
    resolver: zodResolver(
      z.object({
        email: z.string(),
        handle: z.string().min(1, "Handle is required"),
        password: z.string().min(1, "Password is required"),
      }),
    ),
  });

  const handleSubmit = (params: SignUpParams) => {
    signUp.mutate(params, {
      onSuccess: () => navigate({ to: "/login" }),
    });
  };

  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Header title="Sign Up" />
      <Scaffold.Body className="p-4">
        <Controller
          name="handle"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Handle"
              required
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Password"
              type="password"
              required
              error={fieldState.error?.message}
            />
          )}
        />
        {signUp.error && <p>{String(signUp.error)}</p>}
      </Scaffold.Body>
      <Scaffold.Bottom sticky>
        <Button
          variant="primary"
          fullWidth
          disabled={signUp.isPending}
          onClick={form.handleSubmit(handleSubmit)}
        >
          {signUp.isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
