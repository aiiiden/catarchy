import { getDatabase, table } from "../../infra/db";

export abstract class CareRecordRepository {
  private static get db() {
    return getDatabase();
  }

  static create(params: {
    catId: string;
    servantId: string;
    growthDelta: number;
    emotionDelta: number;
    message: string;
  }) {
    return this.db.insert(table.careRecord).values({
      ...params,
      caredAt: new Date().toISOString(),
    });
  }
}
