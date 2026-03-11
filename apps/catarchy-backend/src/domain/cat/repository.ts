import { eq } from "drizzle-orm";
import { getDatabase, table } from "../../infra/db";

export abstract class CatRepository {
  private static get db() {
    return getDatabase();
  }

  static async findByServantId({ servantId }: { servantId: string }) {
    const [cat] = await this.db
      .select()
      .from(table.cat)
      .where(eq(table.cat.servantId, servantId))
      .limit(1);

    return cat;
  }

  static async findWithStatByServantId({ servantId }: { servantId: string }) {
    const [result] = await this.db
      .select({ cat: table.cat, stat: table.catStat })
      .from(table.cat)
      .innerJoin(table.catStat, eq(table.cat.id, table.catStat.catId))
      .where(eq(table.cat.servantId, servantId))
      .limit(1);

    return result;
  }

  static create({ id, servantId, name }: { id: string; servantId: string; name: string }) {
    return this.db
      .insert(table.cat)
      .values({ id, servantId, name })
      .returning();
  }

  static updateLastCaredAt({ catId }: { catId: string }) {
    return this.db
      .update(table.cat)
      .set({ lastCaredAt: new Date().toISOString() })
      .where(eq(table.cat.id, catId));
  }

  static async findFullByServantId({ servantId }: { servantId: string }) {
    const [result] = await this.db
      .select({
        cat: table.cat,
        stat: table.catStat,
        personality: table.catPersonality,
      })
      .from(table.cat)
      .innerJoin(table.catStat, eq(table.cat.id, table.catStat.catId))
      .leftJoin(
        table.catPersonality,
        eq(table.cat.id, table.catPersonality.catId),
      )
      .where(eq(table.cat.servantId, servantId))
      .limit(1);

    return result;
  }
}
