import { useSignIn } from "@/features/auth";
import { Button, Scaffold, TextInput } from "@/features/common";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn.mutate(
      { email, password },
      { onSuccess: () => navigate({ to: "/play" }) },
    );
  };

  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Body className="p-4">
        <header>
          <h1>Login</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {signIn.error && <p>{String(signIn.error)}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Scaffold.Body>
      <Scaffold.Bottom sticky>
        <Button
          variant="primary"
          size="default"
          fullWidth
          onClick={() =>
            handleSubmit({
              preventDefault: () => {},
            } as React.FormEvent<HTMLFormElement>)
          }
          disabled={signIn.isPending}
        >
          {signIn.isPending ? "Logging in..." : "Login"}
        </Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
