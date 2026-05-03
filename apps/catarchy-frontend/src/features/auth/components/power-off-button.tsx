import { api, Button, useAlert } from "@/features/common";
import { useRouter } from "@tanstack/react-router";
import styles from "./power-off-button.module.css";
export function PowerOffButton({
  onAfterLogout,
}: {
  onAfterLogout?: () => void;
}) {
  const router = useRouter();
  const alert = useAlert();

  const handleClick = () => {
    alert.open({
      id: "logout-confirmation",
      title: "Log Out",
      message: "Are you sure you want to log out?",
      cancelLabel: "No",
      confirmLabel: "Yes",
      onConfirm: async () => {
        await api.auth["sign-out"].post();
        await router.navigate({
          to: "/",
        });
        alert.close("logout-confirmation");
        onAfterLogout?.();
      },
      onCancel: () => {
        alert.close("logout-confirmation");
      },
    });
  };

  return (
    <Button native className={styles.powerBtn} onClick={handleClick}>
      ⏻
    </Button>
  );
}
