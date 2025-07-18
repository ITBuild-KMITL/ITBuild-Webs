import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	firstNameTH: text('first_name_th'),
	lastNameTH: text('last_name_th'),
	firstNameEN: text('first_name_en'),
	lastNameEN: text('last_name_en'),
	email: text('email').notNull().unique(),
	role: text('role').notNull().default("member"),
	stdId: text("std_id"),
	major: text("major"),
	year: integer("year"),
	phone: text('phone'),
	registered: boolean('registered').$defaultFn(() => false).notNull(),
	emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
	image: text('image'),
	discordEmail:text('discord_email'),
	discordId:text('discord_id'),
	discordAvaterImage:text("discord_avater_image"),
	discordUsername:text("discord_username"),
	discordName:text("discord_name"),
	isDiscordConnect:boolean("is_discord_connect").default(false),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});
