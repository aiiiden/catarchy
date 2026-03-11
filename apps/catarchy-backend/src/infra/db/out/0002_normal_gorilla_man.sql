CREATE TABLE `consensus` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`value_type` text NOT NULL,
	`purpose` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `fcm_token` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fcm_token_token_unique` ON `fcm_token` (`token`);--> statement-breakpoint
CREATE INDEX `fcm_token_user_id_idx` ON `fcm_token` (`user_id`);--> statement-breakpoint
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
CREATE INDEX `proposal_status_idx` ON `proposal` (`status`);--> statement-breakpoint
CREATE INDEX `proposal_ends_at_idx` ON `proposal` (`ends_at`);--> statement-breakpoint
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
CREATE INDEX `proposal_vote_user_id_idx` ON `proposal_vote` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `proposal_vote_unique` ON `proposal_vote` (`proposal_id`,`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `cat_owner_unique` ON `cat` (`owner_id`);--> statement-breakpoint
CREATE INDEX `cat_relationship_cat_id_2_idx` ON `cat_relationship` (`cat_id_2`);--> statement-breakpoint
CREATE INDEX `chronicle_created_at_idx` ON `chronicle` (`created_at`);--> statement-breakpoint
CREATE INDEX `email_verification_email_idx` ON `email_verification` (`email`);--> statement-breakpoint
CREATE INDEX `raise_record_cat_id_idx` ON `cat_raise_record` (`cat_id`);--> statement-breakpoint
CREATE INDEX `raise_record_servant_id_idx` ON `cat_raise_record` (`servant_id`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `session` (`user_id`);