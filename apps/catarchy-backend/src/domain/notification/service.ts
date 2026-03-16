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
}
