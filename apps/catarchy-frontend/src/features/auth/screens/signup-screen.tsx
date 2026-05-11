import { LogClick } from "@/features/analytics";
import {
  Button,
  HeaderBackButton,
  Scaffold,
  Text,
  useAlert,
  useToast,
} from "@/features/common";
import { ServerError } from "@/features/common/lib/error";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { EmailPasswordForm } from "../components/email-password-form";
import { HandleForm } from "../components/handle-form";
import { HandleGuide } from "../components/handle-guide";
import {
  emailPasswordSchema,
  useEmailPasswordForm,
} from "../hooks/use-email-password-form";
import { handleFormSchema, useHandleForm } from "../hooks/use-handle-form";
import {
  sendVerificationEmailOptions,
  verifyEmailCodeOptions,
} from "../services/email-verification";
import { isSignUpConflictError, signUpOptions } from "../services/sign-up";
import styles from "./signup-screen.module.css";

export function SignupScreen() {
  const toast = useToast();
  const alert = useAlert();
  const router = useRouter();

  const { form: emailPasswordForm } = useEmailPasswordForm();

  const sendVerificationEmail = useMutation({
    ...sendVerificationEmailOptions(),
    onError(error) {
      if (error instanceof ServerError) {
        emailPasswordForm.setError("email", { message: error.message });
      }
    },
  });

  const signupWithEmail = useMutation({
    ...signUpOptions(),
    onError(error) {
      if (!(error instanceof ServerError)) return;

      if (error.code === 403) {
        handleForm.setError("handle", { message: error.message });
        return;
      }

      if (isSignUpConflictError(error)) {
        if (error.data?.conflicted === "email") {
          alert.open({
            id: "signup-error",
            title: "Error",
            message:
              "An account with this email already exists. Please use a different email or sign in to your existing account.",
            confirmLabel: "OK",
            onConfirm(close) {
              close();
              router.navigate({ to: "/auth/sign-in" });
            },
          });
          return;
        }
        handleForm.setError("handle", { message: error.message });
        return;
      }

      toast.push(error.message, { id: "signup-error" });
    },
  });

  const verifyEmailMutation = useMutation({
    ...verifyEmailCodeOptions(),
    onError(error) {
      if (error instanceof ServerError) {
        emailPasswordForm.setError("code", {
          message:
            "Invalid verification code. Please check the code and try again.",
        });
      }
    },
  });

  const { form: handleForm } = useHandleForm();

  const [verifyUntil, setVerifyUntil] = useState<Date | null>(null);
  const [emailPasswordSet, setEmailPasswordSet] = useState(false);

  const handleRequestVerificationEmail = async () => {
    const email = emailPasswordForm.getValues("email");

    const validation = emailPasswordSchema.shape.email.safeParse(email);

    if (!validation.success) {
      emailPasswordForm.trigger("email");

      return;
    }

    const data = await sendVerificationEmail.mutateAsync({
      email,
    });

    if (!data) {
      return;
    }

    emailPasswordForm.clearErrors("email");
    setVerifyUntil(new Date(data.expiredAt));

    toast.push(
      "Verification email sent. Please check your inbox and enter the code here.",
      {
        id: "verification-email-sent",
      },
    );
  };

  const handleVerifyEmail = async () => {
    const data = await verifyEmailMutation.mutateAsync({
      email: emailPasswordForm.getValues("email"),
      code: emailPasswordForm.getValues("code"),
    });

    if (!data) {
      return;
    }

    emailPasswordForm.setValue("emailVerified", true);
    emailPasswordForm.clearErrors("code");

    toast.push("Email verified successfully.", {
      id: "email-verified",
    });
  };

  const handleSignUp = async (
    handleFormData: z.infer<typeof handleFormSchema>,
  ) => {
    const data = await signupWithEmail.mutateAsync({
      email: emailPasswordForm.getValues("email"),
      password: emailPasswordForm.getValues("password"),
      handle: handleFormData.handle,
    });

    toast.push(
      data?.message || "Account created successfully. You can now sign in.",
      {
        id: "signup-success",
      },
    );

    router.navigate({
      to: "/auth/sign-in",
      search: (s) => ({ ...s, email: emailPasswordForm.getValues("email") }),
    });
  };

  const handleResend = async () => {
    emailPasswordForm.clearErrors("code");
    await handleRequestVerificationEmail();
  };

  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Header title="Sign Up" left={<HeaderBackButton />} />
      <Scaffold.Body>
        <div className={styles.bodyInner}>
          <FormProvider {...emailPasswordForm}>
            <div
              className={styles.formSection}
              style={{ display: emailPasswordSet ? "none" : undefined }}
            >
              <EmailPasswordForm
                verifyUntil={verifyUntil}
                onVerifyEmailRequested={handleRequestVerificationEmail}
                onVerifyEmail={handleVerifyEmail}
                onResetEmail={() => setVerifyUntil(null)}
                onResendVerificationEmail={handleResend}
              />
            </div>
          </FormProvider>
          <FormProvider {...handleForm}>
            <div
              className={styles.handleSection}
              style={{ display: emailPasswordSet ? undefined : "none" }}
            >
              <HandleGuide />
              <HandleForm />
            </div>
          </FormProvider>
        </div>
        <div>
          <Text as="p" className={styles.terms}>
            <Link to="/toc" className={styles.termsLink}>
              Terms
            </Link>{" "}
            /{" "}
            <Link to="/pp" className={styles.termsLink}>
              Privacy
            </Link>
          </Text>
        </div>
      </Scaffold.Body>
      <Scaffold.Bottom sticky>
        <div className={styles.actions}>
          <LogClick eventName="signup_back">
            <Button
              size="big"
              variant={"outline"}
              onClick={() => router.history.back()}
            >
              Back
            </Button>
          </LogClick>
          <LogClick eventName="signup_next">
            <Button
              size="big"
              style={{ display: emailPasswordSet ? "none" : undefined }}
              disabled={
                !emailPasswordForm.formState.isValid ||
                emailPasswordForm.formState.isSubmitting
              }
              onClick={() => setEmailPasswordSet(true)}
            >
              Next
            </Button>
          </LogClick>
          <LogClick eventName="signup_submit">
            <Button
              size="big"
              style={{ display: emailPasswordSet ? undefined : "none" }}
              disabled={
                !emailPasswordForm.formState.isValid ||
                emailPasswordForm.formState.isSubmitting
              }
              onClick={handleForm.handleSubmit(handleSignUp)}
            >
              Sign Up
            </Button>
          </LogClick>
        </div>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
