import {
  LoginForm,
  SignInParams,
  useLoginForm,
  useSignIn,
} from "@/features/auth";
import { Button, Scaffold, TextLogo } from "@/features/common";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useLoginForm();
  const signIn = useSignIn();
  const handleSubmit = ({ email, password }: SignInParams) => {
    signIn.mutate(
      { email, password },
      { onSuccess: () => Navigate({ to: "/play" }) },
    );
  };
  return (
    <FormProvider {...form}>
      <Scaffold avoidKeyboard>
        <Scaffold.Header title="Login" />
        <Scaffold.Body className="p-4">
          <div className="flex flex-1 flex-col justify-center gap-12">
            <div className="flex justify-center">
              <TextLogo size={144} />
            </div>
            <LoginForm form={form} />
          </div>
        </Scaffold.Body>
        <Scaffold.Bottom sticky>
          <div className="flex flex-col gap-2">
            <Button
              fullWidth
              disabled={signIn.isPending}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {signIn.isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Scaffold.Bottom>
      </Scaffold>
    </FormProvider>
  );
}
