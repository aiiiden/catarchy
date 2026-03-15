import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useForm } from "react-hook-form";
import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail is required")
    .refine((val) => z.email().safeParse(val).success, "Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function useLoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    mode: "onSubmit",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  return form;
}
