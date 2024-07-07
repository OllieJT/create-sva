import type { AuthProviderID } from "$src/lib/server/auth";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { datetime, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";

/* User */

export const user_table = mysqlTable("user", {
	id: varchar("id", { length: 255 }).primaryKey(),
	display_name: varchar("display_name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
});

export const user_relations = relations(user_table, ({ many }) => ({
	sessions: many(session_table),
	oauth_providers: many(oauth_table),
}));

export type DBSelectUser = InferSelectModel<typeof user_table>;
export type DBInsertUser = InferInsertModel<typeof user_table>;

/* Session */

export const session_table = mysqlTable("session", {
	id: varchar("id", { length: 255 }).primaryKey(),
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => user_table.id, { onDelete: "cascade", onUpdate: "cascade" }),
	expiresAt: datetime("expires_at").notNull(),
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

export const oauth_table = mysqlTable(
	"oauth",
	{
		provider_id: varchar("provider_id", { length: 255 }).$type<AuthProviderID>().notNull(), // OAuth provider
		provider_user_id: varchar("provider_user_id", { length: 255 }).notNull(), // OAuth user ID
		user_id: varchar("user_id", { length: 255 })
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
