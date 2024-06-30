CREATE TABLE `achievement` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`institution_name` text NOT NULL,
	`education_type` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `experience` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`position` text NOT NULL,
	`company` text NOT NULL,
	`location` text NOT NULL,
	`description` text NOT NULL,
	`responsibilities` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer
);
--> statement-breakpoint
CREATE TABLE `personal_details` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`mobile` text NOT NULL,
	`email` text NOT NULL,
	`portfolio` text,
	`job_role` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`url` text,
	`description` text NOT NULL,
	`features` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skill` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`skill_type` text NOT NULL,
	`expertise` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `personal_details_email_unique` ON `personal_details` (`email`);