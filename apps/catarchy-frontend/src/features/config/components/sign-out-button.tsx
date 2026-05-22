import { useRouter } from "@tanstack/react-router";

import { useAnalytics } from "@/features/analytics";
import { useAuth } from "@/features/auth";
import { Button, ChevronRight, Text, useAlert } from "@/features/common";

import styles from "./sign-out-button.module.css";

export function SignoutButton() {
  const router = useRouter();
  const alert = useAlert();
  const auth = useAuth();
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.click({ eventName: "sign_out" });
    alert.open({
      id: "sign-out-confirmation",
      title: "Sign Out",
      message: "Are you sure you want to sign out?",
      cancelLabel: "No",
      confirmLabel: "Yes",
      onConfirm: async () => {
        analytics.click({ eventName: "sign_out_confirm" });
        await auth.signOut();
        alert.close("sign-out-confirmation");
        await router.navigate({
          to: "/",
        });
      },
      onCancel: () => {
        analytics.click({ eventName: "sign_out_cancel" });
        alert.close("sign-out-confirmation");
      },
    });
  };

  return (
    <Button variant="outline" onClick={handleClick} className={styles.button}>
      <Text className={styles.buttonText}>Sign out</Text>
      <ChevronRight />
    </Button>
  );
}
