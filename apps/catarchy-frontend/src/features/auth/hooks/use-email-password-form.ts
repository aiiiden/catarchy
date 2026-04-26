import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import z from "zod";

export const emailPasswordSchema = z.object({
  email: z.email("Invalid email address"),
  code: z.string().min(6, "Code must be at least 6 characters"),
  emailVerified: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Email should be verified to proceed",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function useEmailPasswordForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      emailVerified: false,
    },
    resolver: zodResolver(emailPasswordSchema),
  });

  return { form };
}

export const useEmailPasswordFormContext = useFormContext<
  z.infer<typeof emailPasswordSchema>
>;
