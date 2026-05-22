import { useNavigate } from "@tanstack/react-router";

import { Button, ChevronRight, Text } from "@/features/common";

import styles from "./sign-out-button.module.css";

export function ResetPasswordButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className={styles.button}
      onClick={() => navigate({ to: "/auth/password-reset" })}
    >
      <Text className={styles.buttonText}>Reset Password</Text>
      <ChevronRight />
    </Button>
  );
}
