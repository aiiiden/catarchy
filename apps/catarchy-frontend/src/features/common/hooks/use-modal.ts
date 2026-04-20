import type React from "react";
import type { ModalHeader } from "../components/modal";
import { useOverlayStore } from "../stores/overlay";

type ModalOpenProps = {
  id: string;
  component: React.ReactNode;
  header?: ModalHeader;
};

export function useModal() {
  const open = useOverlayStore((s) => s.open);
  const close = useOverlayStore((s) => s.close);

  return {
    open: ({ id, component, header }: ModalOpenProps) =>
      open({ id, type: "modal", component, header }),
    close,
  };
}
