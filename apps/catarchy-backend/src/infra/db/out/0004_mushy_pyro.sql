DROP INDEX `cat_owner_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `cat_servant_unique` ON `cat` (`servant_id`);