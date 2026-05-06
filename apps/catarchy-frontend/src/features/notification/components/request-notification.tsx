import { LogClick } from "@/features/analytics";
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
    <article className={cn([styles.container])}>
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
        <LogClick eventName="notification_deny">
          <Button variant="outline" onClick={onDeny}>
            No, thanks
          </Button>
        </LogClick>
        <LogClick eventName="notification_allow">
          <Button onClick={onAllow}>OK</Button>
        </LogClick>
      </div>
    </article>
  );
}
