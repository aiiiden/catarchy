import { eq } from "drizzle-orm";
import { getDatabase, table } from "../../infra/db";

export abstract class CatStatRepository {
  private static get db() {
    return getDatabase();
  }

  static create({ catId, growth, emotion }: { catId: string; growth: number; emotion: number }) {
    return this.db.insert(table.catStat).values({ catId, growth, emotion });
  }

  static updateAfterCare({
    catId,
    growth,
    emotion,
  }: {
    catId: string;
    growth: number;
    emotion: number;
  }) {
    return this.db
      .update(table.catStat)
      .set({ growth, emotion })
      .where(eq(table.catStat.catId, catId))
      .returning();
  }
}
