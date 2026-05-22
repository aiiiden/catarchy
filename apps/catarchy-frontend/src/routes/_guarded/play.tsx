import { createFileRoute, redirect } from "@tanstack/react-router";

import { catListOptions } from "@/features/cat";

export const Route = createFileRoute("/_guarded/play")({
  async beforeLoad({ context: { queryClient } }) {
    const cats = await queryClient.ensureQueryData(catListOptions());
    if (!cats || cats.length === 0) {
      throw redirect({ to: "/cat/summon" });
    }
    throw redirect({ to: "/$catId/play", params: { catId: cats[0].id } });
  },
});
