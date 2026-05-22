import { createFileRoute } from "@tanstack/react-router";

import { CatSummonScreen } from "@/features/cat";

export const Route = createFileRoute("/_guarded/cat/summon")({
  component: CatSummonScreen,
});
