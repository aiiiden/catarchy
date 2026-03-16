import { jwt } from "@elysiajs/jwt";
import Elysia, { status, t } from "elysia";
import { getEnv } from "../../lib/env";

export const authGuard = () =>
  new Elysia({ name: "auth.guard" })
    .use(jwt({ name: "accessJwt", secret: getEnv().JWT_SECRET }))
    .derive({ as: "scoped" }, async ({ accessJwt, headers }) => {
      const authorization = headers.authorization;
      const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

      if (!token) {
        return status(401, { message: "Unauthorized" });
      }

      const payload = await accessJwt.verify(token);

      if (!payload || !payload.sub) {
        return status(401, { message: "Unauthorized" });
      }

      return {
        user: {
          id: payload.sub as string,
          handle: payload.handle as string,
        },
      };
    })
    .model({
      "auth.guard.unauthorized": t.Object({
        message: t.String({
          examples: ["Unauthorized"],
        }),
      }),
    });
