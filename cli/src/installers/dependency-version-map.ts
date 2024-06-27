/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependency_version_map = {
	// Svelte
	'@types/node': '^20.14.8',
	'@sveltejs/vite-plugin-svelte': '^3.0.0',
	svelte: '^5.0.0-next.164',
	'svelte-check': '^3.6.0',
	typescript: '^5.5.2',
	vite: '^5.0.3',
	vitest: '^1.2.0',
	'@sveltejs/enhanced-img': '^0.3.0',
	'@unpic/svelte': '^0.0.53',
	'imagetools-core': '^7.0.0',
	zod: '^3.23.8',

	// SvelteKit
	'@sveltejs/kit': '^2.0.0',
	'sveltekit-superforms': '^2.15.1',
	'@sveltejs/adapter-auto': '^3.2.2',
	'@sveltejs/adapter-vercel': '^5.3.2',
	'@sveltejs/adapter-cloudflare': '^4.5.0',
	'@sveltejs/adapter-netlify': '^4.2.1',
	'@sveltejs/adapter-node': '^5.2.0',

	// Prettier
	'prettier-plugin-svelte': '^3.2.5',
	'prettier-plugin-tailwindcss': '^0.6.5',
	prettier: '^3.3.2',

	// Eslint
	globals: '^15.0.0',
	'@types/eslint': '^8.56.7',
	eslint: '^9.0.0',
	'eslint-config-prettier': '^9.1.0',
	'eslint-plugin-svelte': '^2.36.0',
	'typescript-eslint': '^8.0.0-alpha.20',

	// Hooks
	husky: '^9.0.11',
	'lint-staged': '^15.2.7',

	// Styling
	postcss: '^8.4.33',
	autoprefixer: '^10.4.16',
	'tailwind-merge': '^2.3.0',
	tailwindcss: '^3.4.4',
	'@tailwindcss/container-queries': '^0.1.1',

	// Database
	'drizzle-kit': '^0.22.7',
	'drizzle-orm': '^0.31.2',
	'eslint-plugin-drizzle': '^0.2.3',
	mysql2: '^3.9.7',
	postgres: '^3.4.4',
	'better-sqlite3': '^11.0.0',
	'@types/better-sqlite3': '^7.6.10',

	// Auth
	'@lucia-auth/adapter-drizzle': '^1.0.7',
	lucia: '^3.2.0',
	arctic: '^1.9.1',
} as const;
export type AvailableDependencies = keyof typeof dependency_version_map;
