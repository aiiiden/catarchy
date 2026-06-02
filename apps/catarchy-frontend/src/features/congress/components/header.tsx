import { cn, Text } from "@/features/common";

import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <Text as="h2" className={cn("font-bold", styles.title)}>
        Catarchy Congress
      </Text>
      <Text as="p" className={styles.description}>
        Here, all cats decide the rules for this world
      </Text>
    </header>
  );
}
