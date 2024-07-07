// src/lib/server/auth.ts
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import { GitHub } from "arctic";

export const oauth_provider = {
	github: new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET),
};
export type AuthProviderID = keyof typeof oauth_provider;
