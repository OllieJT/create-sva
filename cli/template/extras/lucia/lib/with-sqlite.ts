// src/lib/server/auth.ts
import { dev } from "$app/environment";
import { session_table, user_table, type DBSelectUser } from "$lib/server/schema";
import { db } from "$src/lib/server/db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
export * from "./auth.create-session";
export * from "./auth.oauth-provider";
export * from "./auth.use-oauth";

const adapter = new DrizzleSQLiteAdapter(db, session_table, user_table);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev,
		},
	},
	getUserAttributes: (attributes) => {
		// Values will be avalible on the user session object
		return {
			display_name: attributes.display_name,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DBSelectUser;
	}
}
