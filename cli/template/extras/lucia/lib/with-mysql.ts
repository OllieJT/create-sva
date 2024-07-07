// src/lib/server/auth.ts
import { dev } from "$app/environment";
import { session_table, user_table, type DBSelectUser } from "$lib/server/db/schema";
import { db } from "$src/lib/server/db";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
export * from "./create-session";
export * from "./oauth-provider";
export * from "./use-oauth";

const adapter = new DrizzleMySQLAdapter(db, session_table, user_table);
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
