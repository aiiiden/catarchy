import { LogClick } from "@/features/analytics";
import { Button, Field, Text, TextInput } from "@/features/common";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useEmailSignInFormContext } from "../hooks/use-email-sign-in-form";
import styles from "./email-sign-in-form.module.css";

export function EmailSignInForm() {
  const form = useEmailSignInFormContext();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const didEmailFilled = Boolean(form.watch("email"));

  return (
    <form className={styles.form}>
      <Field label="E-mail" error={form.formState.errors.email?.message}>
        <TextInput
          {...form.register("email")}
          type="email"
          placeholder="meow@example.com"
          trailingSlot={
            didEmailFilled && (
              <LogClick eventName="clear_email">
                <Button
                  native
                  type="button"
                  onClick={() => form.resetField("email")}
                >
                  ⨂
                </Button>
              </LogClick>
            )
          }
        />
      </Field>
      <div className={styles.passwordSection}>
        <Field label="Password" error={form.formState.errors.password?.message}>
          <TextInput
            {...form.register("password")}
            type={passwordVisible ? "text" : "password"}
            placeholder="***********"
            trailingSlot={
              <Button
                native
                type="button"
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                {passwordVisible ? "🔓" : "🔒"}
              </Button>
            }
          />
        </Field>
        <div className={styles.forgotLink}>
          <LogClick eventName="forgot_password">
            <Link to="/auth/password-reset">
              <Text className={styles.linkText}>Forgot Password?</Text>
            </Link>
          </LogClick>
        </div>
      </div>
    </form>
  );
}
