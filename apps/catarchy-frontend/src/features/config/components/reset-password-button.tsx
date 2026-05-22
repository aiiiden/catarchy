import { useNavigate } from "@tanstack/react-router";

import { useAnalytics } from "@/features/analytics";
import { Button, ChevronRight, Text } from "@/features/common";

import styles from "./sign-out-button.module.css";

export function ResetPasswordButton() {
  const navigate = useNavigate();
  const analytics = useAnalytics();

  return (
    <Button
      variant="outline"
      className={styles.button}
      onClick={() => {
        analytics.click({ eventName: "reset_password" });
        navigate({ to: "/auth/password-reset" });
      }}
    >
      <Text className={styles.buttonText}>Reset Password</Text>
      <ChevronRight />
    </Button>
  );
}
