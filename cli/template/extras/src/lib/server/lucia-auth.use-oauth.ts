// src/lib/server/auth.ts
import { oauth_provider, type AuthProviderID } from '$src/lib/server/auth.oauth-provider';
import { db } from '$src/lib/server/db';
import { oauth_table } from '$src/lib/server/schema';
import { error, type RequestEvent } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { and, eq } from 'drizzle-orm';

type AuthorizationCodes<Verifier extends boolean> = Verifier extends true
	? { code: string; verifier: string }
	: { code: string; verifier: undefined };

type OauthProviderKeys<T extends AuthProviderID = AuthProviderID> = {
	OAUTH_STATE: `${T}_oauth_state`;
	OAUTH_VERIFIER: `${T}_oauth_verifier`;
};

export function use_oauth({
	event,
	provider_id,
}: {
	event: RequestEvent;
	provider_id: AuthProviderID;
}) {
	const provider = oauth_provider[provider_id];
	const provider_key = {
		OAUTH_STATE: `${provider_id}_oauth_state`,
		OAUTH_VERIFIER: `${provider_id}_oauth_verifier`,
	} satisfies OauthProviderKeys;

	return {
		/**
		 * Get Login URL:  Redirect a user to this URL to start the OAuth process
		 * @throws {Error} 500 - Failed to create authorization URL
		 */
		async get_login_url() {
			const state = generateState();
			const url = await provider.createAuthorizationURL(state);

			event.cookies.set(provider_key.OAUTH_STATE, state, {
				path: '/',
				secure: import.meta.env.PROD,
				httpOnly: true,
				maxAge: 60 * 10,
				sameSite: 'lax',
			});

			return { url };
		},

		/**
		 * Get Authorization Codes: Pass these authorization codes to validate an OAuth process
		 * @throws {Error} 400 - No code value provided
		 * @throws {Error} 400 - No state value provided
		 * @throws {Error} 400 - No stored state value provided
		 * @throws {Error} 400 - State values do not match
		 * @throws {Error} 400 - No stored verifier value provided
		 */
		get_authorization_codes<T extends boolean>({
			with_verifier,
		}: {
			with_verifier?: T;
		}): AuthorizationCodes<T> {
			// Code
			const code = event.url.searchParams.get('code');
			if (!code) throw error(400, 'No code value provided');

			// State
			const state = event.url.searchParams.get('state');
			const stored_state = event.cookies.get(provider_key.OAUTH_STATE) ?? undefined;
			if (!state) throw error(400, 'No state value provided');
			if (!stored_state) throw error(400, 'No stored state value provided');
			if (state !== stored_state) throw error(400, 'State values do not match');

			// Verifier
			const stored_verifier = event.cookies.get(provider_key.OAUTH_VERIFIER) ?? undefined;
			if (with_verifier === true) {
				if (!stored_verifier) throw error(400, 'No stored verifier value provided');
			}

			return { code, verifier: stored_verifier } as AuthorizationCodes<T>;
		},

		/**
		 * Get Existing Connection: Check for existing an oauth connection in the database
		 */
		async get_existing_connection({ provider_user_id }: { provider_user_id: string }) {
			const existing_connection = await db.query.oauth_table.findFirst({
				where: and(
					eq(oauth_table.provider_id, provider_id),
					eq(oauth_table.provider_user_id, provider_user_id),
				),
			});

			return existing_connection;
		},
	} as const;
}
