import { Outlet, createRootRoute } from "@tanstack/react-router";
import {
  AlertRenderer,
  BottomSheetRenderer,
  ModalRenderer,
  ToastRenderer,
} from "../features/common";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <ModalRenderer />
      <AlertRenderer />
      <BottomSheetRenderer />
      <ToastRenderer />
    </>
  );
}
