import { relations, sql } from "drizzle-orm";
import { check, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

// ── User ──────────────────────────────────────────────────────────────────────

export const userTable = sqliteTable("user", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  handle: text("handle").unique().notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

/** user : auth = 1 : N (auth credentials per provider) */
export const authTable = sqliteTable("auth", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  provider: text("provider", { enum: ["email_password"] }).notNull(),
  email: text("email").unique(),
  password: text("password"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const emailVerificationTable = sqliteTable("email_verification", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiredAt: integer("expired_at").notNull(),
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

/** user : session = 1 : N */
export const sessionTable = sqliteTable("session", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  refreshToken: text("refresh_token").notNull().unique(),
  expiredAt: integer("expired_at").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ── Cat ───────────────────────────────────────────────────────────────────────

/** user : cat = 1 : N */
export const cat = sqliteTable(
  "cat",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    name: text("name").notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    growth: integer("growth").notNull().default(0),    // non-negative
    emotion: integer("emotion").notNull().default(100), // 0~100
    lastRaisedAt: text("last_raised_at").default(sql`(CURRENT_TIMESTAMP)`),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (t) => [
    check("growth_positive", sql`${t.growth} >= 0`),
    check("emotion_range", sql`${t.emotion} >= 0 AND ${t.emotion} <= 100`),
  ],
);

/** cat : raiseRecord = 1 : N, user(servant) : raiseRecord = 1 : N */
export const raiseRecord = sqliteTable("cat_raise_record", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  catId: text("cat_id")
    .notNull()
    .references(() => cat.id, { onDelete: "cascade" }),
  servantId: text("servant_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  growthDelta: integer("growth_delta").notNull(),
  emotionDelta: integer("emotion_delta").notNull(),
  message: text("message").notNull(),
  raisedAt: text("raised_at").default(sql`(CURRENT_TIMESTAMP)`),
});

/** cat : catPersonality = 1 : 0~1 (BIG 5, catId as PK) */
export const catPersonality = sqliteTable(
  "cat_personality",
  {
    catId: text("cat_id")
      .primaryKey()
      .references(() => cat.id, { onDelete: "cascade" }),
    openness: integer("openness").notNull(),
    conscientiousness: integer("conscientiousness").notNull(),
    extraversion: integer("extraversion").notNull(),
    agreeableness: integer("agreeableness").notNull(),
    neuroticism: integer("neuroticism").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (t) => [
    check("openness_range", sql`${t.openness} >= 0 AND ${t.openness} <= 100`),
    check("conscientiousness_range", sql`${t.conscientiousness} >= 0 AND ${t.conscientiousness} <= 100`),
    check("extraversion_range", sql`${t.extraversion} >= 0 AND ${t.extraversion} <= 100`),
    check("agreeableness_range", sql`${t.agreeableness} >= 0 AND ${t.agreeableness} <= 100`),
    check("neuroticism_range", sql`${t.neuroticism} >= 0 AND ${t.neuroticism} <= 100`),
  ],
);

/** cat : personalityTest = 1 : N (personality test answer records) */
export const personalityTest = sqliteTable("personality_test", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  catId: text("cat_id")
    .notNull()
    .references(() => cat.id, { onDelete: "cascade" }),
  answers: text("answers").notNull(), // JSON stringified answers
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export enum CatRelationshipType {
  FRIEND = "FRIEND",
  UNFRIENDED = "UNFRIENDED",
  COUPLE = "COUPLE",
  BREAKUP = "BREAKUP",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
}

/**
 * cat : catRelationship = 1 : N (bidirectional)
 * - catId1 < catId2 enforced to prevent duplicate pairs
 * - (catId1, catId2) unique
 */
export const catRelationship = sqliteTable(
  "cat_relationship",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    catId1: text("cat_id_1")
      .notNull()
      .references(() => cat.id, { onDelete: "cascade" }),
    catId2: text("cat_id_2")
      .notNull()
      .references(() => cat.id, { onDelete: "cascade" }),
    type: text("type", {
      enum: Object.values(CatRelationshipType) as [string, ...string[]],
    }).notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (t) => [
    unique("cat_relationship_unique").on(t.catId1, t.catId2),
    check("cat_relationship_order", sql`${t.catId1} < ${t.catId2}`),
  ],
);

// ── Chronicle ─────────────────────────────────────────────────────────────────

/** World board showing events in the cat kingdom (body: JSON stringified) */
export const chronicle = sqliteTable("chronicle", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  body: text("body").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ── Relations ─────────────────────────────────────────────────────────────────

export const userRelations = relations(userTable, ({ many }) => ({
  auth: many(authTable),
  sessions: many(sessionTable),
  cats: many(cat),
  raiseRecords: many(raiseRecord),
}));

export const authRelations = relations(authTable, ({ one }) => ({
  user: one(userTable, { fields: [authTable.userId], references: [userTable.id] }),
}));

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, { fields: [sessionTable.userId], references: [userTable.id] }),
}));

export const catRelations = relations(cat, ({ one, many }) => ({
  owner: one(userTable, { fields: [cat.ownerId], references: [userTable.id] }),
  raiseRecords: many(raiseRecord),
  personality: one(catPersonality, { fields: [cat.id], references: [catPersonality.catId] }),
  personalityTests: many(personalityTest),
  relationshipsAsCat1: many(catRelationship, { relationName: "cat1" }),
  relationshipsAsCat2: many(catRelationship, { relationName: "cat2" }),
}));

export const raiseRecordRelations = relations(raiseRecord, ({ one }) => ({
  cat: one(cat, { fields: [raiseRecord.catId], references: [cat.id] }),
  servant: one(userTable, { fields: [raiseRecord.servantId], references: [userTable.id] }),
}));

export const catPersonalityRelations = relations(catPersonality, ({ one }) => ({
  cat: one(cat, { fields: [catPersonality.catId], references: [cat.id] }),
}));

export const personalityTestRelations = relations(personalityTest, ({ one }) => ({
  cat: one(cat, { fields: [personalityTest.catId], references: [cat.id] }),
}));

export const catRelationshipRelations = relations(catRelationship, ({ one }) => ({
  cat1: one(cat, { fields: [catRelationship.catId1], references: [cat.id], relationName: "cat1" }),
  cat2: one(cat, { fields: [catRelationship.catId2], references: [cat.id], relationName: "cat2" }),
}));

// ── Table export ──────────────────────────────────────────────────────────────

export const table = {
  user: userTable,
  auth: authTable,
  emailVerification: emailVerificationTable,
  session: sessionTable,
  cat: cat,
  raiseRecord: raiseRecord,
  catPersonality: catPersonality,
  personalityTest: personalityTest,
  catRelationship: catRelationship,
  chronicle: chronicle,
} as const;
export type Table = typeof table;
