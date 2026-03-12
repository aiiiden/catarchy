import { Elysia } from "elysia";
import { z } from "zod";
import { NotFoundError } from "../../lib/error";

export const healthRouter = () =>
  new Elysia({ tags: ["Health"] }).get(
    "/health",
    () => {
      throw new NotFoundError("Test error for logging");
      return {
        status: "ok" as const,
      };
    },
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
