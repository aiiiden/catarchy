CREATE TABLE `nonce` (
	`id` text PRIMARY KEY NOT NULL,
	`wallet_id` text NOT NULL,
	`nonce` text NOT NULL,
	`expired_at` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `nonce_wallet_id_idx` ON `nonce` (`wallet_id`);--> statement-breakpoint
CREATE TABLE `wallet` (
	`id` text PRIMARY KEY NOT NULL,
	`address` text NOT NULL,
	`user_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `wallet_address_unique` ON `wallet` (`address`);--> statement-breakpoint
CREATE UNIQUE INDEX `wallet_user_id_unique` ON `wallet` (`user_id`);