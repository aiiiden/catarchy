import Elysia, { t } from "elysia";

export const notificationModel = new Elysia({
  name: "model.notification",
}).model({
  "notification.register-token.body": t.Object({
    token: t.String({
      description: "FCM registration token",
      examples: ["fxK3..."],
    }),
  }),
  "notification.register-token.response": t.Object({
    id: t.String(),
    userId: t.String(),
    token: t.String(),
    createdAt: t.Nullable(t.String()),
    updatedAt: t.Nullable(t.String()),
  }),
});
