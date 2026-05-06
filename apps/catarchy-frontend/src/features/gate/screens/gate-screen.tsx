import {
  Button,
  Scaffold,
  useBottomSheet,
  usePlatform,
} from "@/features/common";

import { LogClick } from "@/features/analytics";
import { useRouter } from "@tanstack/react-router";
import { Header } from "../components/header";
import { PWAGuide } from "../components/pwa-guide";
import { Visual } from "../components/visual";
import styles from "./gate-screen.module.css";

export function GateScreen() {
  const router = useRouter();
  const { os, isPWA } = usePlatform();
  const bottomSheet = useBottomSheet();

  const handleStart = async () => {
    if (!isPWA && (os === "ios" || os === "android")) {
      bottomSheet.open({
        id: "welcome",
        component: (
          <PWAGuide
            onClose={async () => {
              bottomSheet.close("welcome");
              await router.navigate({ to: "/auth/sign-in" });
            }}
          />
        ),
      });

      return;
    }

    await router.navigate({ to: "/auth/sign-in" });
  };

  return (
    <Scaffold>
      <Scaffold.Body className={styles.body}>
        <Header />
        <Visual />
      </Scaffold.Body>
      <Scaffold.Bottom>
        <LogClick eventName="gate_start">
          <Button size="big" onClick={handleStart}>
            Start
          </Button>
        </LogClick>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
