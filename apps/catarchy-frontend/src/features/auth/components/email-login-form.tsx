import { Field, Text, TextInput } from "@/features/common";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useEmailLoginFormContext } from "../hooks/use-email-login-form";

export function EmailLoginForm() {
  const form = useEmailLoginFormContext();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const didEmailFilled = Boolean(form.watch("email"));

  return (
    <form className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-1">
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
        <div className="flex justify-end">
          <Link to="/auth/password-reset">
            <Text className="text-sm">Forgot Password?</Text>
          </Link>
        </div>
      </div>
    </form>
  );
}
