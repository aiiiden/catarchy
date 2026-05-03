import { Text, useToast } from "@/features/common";
import { Room } from "./room";
import styles from "./interface.module.css";

export function Interface() {
  const toast = useToast();
  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.emojiBtn}>😊</div>
          {/* <div className="px-2 h-9 border-r flex justify-center items-center">
            00:00:00
          </div> */}
        </div>
        <button
          onClick={() => toast.push("Settings coming soon!")}
          className={styles.settingsBtn}
        >
          <Text>🔧</Text>
        </button>
      </div>
      <Room />
    </div>
  );
}
