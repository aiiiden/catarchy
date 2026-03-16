import {
  type SendVerificationEmailParams,
  type VerifyEmailCodeParams,
  useSendVerificationEmail,
  useVerifyEmailCode,
} from "@/features/auth";
import { Button, Scaffold, TextInput } from "@/features/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/signup-email-verification")({
  component: SignUpEmailVerificationPage,
});

function SignUpEmailVerificationPage() {
  const navigate = useNavigate();
  const sendVerification = useSendVerificationEmail();
  const verifyCode = useVerifyEmailCode();
  const [email, setEmail] = useState<string | null>(null);

  const emailForm = useForm<SendVerificationEmailParams>({
    mode: "onSubmit",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: { email: "" },
    resolver: zodResolver(
      z.object({
        email: z.email("Invalid email address"),
      }),
    ),
  });

  const codeForm = useForm<VerifyEmailCodeParams>({
    mode: "onSubmit",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: { email: "", code: "" },
    resolver: zodResolver(
      z.object({
        email: z.string(),
        code: z.string().min(1, "Verification code is required").max(6),
      }),
    ),
  });

  const handleSendEmail = ({ email }: SendVerificationEmailParams) => {
    sendVerification.mutate(
      { email },
      {
        onSuccess: () => {
          setEmail(email);
          codeForm.setValue("email", email);
        },
        onError(error) {
          emailForm.setError("email", {
            message: error.value.message,
          });
        },
      },
    );
  };

  const handleVerifyCode = (params: VerifyEmailCodeParams) => {
    verifyCode.mutate(params, {
      onSuccess: () =>
        navigate({
          to: "/signup-email",
          search: { email: params.email },
        }),

      onError(error) {
        codeForm.setError("code", {
          message: error.value.message,
        });
      },
    });
  };

  const isPending = sendVerification.isPending || verifyCode.isPending;

  const handleBottomClick = () => {
    if (email) {
      codeForm.handleSubmit(handleVerifyCode)();
    } else {
      emailForm.handleSubmit(handleSendEmail)();
    }
  };

  const buttonLabel = email
    ? verifyCode.isPending
      ? "Verifying..."
      : "Verify"
    : sendVerification.isPending
      ? "Sending..."
      : "Send Verification Code";

  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Header title="Sign Up" />
      <Scaffold.Body className="flex flex-col justify-center gap-4 p-4">
        <Controller
          name="email"
          control={emailForm.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              type="text"
              label="Email"
              disabled={!!email}
              error={fieldState.error?.message}
              autoFocus
            />
          )}
        />

        {email && (
          <>
            <p>Verification code sent to {email}</p>
            <Controller
              name="code"
              control={codeForm.control}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Verification Code"
                  maxLength={6}
                  required
                  error={fieldState.error?.message}
                  autoFocus={!field.value}
                />
              )}
            />
          </>
        )}
      </Scaffold.Body>
      <Scaffold.Bottom sticky>
        <Button
          variant="primary"
          fullWidth
          disabled={isPending}
          onClick={handleBottomClick}
        >
          {buttonLabel}
        </Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
