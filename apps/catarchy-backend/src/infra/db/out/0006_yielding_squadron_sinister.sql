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
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cat` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`servant_id` text NOT NULL,
	`last_raised_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`servant_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_cat`("id", "name", "servant_id", "last_raised_at", "created_at", "updated_at") SELECT "id", "name", "servant_id", "last_raised_at", "created_at", "updated_at" FROM `cat`;--> statement-breakpoint
DROP TABLE `cat`;--> statement-breakpoint
ALTER TABLE `__new_cat` RENAME TO `cat`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `cat_servant_unique` ON `cat` (`servant_id`);