import { sendMultiplePushNotification } from "../../infra/fcm";
import { NotificationRepository } from "./repository";

export abstract class NotificationService {
  static async registerToken({
    userId,
    token,
  }: {
    userId: string;
    token: string;
  }) {
    return NotificationRepository.upsertFcmToken({ userId, token });
  }

  static async unregisterToken({ token }: { token: string }) {
    return NotificationRepository.deleteFcmToken({ token });
  }

  static async broadcastToAll({
    title,
    body,
    url,
  }: {
    title: string;
    body: string;
    url?: string;
  }) {
    const rows = await NotificationRepository.findAllTokens();
    const result = await sendMultiplePushNotification({
      tokens: rows.map((row) => row.token),
      title,
      body,
      url,
    });

    return result;
  }
}
