import {
	create_new_session,
	oauth_provider,
	use_oauth,
	type AuthProviderID,
} from "$lib/server/auth";
import { db } from "$src/lib/server/db";
import { oauth_table, user_table } from "$src/lib/server/db/schema";
import { type RequestEvent } from "@sveltejs/kit";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

export async function GET(event: RequestEvent): Promise<Response> {
	const provider_id: AuthProviderID = "github";
	const provider = oauth_provider[provider_id];
	const oauth = use_oauth({ event, provider_id });
	const authorization = oauth.get_authorization_codes({ with_verifier: false });

	try {
		const tokens = await provider.validateAuthorizationCode(authorization.code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const github_user: GitHubUser = await githubUserResponse.json();
		const [gh_fname] = (github_user.name || "").split(" ");
		const display_name = github_user.name || gh_fname || "User";

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

			// TODO: You might want to associate the user with an existing account if they are already logged in

			// Create a new user
			const user_id = generateIdFromEntropySize(10);

			await db.transaction(async (tx) => {
				// Insert the user
				await tx.insert(user_table).values({ id: user_id, display_name });

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

interface GitHubUser {
	login: string;
	id: number;
	name: string;
	avatar_url: string | null;
	email: string | null;
}
