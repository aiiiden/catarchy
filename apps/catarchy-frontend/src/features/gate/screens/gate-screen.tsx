import {
  Button,
  Scaffold,
  useBottomSheet,
  usePlatform,
} from "@/features/common";

import { Link, useRouter } from "@tanstack/react-router";
import { Header } from "../components/header";
import { PWAGuide } from "../components/pwa-guide";
import { Visual } from "../components/visual";

export function GateScreen() {
  const router = useRouter();
  const { os } = usePlatform();
  const bottomSheet = useBottomSheet();

  const handleStart = () => {
    if (os === "ios" || os === "android") {
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

    router.navigate({ to: "/auth/login" });
  };

  return (
    <Scaffold>
      <Scaffold.Body className="justify-center gap-8">
        <Header />
        <Visual />
      </Scaffold.Body>
      <Scaffold.Bottom>
        <Link to="/auth/login">
          <Button size="big" onClick={handleStart}>
            Start
          </Button>
        </Link>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
