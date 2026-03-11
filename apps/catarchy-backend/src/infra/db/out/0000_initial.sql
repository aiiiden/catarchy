-- ── User ──────────────────────────────────────────────────────────────────────
CREATE TABLE `user` (
  `id` text PRIMARY KEY NOT NULL,
  `handle` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_handle_unique` ON `user` (`handle`);
--> statement-breakpoint

-- ── Auth ──────────────────────────────────────────────────────────────────────
CREATE TABLE `auth` (
  `id` text PRIMARY KEY NOT NULL,
  `provider` text NOT NULL,
  `email` text,
  `password` text,
  `user_id` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth` (`email`);
--> statement-breakpoint

-- ── Email Verification ────────────────────────────────────────────────────────
CREATE TABLE `email_verification` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `code` text NOT NULL,
  `expired_at` integer NOT NULL,
  `verified` integer DEFAULT false,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE INDEX `email_verification_email_idx` ON `email_verification` (`email`);
--> statement-breakpoint

-- ── Session ───────────────────────────────────────────────────────────────────
CREATE TABLE `session` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `refresh_token` text NOT NULL,
  `expired_at` integer NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_refresh_token_unique` ON `session` (`refresh_token`);
--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `session` (`user_id`);
--> statement-breakpoint

-- ── Push Notification ─────────────────────────────────────────────────────────
CREATE TABLE `fcm_token` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `token` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fcm_token_token_unique` ON `fcm_token` (`token`);
--> statement-breakpoint
CREATE INDEX `fcm_token_user_id_idx` ON `fcm_token` (`user_id`);
--> statement-breakpoint

-- ── Cat ───────────────────────────────────────────────────────────────────────
CREATE TABLE `cat` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `servant_id` text NOT NULL,
  `last_cared_at` text,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`servant_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cat_servant_unique` ON `cat` (`servant_id`);
--> statement-breakpoint

CREATE TABLE `cat_stat` (
  `cat_id` text PRIMARY KEY NOT NULL,
  `growth` integer DEFAULT 0 NOT NULL,
  `emotion` integer DEFAULT 100 NOT NULL,
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade,
  CONSTRAINT "growth_positive" CHECK("cat_stat"."growth" >= 0),
  CONSTRAINT "emotion_range" CHECK("cat_stat"."emotion" >= 0 AND "cat_stat"."emotion" <= 100)
);
--> statement-breakpoint

CREATE TABLE `cat_care_record` (
  `id` text PRIMARY KEY NOT NULL,
  `cat_id` text NOT NULL,
  `servant_id` text NOT NULL,
  `growth_delta` integer NOT NULL,
  `emotion_delta` integer NOT NULL,
  `message` text NOT NULL,
  `cared_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`servant_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `care_record_cat_id_idx` ON `cat_care_record` (`cat_id`);
--> statement-breakpoint
CREATE INDEX `care_record_servant_id_idx` ON `cat_care_record` (`servant_id`);
--> statement-breakpoint

CREATE TABLE `cat_personality` (
  `cat_id` text PRIMARY KEY NOT NULL,
  `openness` integer NOT NULL,
  `conscientiousness` integer NOT NULL,
  `extraversion` integer NOT NULL,
  `agreeableness` integer NOT NULL,
  `neuroticism` integer NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade,
  CONSTRAINT "openness_range" CHECK("cat_personality"."openness" >= 0 AND "cat_personality"."openness" <= 100),
  CONSTRAINT "conscientiousness_range" CHECK("cat_personality"."conscientiousness" >= 0 AND "cat_personality"."conscientiousness" <= 100),
  CONSTRAINT "extraversion_range" CHECK("cat_personality"."extraversion" >= 0 AND "cat_personality"."extraversion" <= 100),
  CONSTRAINT "agreeableness_range" CHECK("cat_personality"."agreeableness" >= 0 AND "cat_personality"."agreeableness" <= 100),
  CONSTRAINT "neuroticism_range" CHECK("cat_personality"."neuroticism" >= 0 AND "cat_personality"."neuroticism" <= 100)
);
--> statement-breakpoint

CREATE TABLE `cat_relationship` (
  `id` text PRIMARY KEY NOT NULL,
  `cat_id_1` text NOT NULL,
  `cat_id_2` text NOT NULL,
  `type` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`cat_id_1`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`cat_id_2`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade,
  CONSTRAINT "cat_relationship_order" CHECK("cat_relationship"."cat_id_1" < "cat_relationship"."cat_id_2")
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cat_relationship_unique` ON `cat_relationship` (`cat_id_1`, `cat_id_2`);
--> statement-breakpoint
CREATE INDEX `cat_relationship_cat_id_2_idx` ON `cat_relationship` (`cat_id_2`);
--> statement-breakpoint

CREATE TABLE `personality_test` (
  `id` text PRIMARY KEY NOT NULL,
  `cat_id` text NOT NULL,
  `answers` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint

-- ── Chronicle ─────────────────────────────────────────────────────────────────
CREATE TABLE `chronicle` (
  `id` text PRIMARY KEY NOT NULL,
  `body` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE INDEX `chronicle_created_at_idx` ON `chronicle` (`created_at`);
--> statement-breakpoint

-- ── Consensus ─────────────────────────────────────────────────────────────────
CREATE TABLE `consensus` (
  `key` text PRIMARY KEY NOT NULL,
  `value` text NOT NULL,
  `value_type` text NOT NULL,
  `name` text NOT NULL,
  `purpose` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT OR IGNORE INTO consensus (key, value, value_type, name, purpose) VALUES
  ('CAT.COOLDOWN_HOUR_BETWEEN_CARE', '1',   'NUMBER', 'Care cooldown',                           'Minimum cooldown time (in hours) between caring for your cat'),
  ('CAT.GROWTH_PER_CARE',            '1',   'NUMBER', 'Growth stat gained per care',             'Growth stat gained when caring for your cat'),
  ('CAT.EMOTION_PER_CARE',           '5',   'NUMBER', 'Emotion stat gained per care',            'Emotion stat gained when caring for your cat'),
  ('CAT.EMOTION_DECAY_PER_DAY',      '10',  'NUMBER', 'Emotion stat lost per day without a care','Emotion stat lost per day when you do not care for your cat'),
  ('CAT.MAX_GROWTH',                 '100', 'NUMBER', 'Maximum growth stat',                     'Maximum growth stat your cat can have');
--> statement-breakpoint

-- ── Governance ────────────────────────────────────────────────────────────────
CREATE TABLE `proposal` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `proposer_type` text NOT NULL,
  `proposer_id` text,
  `target_key` text NOT NULL,
  `proposed_value` text NOT NULL,
  `status` text DEFAULT 'ACTIVE' NOT NULL,
  `ends_at` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`proposer_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`target_key`) REFERENCES `consensus`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `proposal_status_idx` ON `proposal` (`status`);
--> statement-breakpoint
CREATE INDEX `proposal_ends_at_idx` ON `proposal` (`ends_at`);
--> statement-breakpoint

CREATE TABLE `proposal_vote` (
  `id` text PRIMARY KEY NOT NULL,
  `proposal_id` text NOT NULL,
  `user_id` text NOT NULL,
  `choice` text NOT NULL,
  `created_at` text DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`proposal_id`) REFERENCES `proposal`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `proposal_vote_user_id_idx` ON `proposal_vote` (`user_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `proposal_vote_unique` ON `proposal_vote` (`proposal_id`, `user_id`);
