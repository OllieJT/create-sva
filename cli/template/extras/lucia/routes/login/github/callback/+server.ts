import {
	create_new_session,
	oauth_provider,
	use_oauth,
	type AuthProviderID,
} from "$lib/server/auth";
import { get_github_user } from "$lib/server/auth/oauth.github";
import { db } from "$src/lib/server/db";
import { oauth_table, user_table } from "$src/lib/server/db/schema";
import { error, type RequestEvent } from "@sveltejs/kit";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";

function use_full_name(name: string | null) {
	const [name_first, ...name_last] = (name || "").split(" ");
	return { name_first, name_last: name_last.join(" ") };
}

export async function GET(event: RequestEvent): Promise<Response> {
	const provider_id: AuthProviderID = "github";
	const provider = oauth_provider[provider_id];
	const oauth = use_oauth({ event, provider_id });
	const authorization = oauth.get_authorization_codes({ with_verifier: false });

	try {
		const tokens = await provider.validateAuthorizationCode(authorization.code);
		const github_user = await get_github_user({ accessToken: tokens.accessToken });

		if (!github_user.email_verified) {
			throw error(400, {
				title: "Email not verified",
				message: `Please verify your email address with ${provider_id} before continuing.`,
			});
		}

		const existing_oauth = await oauth.get_existing_connection({
			provider_user_id: github_user.id.toString(),
		});

		if (existing_oauth) {
			// The user is already connected to this provider
			await create_new_session({
				event,
				user_id: existing_oauth.user_id,
			});

			// TODO: You might want to update the user profile with new data from the provider
		} else {
			// The user is not connected to this provider
			const existing_user = await db.query.user_table.findFirst({
				where: eq(user_table.email, github_user.email_address),
				columns: { id: true },
			});

			// You might want to associate the user with an existing account if they are already logged in
			if (existing_user?.id) {
				await db.insert(oauth_table).values({
					provider_id: "github",
					provider_user_id: github_user.id.toString(),
					user_id: existing_user.id,
				});

				await create_new_session({
					event,
					user_id: existing_user.id,
				});
			} else {
				// Create a new user
				const user_id = generateIdFromEntropySize(10);
				const { name_first } = use_full_name(github_user.name || "");

				await db.transaction(async (tx) => {
					// Insert the user
					await tx
						.insert(user_table)
						.values({ id: user_id, display_name: github_user.name || name_first || "Anonymous" });

					// Insert the oauth connection
					await tx.insert(oauth_table).values({
						provider_id: "github",
						provider_user_id: github_user.id.toString(),
						user_id: user_id,
					});
				});

				await create_new_session({
					event,
					user_id: user_id,
				});
			}
		}
		return new Response(null, {
			status: 302,
			headers: { Location: "/account" },
		});
	} catch (e) {
		console.warn("Some auth error: ", e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, { status: 400 });
		}
		return new Response(null, { status: 500 });
	}
}
