import { createFileRoute } from "@tanstack/react-router";

import { CatStatusScreen } from "@/features/cat";

export const Route = createFileRoute("/_guarded/$catId/cat/status")({
  component: function CatStatusRoute() {
    const { catId } = Route.useParams();
    return <CatStatusScreen catId={catId} />;
  },
});
