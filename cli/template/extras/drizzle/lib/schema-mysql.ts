import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";

/*
	You might want to seperate your schemas
	Learn more about it here: https://orm.drizzle.team/docs/sql-schema-declaration
*/

/* Task */

export const task_table = mysqlTable("task", {
	id: varchar("id", { length: 255 }).primaryKey(),
	content: longtext("content").notNull(),
	topic_id: varchar("topic_id", { length: 255 }).references(() => topic_table.id, {
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

export const topic_table = mysqlTable("topic", {
	id: varchar("id", { length: 255 }).primaryKey(),
	name: varchar("content", { length: 255 }).notNull(),
});

export const topic_relations = relations(topic_table, ({ many }) => ({
	tasks: many(task_table),
}));

export type DBSelectTopic = InferSelectModel<typeof topic_table>;
export type DBInsertTopic = InferInsertModel<typeof topic_table>;
