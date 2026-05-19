PRAGMA defer_foreign_keys = on;
CREATE TABLE `__new_cat_personality` (
	`cat_id` text PRIMARY KEY NOT NULL,
	`openness` integer NOT NULL,
	`conscientiousness` integer NOT NULL,
	`extraversion` integer NOT NULL,
	`agreeableness` integer NOT NULL,
	`neuroticism` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "openness_range" CHECK("__new_cat_personality"."openness" >= 0 AND "__new_cat_personality"."openness" <= 10),
	CONSTRAINT "conscientiousness_range" CHECK("__new_cat_personality"."conscientiousness" >= 0 AND "__new_cat_personality"."conscientiousness" <= 10),
	CONSTRAINT "extraversion_range" CHECK("__new_cat_personality"."extraversion" >= 0 AND "__new_cat_personality"."extraversion" <= 10),
	CONSTRAINT "agreeableness_range" CHECK("__new_cat_personality"."agreeableness" >= 0 AND "__new_cat_personality"."agreeableness" <= 10),
	CONSTRAINT "neuroticism_range" CHECK("__new_cat_personality"."neuroticism" >= 0 AND "__new_cat_personality"."neuroticism" <= 10)
);
INSERT INTO `__new_cat_personality`("cat_id", "openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism", "created_at", "updated_at") SELECT "cat_id", "openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism", "created_at", "updated_at" FROM `cat_personality`;
DROP TABLE `cat_personality`;
ALTER TABLE `__new_cat_personality` RENAME TO `cat_personality`;
