import { Field, Text, TextInput } from "@/features/common";
import { useHandleFormContext } from "../hooks/use-handle-form";

export function HandleForm() {
  const form = useHandleFormContext();
  return (
    <form>
      <Field label="Handle" error={form.formState.errors.handle?.message}>
        <TextInput
          {...form.register("handle")}
          leadingSlot={<Text>@</Text>}
          placeholder="john_meow"
        />
      </Field>
    </form>
  );
}
