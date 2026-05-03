import { sendPushNotification } from "../../infra/fcm";
import { NotificationRepository } from "./repository";

export abstract class NotificationService {
  static async registerToken({
    userId,
    token,
  }: { userId: string; token: string }) {
    return NotificationRepository.upsertFcmToken({ userId, token });
  }

  static async unregisterToken({ token }: { token: string }) {
    return NotificationRepository.deleteFcmToken({ token });
  }

  static async broadcastToAll({
    title,
    body,
    url,
  }: { title: string; body: string; url?: string }) {
    const rows = await NotificationRepository.findAllTokens();
    const results = await Promise.allSettled(
      rows.map((row) => sendPushNotification({ token: row.token, title, body, url })),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    return { total: rows.length, failed };
  }
}
