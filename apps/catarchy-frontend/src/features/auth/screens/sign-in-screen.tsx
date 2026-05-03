import {
  Button,
  HeaderBackButton,
  Scaffold,
  useToast,
} from "@/features/common";
import { Link, useRouter, useSearch } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { EmailSignInForm } from "../components/email-sign-in-form";
import {
  emailSignInFormSchema,
  useEmailSignInForm,
} from "../hooks/use-email-sign-in-form";

import { useMutation } from "@tanstack/react-query";
import { signInWithEmailOptions } from "../services/sign-in";
import styles from "./sign-in-screen.module.css";

export function SignInScreen() {
  const router = useRouter();
  const toast = useToast();
  const { email } = useSearch({ from: "/auth/sign-in" });
  const { form } = useEmailSignInForm({ defaultEmail: email });
  const options = signInWithEmailOptions();
  const mutation = useMutation(options);

  const signIn = async (formData: z.infer<typeof emailSignInFormSchema>) => {
    const { data, error } = await mutation.mutateAsync(formData);

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
        <Scaffold.Header title="Sign In" left={<HeaderBackButton />} />
        <Scaffold.Body className={styles.bodyCentered}>
          <div className={styles.bodyContent}>
            <EmailSignInForm />
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
              onClick={form.handleSubmit(signIn)}
            >
              {/* Sign In */}
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </Scaffold.Bottom>
      </Scaffold>
    </FormProvider>
  );
}
