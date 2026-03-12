import Elysia, { t } from "elysia";
import { ENVIRONMENT, getEnv } from "../../lib/env";
import {
  CONSENSUS_DEFINITIONS,
  type ConsensusKey,
} from "../consensus/definitions";
import { ConsensusRepository } from "../consensus/repository";

export const sandboxRouter = () => {
  return new Elysia({
    prefix: "/sandbox",
    tags: ["Sandbox"],
  })
    .onBeforeHandle(() => {
      if (getEnv().ENVIRONMENT === ENVIRONMENT.PRODUCTION) {
        return new Response("Not found", { status: 404 });
      }
    })
    .get("/config", async () => {
      const keys = Object.keys(CONSENSUS_DEFINITIONS) as ConsensusKey[];
      const entries = await Promise.all(
        keys.map(async (key) => ({
          key,
          value: await ConsensusRepository.getValue(key),
        })),
      );
      return Object.fromEntries(entries.map(({ key, value }) => [key, value]));
    })
    .patch(
      "/config",
      async ({ body }) => {
        await Promise.all(
          Object.entries(body).map(([key, value]) =>
            ConsensusRepository.setValue(key as ConsensusKey, value as never),
          ),
        );
        return { ok: true };
      },
      {
        body: t.Partial(
          t.Object(
            Object.fromEntries(
              Object.keys(CONSENSUS_DEFINITIONS).map((key) => [
                key,
                t.Number(),
              ]),
            ),
          ),
        ),
      },
    );
};
