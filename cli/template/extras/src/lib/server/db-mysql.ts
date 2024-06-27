import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import * as schema from '$lib/server/schema';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool, type Pool } from 'mysql2/promise';

/**
 * Cache the database connection in development.
 * This avoids creating a new connection on every HMR update.
 */
const global_db = globalThis as unknown as {
	connection: Pool | undefined;
};

const connection = global_db.connection ?? createPool({ uri: DATABASE_URL });
if (dev) global_db.connection = connection;

// You can find specific MySQL adapters in the Drizzle docs.
// https://orm.drizzle.team/docs/get-started-mysql
export const db = drizzle(connection, { schema });
