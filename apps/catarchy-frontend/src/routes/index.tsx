import { Button, ImageLogo, TextLogo } from "@/features/common";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const handleGetStarted = () => {
    alert("coming soon!"); // TODO: implement actual functionality
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <ImageLogo size={128} hidePadding />
        <TextLogo size={144} />
        <p>Ver. alpha</p>
      </div>
      <div className="p-4">
        <Button variant={"primary"} fullWidth onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
    </main>
  );
}
