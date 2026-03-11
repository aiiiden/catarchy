PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cat` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`servant_id` text NOT NULL,
	`growth` integer DEFAULT 0 NOT NULL,
	`emotion` integer DEFAULT 100 NOT NULL,
	`last_raised_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`servant_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "growth_positive" CHECK("__new_cat"."growth" >= 0),
	CONSTRAINT "emotion_range" CHECK("__new_cat"."emotion" >= 0 AND "__new_cat"."emotion" <= 100)
);
--> statement-breakpoint
INSERT INTO `__new_cat`("id", "name", "servant_id", "growth", "emotion", "last_raised_at", "created_at", "updated_at") SELECT "id", "name", "servant_id", "growth", "emotion", "last_raised_at", "created_at", "updated_at" FROM `cat`;--> statement-breakpoint
DROP TABLE `cat`;--> statement-breakpoint
ALTER TABLE `__new_cat` RENAME TO `cat`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `cat_servant_unique` ON `cat` (`servant_id`);