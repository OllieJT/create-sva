import { AdapterSolution } from "$src/data/options.adapter-solution.js";
import { AuthSolution } from "$src/data/options.auth-solution.js";
import { CssSolution } from "$src/data/options.css-solution.js";
import { DatabaseSolution } from "$src/data/options.database-solution.js";
import { DevToolSolution } from "$src/data/options.dev-tool-solutions.js";
export * from "$src/data/options.adapter-solution.js";
export * from "$src/data/options.auth-solution.js";
export * from "$src/data/options.css-solution.js";
export * from "$src/data/options.database-solution.js";
export * from "$src/data/options.dev-tool-solutions.js";

type AdapterPackages = `adapter:${AdapterSolution}`;
type AuthPackages = Exclude<AuthSolution, "none">;
type CssPackages = Exclude<CssSolution, "none">;
type DatabasePackages = DatabaseSolution;
type GitHookPackages = Exclude<DevToolSolution, "none">;

export const available_packages = [
	// SvelteKit adapters
	"adapter:node",
	"adapter:vercel",
	"adapter:netlify",
	"adapter:cloudflare",
	"adapter:auto",

	// Auth solutions
	"lucia",

	// CSS solutions
	"tailwind",

	// Database solutions
	"mysql",
	"sqlite",
	"postgres",

	// Tooling solutions
	"husky",
	"vscode",
] satisfies (AdapterPackages | AuthPackages | CssPackages | DatabasePackages | GitHookPackages)[];
export type AvailablePackages = (typeof available_packages)[number];
