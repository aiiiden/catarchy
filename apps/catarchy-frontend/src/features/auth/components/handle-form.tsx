import { Field, Text, TextInput } from "@/features/common";

import { useHandleFormContext } from "../hooks/use-handle-form";

export function HandleForm() {
  const form = useHandleFormContext();
  return (
    <form>
      <Field label="Handle" error={form.formState.errors.handle?.message}>
        <TextInput
          maxLength={15}
          {...form.register("handle")}
          leadingSlot={<Text>@</Text>}
          onBeforeInputCapture={(event) => {
            const value = event.currentTarget.value;
            event.currentTarget.value = value.toLowerCase();
          }}
          placeholder="john_meow"
        />
      </Field>
    </form>
  );
}
