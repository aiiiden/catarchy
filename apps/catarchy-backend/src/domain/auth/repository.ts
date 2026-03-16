import { and, eq } from "drizzle-orm";
import {
  type Database,
  type Transaction,
  getDatabase,
  table,
} from "../../infra/db";

type Client = Database | Transaction;

export abstract class AuthRepository {
  private static get db() {
    return getDatabase();
  }

  static async createEmailAuth(
    {
      email,
      passwordHashed,
      userId,
    }: {
      email: string;
      passwordHashed: string;
      userId: string;
    },
    tx?: Client,
  ) {
    const client = tx ?? AuthRepository.db;
    const [auth] = await client
      .insert(table.auth)
      .values({
        provider: "email_password",
        email,
        password: passwordHashed,
        userId,
      })
      .returning();

    return auth;
  }

  static async findAuthByEmail({ email }: { email: string }) {
    const [auth] = await AuthRepository.db
      .select()
      .from(table.auth)
      .where(and(eq(table.auth.email, email)))
      .limit(1);

    return auth;
  }

  static async findAuthByUserId({ userId }: { userId: string }) {
    const [auth] = await AuthRepository.db
      .select()
      .from(table.auth)
      .where(and(eq(table.auth.userId, userId)))
      .limit(1);

    return auth;
  }
}
