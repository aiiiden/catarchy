import { Elysia } from "elysia";
import { z } from "zod";

export const healthRouter = () =>
  new Elysia({ tags: ["Health"] }).get(
    "/health",
    () => ({
      status: "ok" as const,
    }),
    {
      response: {
        200: z.object({
          status: z.literal("ok"),
        }),
      },
      detail: {
        summary: "Health check endpoint",
      },
    },
  );
