// src/lib/server/auth.ts
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { GitHub } from 'arctic';

/**
 * Oauth Providers: add new providers here
 * The key of each provider will be used to identify the provider in the OAuth process.
 */
export const oauth_provider = {
	github: new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET),
};
export type AuthProviderID = keyof typeof oauth_provider;

/**
 * Oauth Path Map: add new providers here
 * Each path is determined by the providers key in oauth_provider (above)
 */
export const oauth_path_map = {
	github: {
		login: '/login/github',
		callback: '/login/github/callback',
	},
} satisfies OauthPathMap;
type OauthPathMap = {
	[ProviderID in AuthProviderID]: {
		login: `/login/${ProviderID}`;
		callback: `/login/${ProviderID}/callback`;
	};
};
