import { createFileRoute } from "@tanstack/react-router";

import { PersonalityTestScreen } from "@/features/personality";

export const Route = createFileRoute("/_guarded/$catId/cat/personality/")({
  component: function PersonalityRoute() {
    const { catId } = Route.useParams();
    return <PersonalityTestScreen catId={catId} />;
  },
});
