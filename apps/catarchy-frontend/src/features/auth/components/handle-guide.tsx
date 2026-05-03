import { cn, Text } from "@/features/common";
import styles from "./handle-guide.module.css";

export function HandleGuide() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Text as="h2" className={cn("font-stroke-white", styles.title)}>
          Please enter your new handle
        </Text>
      </header>
      <div className={styles.body}>
        <ul className={styles.list}>
          <li>
            <Text>4~15 characters</Text>
          </li>
          <li>
            <Text>Only lowercase letters, numbers, and underscores</Text>
          </li>
        </ul>
      </div>
    </article>
  );
}
