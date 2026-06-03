import { createFileRoute } from "@tanstack/react-router";

import { PixelEditorScreen } from "@/features/pixel-engine";

export const Route = createFileRoute("/(public)/editor/")({
  component: PixelEditorScreen,
});
