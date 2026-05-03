import { Button, cn } from "@/features/common";
import styles from "./request-notification.module.css";
export function RequestNotificationPermission({
  onAllow,
  onDeny,
}: {
  onAllow?: () => void;
  onDeny?: () => void;
}) {
  return (
    <article className={cn([styles.container, "pb-safe"])}>
      <header className={styles.header}>
        <h2>Enable Notifications</h2>
      </header>

      <div>
        <p>
          To stay updated with the latest news and updates, please enable
          notifications.
        </p>
      </div>

      <div className={styles.footer}>
        <Button variant="outline" onClick={onDeny}>
          No, thanks
        </Button>
        <Button onClick={onAllow}>OK</Button>
      </div>
    </article>
  );
}
