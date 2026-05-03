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
  "notification.sandbox-broadcast.body": t.Object({
    title: t.String(),
    body: t.String(),
    url: t.Optional(t.String({ description: "URL to open when notification is clicked" })),
  }),
  "notification.sandbox-broadcast.response": t.Object({
    total: t.Number(),
    failed: t.Number(),
  }),
});
