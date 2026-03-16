import { eq } from "drizzle-orm";
import { getDatabase, table } from "../../infra/db";

export abstract class NotificationRepository {
  private static get db() {
    return getDatabase();
  }

  static async upsertFcmToken({
    userId,
    token,
  }: { userId: string; token: string }) {
    const [row] = await NotificationRepository.db
      .insert(table.fcmToken)
      .values({ userId, token })
      .onConflictDoUpdate({
        target: table.fcmToken.token,
        set: { userId, updatedAt: new Date().toISOString() },
      })
      .returning();

    return row;
  }

  static async deleteFcmToken({ token }: { token: string }) {
    await NotificationRepository.db
      .delete(table.fcmToken)
      .where(eq(table.fcmToken.token, token));
  }

  static async findTokensByUserId({ userId }: { userId: string }) {
    return NotificationRepository.db
      .select()
      .from(table.fcmToken)
      .where(eq(table.fcmToken.userId, userId));
  }
}
