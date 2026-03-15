import { TextInput } from "@/features/common";
import { Controller } from "react-hook-form";
import { useLoginForm } from "../hooks/use-login-form";

interface LoginFormProps {
  form: ReturnType<typeof useLoginForm>;
}

export function LoginForm({ form }: LoginFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            label="E-mail"
            required
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        rules={{ required: "Password is required" }}
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            label="Password"
            type="password"
            error={fieldState.error?.message}
            required
          />
        )}
      />
    </div>
  );
}
