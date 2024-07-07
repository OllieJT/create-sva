import type { AuthProviderID } from "$src/lib/server/auth";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

/*
	You might want to seperate your schemas
	Learn more about it here: https://orm.drizzle.team/docs/sql-schema-declaration
*/

/* Task */

export const task_table = pgTable("task", {
	id: text("id").primaryKey(),
	content: text("content").notNull(),
	topic_id: text("topic_id").references(() => topic_table.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
});

export const task_relations = relations(task_table, ({ one }) => ({
	topics: one(topic_table, {
		fields: [task_table.topic_id],
		references: [topic_table.id],
	}),
}));

export type DBSelectTask = InferSelectModel<typeof task_table>;
export type DBInsertTask = InferInsertModel<typeof task_table>;

/* Topic */

export const topic_table = pgTable("topic", {
	id: text("id").primaryKey(),
	name: text("content").notNull(),
});

export const topic_relations = relations(topic_table, ({ many }) => ({
	tasks: many(task_table),
}));

export type DBSelectTopic = InferSelectModel<typeof topic_table>;
export type DBInsertTopic = InferInsertModel<typeof topic_table>;

/* User */

export const user_table = pgTable("user", {
	id: text("id").primaryKey(),
	display_name: text("display_name").notNull(),
});

export const user_relations = relations(user_table, ({ many }) => ({
	sessions: many(session_table),
	oauth_providers: many(oauth_table),
}));

export type DBSelectUser = InferSelectModel<typeof user_table>;
export type DBInsertUser = InferInsertModel<typeof user_table>;

/* Session */

export const session_table = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user_table.id, { onDelete: "cascade", onUpdate: "cascade" }),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const session_relations = relations(session_table, ({ one }) => ({
	user: one(user_table, {
		fields: [session_table.userId],
		references: [user_table.id],
	}),
}));

export type DBSelectSession = InferSelectModel<typeof session_table>;
export type DBInsertSession = InferInsertModel<typeof session_table>;

/* OAuth */

export const oauth_table = pgTable(
	"oauth",
	{
		provider_id: text("provider_id").$type<AuthProviderID>().notNull(), // OAuth provider
		provider_user_id: text("provider_user_id").notNull(), // OAuth user ID
		user_id: text("user_id")
			.notNull()
			.references(() => user_table.id, { onDelete: "cascade", onUpdate: "cascade" }),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.user_id, table.provider_id] }),
		};
	},
);

export const oauth_relations = relations(oauth_table, ({ one }) => ({
	user: one(user_table, {
		fields: [oauth_table.user_id],
		references: [user_table.id],
	}),
}));

export type DBSelectOauth = InferSelectModel<typeof oauth_table>;
export type DBInsertOauth = InferInsertModel<typeof oauth_table>;
