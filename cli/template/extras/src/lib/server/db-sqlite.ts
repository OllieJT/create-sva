import { dev } from '$app/environment';
import * as schema from '$lib/server/schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

/**
 * Cache the database connection in development.
 * This avoids creating a new connection on every HMR update.
 */
const global_db = globalThis as unknown as {
	connection: InstanceType<typeof Database> | undefined;
};

// We're using better-sqlite3 to support a local sqlite database.
// You might want to switch to the libsql adapter for production.
const connection = global_db.connection ?? new Database('sqlite.db');
if (dev) global_db.connection = connection;

// You can find specific SQLite adapters in the Drizzle docs.
// https://orm.drizzle.team/docs/get-started-sqlite
export const db = drizzle(connection, { schema });
