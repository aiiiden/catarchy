import { SignInParams, useSignIn } from "@/features/auth";
import { Button, Scaffold, TextInput } from "@/features/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const form = useForm<SignInParams>({
    mode: "onSubmit",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
      }),
    ),
  });

  const handleSubmit = ({ email, password }: SignInParams) => {
    signIn.mutate(
      { email, password },
      { onSuccess: () => navigate({ to: "/play" }) },
    );
  };

  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Header title="Login" />
      <Scaffold.Body className="p-4">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col justify-center gap-4"
        >
          <Controller
            name="email"
            control={form.control}
            rules={{ required: "E-mail is required" }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="E-mail"
                required
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Password"
                type="password"
                error={fieldState.error?.message}
                required
              />
            )}
          />
        </form>
      </Scaffold.Body>
      <Scaffold.Bottom sticky>
        <div className="flex flex-col gap-2">
          <Link to="/signup" className="block w-full">
            <Button variant="ghost" fullWidth>
              Sign Up
            </Button>
          </Link>
          <Button
            variant="primary"
            size="default"
            fullWidth
            disabled={signIn.isPending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            {signIn.isPending ? "Logging in..." : "Login"}
          </Button>
        </div>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
