import { createFileRoute } from "@tanstack/react-router";

import { TestIntroductionScreen } from "@/features/personality";

export const Route = createFileRoute(
  "/_guarded/$catId/cat/personality/introduction",
)({
  component: TestIntroductionScreen,
});
