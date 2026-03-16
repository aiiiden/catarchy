import { isAuthenticated } from "@/features/auth";
import { Button, ImageLogo, Scaffold, TextLogo } from "@/features/common";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => {
    const authenticated = isAuthenticated();
    if (authenticated) {
      throw redirect({
        to: "/play",
      });
    }
  },
});

function Index() {
  return (
    <Scaffold avoidKeyboard={false}>
      <Scaffold.Body className="items-center justify-center p-4">
        <ImageLogo size={128} hidePadding />
        <TextLogo size={144} />
        <p>Ver. alpha</p>
      </Scaffold.Body>
      <Scaffold.Bottom>
        <Link to="/login">
          <Button variant="primary" size="default" fullWidth>
            Get Started
          </Button>
        </Link>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
