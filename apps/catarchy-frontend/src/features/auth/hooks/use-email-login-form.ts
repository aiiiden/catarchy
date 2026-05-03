import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

export const emailLoginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function useEmailLoginForm({
  defaultEmail = "",
}: { defaultEmail?: string } = {}) {
  const form = useForm({
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
    resolver: zodResolver(emailLoginFormSchema),
  });

  return {
    form,
  };
}

export const useEmailLoginFormContext = useFormContext<
  z.infer<typeof emailLoginFormSchema>
>;
