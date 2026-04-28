import {
  Button,
  Scaffold,
  useBottomSheet,
  usePlatform,
} from "@/features/common";

import { useRouter } from "@tanstack/react-router";
import { Header } from "../components/header";
import { PWAGuide } from "../components/pwa-guide";
import { Visual } from "../components/visual";

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
              await router.navigate({ to: "/auth/login" });
            }}
          />
        ),
      });

      return;
    }

    await router.navigate({ to: "/auth/login" });
  };

  return (
    <Scaffold>
      <Scaffold.Body className="justify-center-safe gap-8">
        <Header />
        <Visual />
      </Scaffold.Body>
      <Scaffold.Bottom>
        <Button size="big" onClick={handleStart}>
          Start
        </Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
