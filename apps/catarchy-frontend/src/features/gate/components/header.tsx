import { LogoText, Text } from "@/features/common";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.root}>
      <LogoText title="Catarchy" width={144} height={24} />
      <h1 className="sr-only">CATARCHY</h1>
      <Text as="p" className={styles.subtitle}>
        ver. alpha
      </Text>
    </header>
  );
}
