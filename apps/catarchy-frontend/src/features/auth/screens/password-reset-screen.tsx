import { LogClick } from "@/features/analytics";
import {
  Button,
  HeaderBackButton,
  Scaffold,
  useToast,
} from "@/features/common";
import { ServerError } from "@/features/common/lib/error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { EmailPasswordForm } from "../components/email-password-form";
import {
  emailPasswordSchema,
  useEmailPasswordForm,
} from "../hooks/use-email-password-form";
import {
  isSendResetEmailConflictError,
  resetPasswordOptions,
  sendResetEmailOptions,
  verifyResetCodeOptions,
} from "../services/password-reset";
import styles from "./password-reset-screen.module.css";

export function PasswordResetScreen() {
  const router = useRouter();
  const toast = useToast();

  const [verifyUntil, setVerifyUntil] = useState<Date | null>(null);
  const { form: emailPasswordForm } = useEmailPasswordForm();

  const sendResetEmail = useMutation({
    ...sendResetEmailOptions(),
    onError(error) {
      if (!(error instanceof ServerError)) return;

      if (isSendResetEmailConflictError(error)) {
        if (error.data?.waitUntil) setVerifyUntil(new Date(error.data.waitUntil));
        toast.push(
          "A verification email has already been sent. Please check your inbox and enter the code here.",
          { id: "verification-email-already-sent" },
        );
        emailPasswordForm.clearErrors("email");
        return;
      }

      emailPasswordForm.setError("email", { message: error.message });
    },
  });

  const verifyResetCode = useMutation({
    ...verifyResetCodeOptions(),
    onError(error) {
      if (error instanceof ServerError) {
        emailPasswordForm.setError("code", { message: error.message });
      }
    },
  });

  const resetPassword = useMutation({
    ...resetPasswordOptions(),
    onError(error) {
      if (error instanceof ServerError) {
        toast.push(error.message, { id: "password-reset-error" });
      }
    },
  });

  const handleRequestVerificationEmail = async () => {
    const email = emailPasswordForm.getValues("email");

    const validation = emailPasswordSchema.shape.email.safeParse(email);

    if (!validation.success) {
      emailPasswordForm.trigger("email");
      return;
    }

    const sendData = await sendResetEmail.mutateAsync({
      email: emailPasswordForm.getValues("email"),
    });

    if (!sendData) return;

    emailPasswordForm.clearErrors("email");
    setVerifyUntil(new Date(sendData.expiredAt));

    toast.push(
      "Verification email sent. Please check your inbox and enter the code here.",
      { id: "verification-email-sent" },
    );
  };

  const handleVerifyEmail = async () => {
    const verifyData = await verifyResetCode.mutateAsync({
      email: emailPasswordForm.getValues("email"),
      code: emailPasswordForm.getValues("code"),
    });

    if (!verifyData) return;

    emailPasswordForm.setValue("emailVerified", true);
    emailPasswordForm.clearErrors("code");

    toast.push("Email verified successfully.", { id: "email-verified" });
  };

  const handleResetEmail = () => {
    emailPasswordForm.clearErrors();
    emailPasswordForm.reset();
    setVerifyUntil(null);
  };

  const handleResendVerificationEmail = async () => {
    emailPasswordForm.clearErrors("code");
    await handleRequestVerificationEmail();
  };

  const handleResetPassword = async (
    formData: z.infer<typeof emailPasswordSchema>,
  ) => {
    await resetPassword.mutateAsync({
      email: formData.email,
      password: formData.password,
    });

    toast.push(
      "Password reset successfully. You can now sign in with your new password.",
      { id: "password-reset-success" },
    );

    emailPasswordForm.clearErrors();
    emailPasswordForm.reset();
    setVerifyUntil(null);

    await router.navigate({
      to: "/auth/sign-in",
      search: (old) => ({ ...old, email: formData.email }),
    });
  };

  return (
    <FormProvider {...emailPasswordForm}>
      <Scaffold avoidKeyboard>
        <Scaffold.Header title="Password Reset" left={<HeaderBackButton />} />
        <Scaffold.Body className={styles.bodyCentered}>
          <div className={styles.bodyContent}>
            <EmailPasswordForm
              verifyUntil={verifyUntil}
              onVerifyEmail={handleVerifyEmail}
              onResetEmail={handleResetEmail}
              onResendVerificationEmail={handleResendVerificationEmail}
              onVerifyEmailRequested={handleRequestVerificationEmail}
            />
          </div>
        </Scaffold.Body>
        <Scaffold.Bottom sticky>
          <LogClick eventName="reset_password">
            <Button
              disabled={
                !emailPasswordForm.formState.isValid || resetPassword.isPending
              }
              onClick={emailPasswordForm.handleSubmit(handleResetPassword)}
            >
              {resetPassword.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </LogClick>
        </Scaffold.Bottom>
      </Scaffold>
    </FormProvider>
  );
}
