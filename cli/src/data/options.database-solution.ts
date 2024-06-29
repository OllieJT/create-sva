import { ClackOption } from "$src/data/types.js";

// FEAT: Add Supabase.DB support
export const database_solutions = ["mysql", "sqlite", "postgres"] as const;
export type DatabaseSolution = (typeof database_solutions)[number];
export const database_options = [
	{ value: "mysql", label: "MySQL", hint: "With Drizzle ORM" },
	{ value: "sqlite", label: "SQLite", hint: "With Drizzle ORM" },
	{ value: "postgres", label: "PostgreSQL", hint: "With Drizzle ORM" },
] satisfies ClackOption<DatabaseSolution>[];
