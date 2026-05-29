import { eq } from "drizzle-orm";

import { getDatabase, table } from "@/infra/db";

export abstract class SessionRepository {
  private static get db() {
    return getDatabase();
  }

  static async createSession({
    userId,
    refreshToken,
    expiredAt,
    absoluteExpiredAt,
  }: {
    userId: string;
    refreshToken: string;
    expiredAt: number;
    absoluteExpiredAt: number;
  }) {
    const [session] = await SessionRepository.db
      .insert(table.session)
      .values({ userId, refreshToken, expiredAt, absoluteExpiredAt })
      .returning();

    return session;
  }

  static async findByRefreshToken(refreshToken: string) {
    const [session] = await SessionRepository.db
      .select()
      .from(table.session)
      .where(eq(table.session.refreshToken, refreshToken))
      .limit(1);

    return session;
  }

  static async deleteByRefreshToken(refreshToken: string) {
    await SessionRepository.db
      .delete(table.session)
      .where(eq(table.session.refreshToken, refreshToken));
  }

  static async deleteByUserId(userId: string) {
    await SessionRepository.db
      .delete(table.session)
      .where(eq(table.session.userId, userId));
  }
}
