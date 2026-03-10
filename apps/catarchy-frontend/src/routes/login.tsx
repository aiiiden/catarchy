import { Button, Scaffold, TextInput } from "@/features/common";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Body className="p-4">
        <header>
          <h1 className="text-4xl">Login</h1>
        </header>
        <form className="flex flex-col gap-4">
          <TextInput label="email" required />
          <TextInput label="password" type="password" required />
        </form>
      </Scaffold.Body>
      <Scaffold.Bottom sticky className="bg-white/80">
        <Button variant="primary" size="default" fullWidth>
          Login
        </Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
