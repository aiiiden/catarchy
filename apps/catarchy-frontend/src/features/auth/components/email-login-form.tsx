import { Field, Text, TextInput } from "@/features/common";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useEmailLoginFormContext } from "../hooks/use-email-login-form";
import styles from "./email-login-form.module.css";

export function EmailLoginForm() {
  const form = useEmailLoginFormContext();
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
              <button type="button" onClick={() => form.resetField("email")}>
                ⨂
              </button>
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
              <button
                type="button"
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                {passwordVisible ? "🔓" : "🔒"}
              </button>
            }
          />
        </Field>
        <div className={styles.forgotLink}>
          <Link to="/auth/password-reset">
            <Text className={styles.linkText}>Forgot Password?</Text>
          </Link>
        </div>
      </div>
    </form>
  );
}
