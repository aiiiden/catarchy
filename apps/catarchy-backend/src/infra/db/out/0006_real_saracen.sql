CREATE TABLE `personality_question` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`keyed` text NOT NULL,
	`domain` text NOT NULL,
	`description_level_1` text NOT NULL,
	`description_level_2` text NOT NULL,
	`description_level_3` text NOT NULL,
	`description_level_4` text NOT NULL,
	`description_level_5` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `personality_test_answer` (
	`cat_id` text NOT NULL,
	`question_id` text NOT NULL,
	`answer` integer NOT NULL,
	FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`question_id`) REFERENCES `personality_question`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "answer_range" CHECK("personality_test_answer"."answer" >= 1 AND "personality_test_answer"."answer" <= 5)
);
--> statement-breakpoint
CREATE INDEX `personality_test_answer_cat_id_idx` ON `personality_test_answer` (`cat_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `personality_test_answer_unique` ON `personality_test_answer` (`cat_id`,`question_id`);--> statement-breakpoint
DROP TABLE `personality_test`;