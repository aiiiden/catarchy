import {
  Button,
  Field,
  Text,
  TextInput,
  useCountDown,
} from "@/features/common";
import { useEmailPasswordFormContext } from "../hooks/use-email-password-form";
import styles from "./email-password-form.module.css";

export function EmailPasswordForm({
  verifyUntil,
  onVerifyEmailRequested,
  onResendVerificationEmail,
  onVerifyEmail,
  onResetEmail,
}: {
  verifyUntil: Date | null;
  onVerifyEmailRequested?: () => void;
  onResendVerificationEmail?: () => void;
  onVerifyEmail: () => void;
  onResetEmail: () => void;
}) {
  const form = useEmailPasswordFormContext();

  const emailVerified = form.watch("emailVerified");
  const remainSeconds = useCountDown({
    target: verifyUntil ?? new Date(),
    pauseWhen: emailVerified,
  });

  const mm = Math.floor(remainSeconds / 60);
  const ss = remainSeconds % 60;
  const formattedRemainSeconds = `${mm.toString().padStart(2, "0")}:${ss
    .toString()
    .padStart(2, "0")}`;

  return (
    <form className={styles.form}>
      <Field label="E-mail" error={form.formState.errors.email?.message}>
        <div className={styles.inputRow}>
          <div className={styles.inputFlex}>
            <TextInput
              readOnly={verifyUntil !== null}
              {...form.register("email")}
              trailingSlot={
                verifyUntil !== null && (
                  <Button native
                    type="button"
                    onClick={() => {
                      form.reset();
                      onResetEmail();
                    }}
                  >
                    ⨂
                  </Button>
                )
              }
            />
          </div>

          {!verifyUntil && (
            <Button type="button" onClick={onVerifyEmailRequested}>
              Send Code
            </Button>
          )}
        </div>
      </Field>

      {verifyUntil && (
        <Field label="Code" error={form.formState.errors.code?.message}>
          <div className={styles.inputRow}>
            <div className={styles.inputFlex}>
              <TextInput
                type={emailVerified ? "password" : "text"}
                readOnly={emailVerified}
                {...form.register("code")}
                inputMode="numeric"
                autoComplete="one-time-code"
                trailingSlot={
                  remainSeconds > 0 && !emailVerified ? (
                    <Text>{formattedRemainSeconds}</Text>
                  ) : emailVerified ? (
                    <Text>Verified</Text>
                  ) : null
                }
              />
            </div>
            {!emailVerified && remainSeconds === 0 && (
              <Button
                type="button"
                variant={"outline"}
                onClick={onResendVerificationEmail}
              >
                Resend
              </Button>
            )}
            {!emailVerified && remainSeconds > 0 && (
              <Button type="button" onClick={onVerifyEmail}>
                Verify
              </Button>
            )}
          </div>
        </Field>
      )}

      {emailVerified && (
        <Field label="Password" error={form.formState.errors.password?.message}>
          <TextInput type="password" {...form.register("password")} />
        </Field>
      )}
    </form>
  );
}
