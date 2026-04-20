import React from "react";
import { cn } from "../lib/cn";
import { useOverlayStore } from "../stores/overlay";
import { Button } from "./button";
import { Modal } from "./modal";
import { ModalCloseButton } from "./modal-close-button";
import { Text } from "./text";

type AlertModalProps = {
  id: string;
  title: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
};

export function AlertModal({
  id,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  cancelLabel = "Cancel",
  onCancel,
}: AlertModalProps) {
  const { close } = useOverlayStore();
  const isMessageString = typeof message === "string";
  const hasCancel = Boolean(onCancel);

  const handleCancel = () => {
    if (!onCancel) {
      close(id);
      return;
    }
    onCancel();
  };

  return (
    <Modal
      onClose={handleCancel}
      header={{
        title,
        right: <ModalCloseButton onClick={handleCancel} />,
      }}
    >
      <div className="p-4 min-h-20 flex items-center justify-center">
        {isMessageString ? <Text>{message}</Text> : message}
      </div>
      <div
        className={cn([
          "grid gap-2 p-2",
          hasCancel ? "grid-cols-2" : "grid-cols-1",
        ])}
      >
        {hasCancel && (
          <Button variant={"outline"} type="button" onClick={handleCancel}>
            {cancelLabel}
          </Button>
        )}
        <Button type="button" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
