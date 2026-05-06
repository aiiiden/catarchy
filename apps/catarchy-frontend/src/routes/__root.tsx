import { PageViewTracker } from "@/features/analytics";
import { UpdateAlert } from "@/features/config";
import { MusicDrawer } from "@/features/music/components/music-drawer";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import {
  AlertRenderer,
  BottomSheetRenderer,
  ModalRenderer,
  ToastRenderer,
} from "../features/common";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <PageViewTracker />
      <Outlet />
      <ModalRenderer />
      <AlertRenderer />
      <BottomSheetRenderer />
      <ToastRenderer />
      <MusicDrawer />
      <UpdateAlert />
    </>
  );
}
