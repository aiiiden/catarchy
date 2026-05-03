import { cn, Text, usePwaUpdate, useToast } from "@/features/common";
import { useEffect } from "react";
import styles from "./update-alert.module.css";

export function UpdateAlert() {
  const toast = useToast();
  const { needsUpdate, update } = usePwaUpdate();

  useEffect(() => {
    if (!needsUpdate) return;
    toast.push(
      <UpdateAlertContent
        onUpdate={async () => {
          toast.dismiss("update-available");
          await update();
        }}
        onLater={() => toast.dismiss("update-available")}
      />,
      {
        id: "update-available",
        duration: Infinity,
        hasCloseButton: false,
      },
    );
  }, [toast, needsUpdate, update]);

  return <></>;
}

function UpdateAlertContent({
  onUpdate,
  onLater,
}: {
  onUpdate?: () => void;
  onLater?: () => void;
}) {
  return (
    <div className={styles.root}>
      <Text>Update available! Please refresh the page.</Text>
      <div className={styles.actions}>
        <button className={cn(styles.btn, styles.btnLater)} onClick={onLater}>
          <Text boxTrim>Later</Text>
        </button>
        <button className={cn(styles.btn, styles.btnUpdate)} onClick={onUpdate}>
          <Text boxTrim>Update</Text>
        </button>
      </div>
    </div>
  );
}
