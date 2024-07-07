import { dev } from "$app/environment";
import { DATABASE_URL } from "$env/static/private";
import * as schema from "$lib/server/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/**
 * Cache the database connection in development.
 * This avoids creating a new connection on every HMR update.
 */
const global_db = globalThis as unknown as {
	connection: postgres.Sql | undefined;
};

const connection = global_db.connection ?? postgres(DATABASE_URL);
if (dev) global_db.connection = connection;

// You can find specific PostgreSQL adapters in the Drizzle docs.
// https://orm.drizzle.team/docs/get-started-postgresql
export const db = drizzle(connection, { schema });
