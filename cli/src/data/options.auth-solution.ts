import { ClackOption } from "$src/data/types.js";

// FEAT: Add Auth.JS support
// FEAT: Add Supabase.Auth
export const auth_solutions = ["none", "lucia"] as const;
export type AuthSolution = (typeof auth_solutions)[number];
export const auth_options = [
	{ value: "none", label: "None" },
	{ value: "lucia", label: "Lucia" },
] satisfies ClackOption<AuthSolution>[];
