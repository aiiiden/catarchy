import {
  Box,
  Button,
  ChevronRight,
  Text,
  usePwaUpdate,
} from "@/features/common";
import styles from "./app-update-section.module.css";

export function AppUpdateSection() {
  const { needsUpdate, update } = usePwaUpdate();

  return (
    <Box containerClassName={styles.box} rounded>
      <Text as="p">App Update</Text>
      <Text as="p" className={styles.description}>
        {needsUpdate
          ? "A new version is available. Update now to get the latest features."
          : "You're on the latest version. No update needed."}
      </Text>
      {needsUpdate && (
        <Button variant="outline" onClick={update} className={styles.button}>
          <Text className={styles.buttonText}>Update Application</Text>
          <ChevronRight />
        </Button>
      )}
    </Box>
  );
}
