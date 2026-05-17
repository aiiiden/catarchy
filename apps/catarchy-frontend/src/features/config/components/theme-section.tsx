import { Box, RadioInput, Text } from "@/features/common";
import { useThemeStore } from "../stores/theme";
import styles from "./theme-section.module.css";

export function ThemeSection() {
  const { displayMode, setDisplayMode } = useThemeStore();

  return (
    <Box containerClassName={styles.box} rounded>
      <Text as="p">Display Mode</Text>
      <Text as="p" className={styles.description}>
        Choose how the app is displayed on your screen.
      </Text>
      <div className={styles.options}>
        <RadioInput
          name="display-mode"
          label="Default"
          value="default"
          checked={displayMode === "default"}
          onChange={() => setDisplayMode("default")}
        />
        <RadioInput
          name="display-mode"
          label="Inverted"
          value="inverted"
          checked={displayMode === "inverted"}
          onChange={() => setDisplayMode("inverted")}
        />
      </div>
    </Box>
  );
}
