import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import z from "zod";

export const handleFormSchema = z.object({
  handle: z
    .string()
    .min(4, "Handle must be at least 4 characters")
    .max(15, "Handle must be at most 15 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Handle can only contain letters, numbers, and underscores",
    ),
});

export function useHandleForm() {
  const form = useForm({
    defaultValues: {
      handle: "",
    },
    resolver: zodResolver(handleFormSchema),
  });

  return { form };
}

export const useHandleFormContext = useFormContext<
  z.infer<typeof handleFormSchema>
>;
