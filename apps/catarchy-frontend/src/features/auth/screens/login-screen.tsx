import {
  api,
  Button,
  HeaderBackButton,
  Scaffold,
  useToast,
} from "@/features/common";
import { Link, useRouter, useSearch } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { EmailLoginForm } from "../components/email-login-form";
import {
  emailLoginFormSchema,
  useEmailLoginForm,
} from "../hooks/use-email-login-form";
import styles from "./login-screen.module.css";

export function LoginScreen() {
  const router = useRouter();
  const toast = useToast();
  const { email } = useSearch({ from: "/auth/login" });
  const { form } = useEmailLoginForm({ defaultEmail: email });

  const login = async (formData: z.infer<typeof emailLoginFormSchema>) => {
    const { data, error } = await api.auth["sign-in-email"].post({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.push(
        error.value.message ||
          "An unexpected error occurred. Please try again later or contact support.",
      );
      return;
    }

    if (!data) {
      toast.push(
        "An unexpected error occurred. Please try again later or contact support.",
      );
      return;
    }

    const { message } = data;

    toast.push(message);

    await router.navigate({
      to: "/play",
    });
  };

  return (
    <FormProvider {...form}>
      <Scaffold avoidKeyboard>
        <Scaffold.Header title="Login" left={<HeaderBackButton />} />
        <Scaffold.Body className={styles.bodyCentered}>
          <div className={styles.bodyContent}>
            <EmailLoginForm />
          </div>
        </Scaffold.Body>
        <Scaffold.Bottom sticky>
          <div className={styles.actions}>
            <Link to="/auth/register">
              <Button variant="outline" size="big">
                Sign Up
              </Button>
            </Link>
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              size="big"
              onClick={form.handleSubmit(login)}
            >
              Login
            </Button>
          </div>
        </Scaffold.Bottom>
      </Scaffold>
    </FormProvider>
  );
}
