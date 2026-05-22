import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext,Outlet } from "@tanstack/react-router";

import { PageViewTracker } from "@/features/analytics";
import { UpdateAlert } from "@/features/config";
import { MusicDrawer } from "@/features/music";

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
