import { Button, ButtonProps } from "@/features/common";

import CogIcon from "../assets/cog-icon.svg?react";
import styles from "./config-button.module.css";
export function ConfigButton({
  ...props
}: Omit<ButtonProps, "className" | "children" | "variant" | "size">) {
  return (
    <Button className={styles.button} {...props} variant="ghost" size="small">
      <CogIcon width={16} height={16} />
    </Button>
  );
}
