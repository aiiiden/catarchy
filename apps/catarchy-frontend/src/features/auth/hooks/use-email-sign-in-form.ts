import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

export const emailSignInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function useEmailSignInForm({
  defaultEmail = "",
}: { defaultEmail?: string } = {}) {
  const form = useForm({
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
    resolver: zodResolver(emailSignInFormSchema),
  });

  return {
    form,
  };
}

export const useEmailSignInFormContext = useFormContext<
  z.infer<typeof emailSignInFormSchema>
>;
