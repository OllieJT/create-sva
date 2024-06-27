import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

/*
	You might want to seperate your schemas
	Learn more about it here: https://orm.drizzle.team/docs/sql-schema-declaration
*/

/* Task */

export const task_table = sqliteTable('task', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	topic_id: text('topic_id').references(() => topic_table.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
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

export const topic_table = sqliteTable('topic', {
	id: text('id').primaryKey(),
	name: text('content').notNull(),
});

export const topic_relations = relations(topic_table, ({ many }) => ({
	tasks: many(task_table),
}));

export type DBSelectTopic = InferSelectModel<typeof topic_table>;
export type DBInsertTopic = InferInsertModel<typeof topic_table>;
