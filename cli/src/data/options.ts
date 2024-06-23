type Primitive = Readonly<string | boolean | number>;

type ClackOption<Value> = Value extends Primitive
	? {
			value: Value;
			label?: string;
			hint?: string;
		}
	: {
			value: Value;
			label: string;
			hint?: string;
		};

// FEAT: Add Supabase.DB support
export const database_solutions = ['mysql', 'sqlite', 'postgres'] as const;
export type DatabaseSolution = (typeof database_solutions)[number];
export const database_options = [
	{ value: 'mysql', label: 'MySQL' },
	{ value: 'sqlite', label: 'SQLite' },
	{ value: 'postgres', label: 'PostgreSQL' },
] satisfies ClackOption<DatabaseSolution>[];

export const css_solutions = ['css', 'tailwind'] as const;
export type CssSolution = (typeof css_solutions)[number];
export const css_options = [
	{ value: 'css', label: 'Just CSS' },
	{ value: 'tailwind', label: 'Tailwind CSS' },
] satisfies ClackOption<CssSolution>[];

// FEAT: Add Auth.JS support
// FEAT: Add Supabase.Auth
export const auth_solutions = ['none', 'lucia'] as const;
export type AuthSolution = (typeof auth_solutions)[number];
export const auth_options = [
	{ value: 'none', label: 'None' },
	{ value: 'lucia', label: 'Lucia' },
] satisfies ClackOption<AuthSolution>[];

export const adapter_solution = ['node', 'vercel', 'netlify', 'cloudflare', 'auto'] as const;
export type AdapterSolution = (typeof adapter_solution)[number];
export const adapter_options = [
	{ value: 'node', label: 'Node' },
	{ value: 'vercel', label: 'Vercel' },
	{ value: 'netlify', label: 'Netlify' },
	{ value: 'cloudflare', label: 'Cloudflare' },
	{ value: 'auto', label: 'Auto (Not recommended for production)' },
] satisfies ClackOption<AdapterSolution>[];

type AdapterPackages = `adapter:${AdapterSolution}`;
type AuthPackages = `auth:${Exclude<AuthSolution, 'none'>}`;
type CssPackages = `css:${Exclude<CssSolution, 'css'>}`;
type DatabasePackages = `drizzle:${DatabaseSolution}`;

export const available_packages = [
	// SvelteKit adapters
	'adapter:node',
	'adapter:vercel',
	'adapter:netlify',
	'adapter:cloudflare',
	'adapter:auto',

	// Auth solutions
	'auth:lucia',

	// CSS solutions
	'css:tailwind',

	// Database solutions
	'drizzle:mysql',
	'drizzle:sqlite',
	'drizzle:postgres',
] satisfies (AdapterPackages | AuthPackages | CssPackages | DatabasePackages)[];
export type AvailablePackages = (typeof available_packages)[number];
