import { KeyboardProvider } from "@/features/common";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <KeyboardProvider>
      <Outlet />
    </KeyboardProvider>
  );
}
