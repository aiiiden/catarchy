import { Button, Scaffold } from "@/features/common";

import { Link } from "@tanstack/react-router";
import { Header } from "../components/header";
import { Visual } from "../components/visual";

export function GateScreen() {
  return (
    <Scaffold>
      <Scaffold.Body className="justify-center gap-8">
        <Header />
        <Visual />
      </Scaffold.Body>
      <Scaffold.Bottom>
        <Link to="/auth/login">
          <Button size="big">Start</Button>
        </Link>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
