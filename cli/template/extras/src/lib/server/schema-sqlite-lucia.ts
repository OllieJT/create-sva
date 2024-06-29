import type { AuthProviderID } from "$src/lib/server/auth";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

/*
	You might want to seperate your schemas
	Learn more about it here: https://orm.drizzle.team/docs/sql-schema-declaration
*/

/* User */

export const user_table = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	display_name: text("display_name").notNull(),
});

export const user_relations = relations(user_table, ({ many }) => ({
	sessions: many(session_table),
	oauth_providers: many(oauth_table),
}));

export type DBSelectUser = InferSelectModel<typeof user_table>;
export type DBInsertUser = InferInsertModel<typeof user_table>;

/* Session */

export const session_table = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user_table.id, { onDelete: "cascade", onUpdate: "cascade" }),
	expiresAt: integer("expires_at").notNull(),
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

export const oauth_table = sqliteTable(
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
