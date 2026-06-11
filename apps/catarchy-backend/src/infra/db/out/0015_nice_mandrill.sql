PRAGMA defer_foreign_keys = on;
CREATE TABLE `__new_auth` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`email` text,
	`password` text,
	`wallet_address` text,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "email_password_required" CHECK("__new_auth"."provider" != 'email_password' OR ("__new_auth"."email" IS NOT NULL AND "__new_auth"."password" IS NOT NULL)),
	CONSTRAINT "wallet_required" CHECK("__new_auth"."provider" != 'wallet' OR "__new_auth"."wallet_address" IS NOT NULL)
);
INSERT INTO `__new_auth`("id", "provider", "email", "password", "wallet_address", "user_id", "created_at", "updated_at") SELECT "id", "provider", "email", "password", NULL, "user_id", "created_at", "updated_at" FROM `auth`;
DROP TABLE `auth`;
ALTER TABLE `__new_auth` RENAME TO `auth`;
--> statement-breakpoint
CREATE TABLE `siwe_nonce` (
	`id` text PRIMARY KEY NOT NULL,
	`wallet_address` text NOT NULL,
	`nonce` text NOT NULL,
	`expired_at` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `siwe_nonce_nonce_unique` ON `siwe_nonce` (`nonce`);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth` (`email`);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_wallet_address_unique` ON `auth` (`wallet_address`);
