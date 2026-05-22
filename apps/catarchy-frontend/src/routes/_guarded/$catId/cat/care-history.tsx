import { createFileRoute } from "@tanstack/react-router";

import { CareHistoryScreen } from "@/features/cat";

export const Route = createFileRoute("/_guarded/$catId/cat/care-history")({
  component: function CareHistoryRoute() {
    const { catId } = Route.useParams();
    return <CareHistoryScreen catId={catId} />;
  },
});
