import { Button, Scaffold, useAlert } from "@/features/common";

import { Header } from "../components/header";
import { Visual } from "../components/visual";

export function GateScreen() {
  const alert = useAlert();
  return (
    <Scaffold>
      <Scaffold.Body className="justify-center gap-0">
        <Header />
        <Visual />
      </Scaffold.Body>
      <Scaffold.Bottom>
        <Button
          size="big"
          onClick={() =>
            alert.open({
              id: "coming-soon",
              title: "Coming Soon",
              message: "Will be available soon",
              confirmLabel: "OK",
              onConfirm(close) {
                close();
              },
            })
          }
        >
          Start
        </Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
