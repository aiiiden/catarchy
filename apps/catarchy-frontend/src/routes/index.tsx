import { Button, ImageLogo, Scaffold, TextLogo } from "@/features/common";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Scaffold>
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
