ALTER TABLE `cat_raise_record` RENAME TO `cat_care_record`;--> statement-breakpoint
ALTER TABLE `cat_care_record` RENAME COLUMN "raised_at" TO "cared_at";--> statement-breakpoint
ALTER TABLE `cat` RENAME COLUMN "last_raised_at" TO "last_cared_at";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cat_care_record` (
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
INSERT INTO `__new_cat_care_record`("id", "cat_id", "servant_id", "growth_delta", "emotion_delta", "message", "cared_at") SELECT "id", "cat_id", "servant_id", "growth_delta", "emotion_delta", "message", "cared_at" FROM `cat_care_record`;--> statement-breakpoint
DROP TABLE `cat_care_record`;--> statement-breakpoint
ALTER TABLE `__new_cat_care_record` RENAME TO `cat_care_record`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `care_record_cat_id_idx` ON `cat_care_record` (`cat_id`);--> statement-breakpoint
CREATE INDEX `care_record_servant_id_idx` ON `cat_care_record` (`servant_id`);


Mochi's tiny eyes flutter open as she feels the gentle touch, and she lets out a soft, 
squeaky mew of contentment while instinctively nuzzling closer. 
Her little body relaxes into warmth, and within moments she drifts back into peaceful sleep with the faintest purr.