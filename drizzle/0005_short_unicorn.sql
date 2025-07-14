ALTER TABLE "user" ADD COLUMN "discord_email" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "discord_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "discord_avater_image" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "discord_username" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "discord_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_discord_connect" boolean DEFAULT false;