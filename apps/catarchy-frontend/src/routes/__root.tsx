import { Layout } from "@/features/common";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
