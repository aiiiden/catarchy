import { createFileRoute } from "@tanstack/react-router";

import { PlayScreen } from "@/features/play";

export const Route = createFileRoute("/_guarded/$catId/play/")({
  component: function PlayRoute() {
    const { catId } = Route.useParams();
    return <PlayScreen catId={catId} />;
  },
});
