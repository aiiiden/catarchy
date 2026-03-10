CREATE TABLE `cat` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner_id` text NOT NULL,
	`growth` integer DEFAULT 0 NOT NULL,
	`emotion` integer DEFAULT 100 NOT NULL,
	`last_raised_at` text DEFAULT (CURRENT_TIMESTAMP),
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "growth_positive" CHECK("cat"."growth" >= 0),
	CONSTRAINT "emotion_range" CHECK("cat"."emotion" >= 0 AND "cat"."emotion" <= 100)
);
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
CREATE UNIQUE INDEX `cat_relationship_unique` ON `cat_relationship` (`cat_id_1`,`cat_id_2`);--> statement-breakpoint
CREATE TABLE `chronicle` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `personality_test` (
	`id` text PRIMARY KEY NOT NULL,
	`cat_id` text NOT NULL,
	`answers` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cat_raise_record` (
	`id` text PRIMARY KEY NOT NULL,
	`cat_id` text NOT NULL,
	`servant_id` text NOT NULL,
	`growth_delta` integer NOT NULL,
	`emotion_delta` integer NOT NULL,
	`message` text NOT NULL,
	`raised_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`servant_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_auth` (
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
INSERT INTO `__new_auth`("id", "provider", "email", "password", "user_id", "created_at", "updated_at") SELECT "id", "provider", "email", "password", "user_id", "created_at", "updated_at" FROM `auth`;--> statement-breakpoint
DROP TABLE `auth`;--> statement-breakpoint
ALTER TABLE `__new_auth` RENAME TO `auth`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth` (`email`);