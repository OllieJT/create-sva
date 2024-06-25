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
	{ value: 'mysql', label: 'MySQL', hint: 'With Drizzle ORM' },
	{ value: 'sqlite', label: 'SQLite', hint: 'With Drizzle ORM' },
	{ value: 'postgres', label: 'PostgreSQL', hint: 'With Drizzle ORM' },
] satisfies ClackOption<DatabaseSolution>[];

export const css_solutions = ['none', 'tailwind', 'shadcn', 'bits_ui'] as const;
export type CssSolution = (typeof css_solutions)[number];
export const css_options = [
	{ value: 'none', label: 'Just CSS' },
	// { value: 'bits_ui', label: 'bits UI', hint: 'With Tailwind' },
	// { value: 'shadcn', label: 'shadcn', hint: 'With Tailwind' },
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

export const adapter_solutions = ['node', 'vercel', 'netlify', 'cloudflare', 'auto'] as const;
export type AdapterSolution = (typeof adapter_solutions)[number];
export const adapter_options = [
	{ value: 'auto', label: 'Auto (Not recommended for production)' },
	{ value: 'node', label: 'Node' },
	{ value: 'vercel', label: 'Vercel' },
	{ value: 'netlify', label: 'Netlify' },
	{ value: 'cloudflare', label: 'Cloudflare' },
] satisfies ClackOption<AdapterSolution>[];

export const hook_solutions = ['none', 'hooks:check', 'hooks:fix'] as const;
export type HookSolution = (typeof hook_solutions)[number];
export const hook_options = [
	{ value: 'none', label: 'None' },
	{
		value: 'hooks:check',
		label: 'Check',
		hint: 'Automatically check your code for errors before commiting changes.',
	},
	{
		value: 'hooks:fix',
		label: 'Check + Fix',
		hint: 'Automatically check your code for errors, and fix linting before commiting changes.',
	},
] satisfies ClackOption<HookSolution>[];

type AdapterPackages = `adapter:${AdapterSolution}`;
type AuthPackages = Exclude<AuthSolution, 'none'>;
type CssPackages = Exclude<CssSolution, 'none'>;
type DatabasePackages = DatabaseSolution;
type ToolingPackages = Exclude<HookSolution, 'none'>;

export const available_packages = [
	// SvelteKit adapters
	'adapter:node',
	'adapter:vercel',
	'adapter:netlify',
	'adapter:cloudflare',
	'adapter:auto',

	// Auth solutions
	'lucia',

	// CSS solutions
	'tailwind',

	// Database solutions
	'mysql',
	'sqlite',
	'postgres',

	// Tooling solutions
	'hooks:check',
	'hooks:fix',
] satisfies (AdapterPackages | AuthPackages | CssPackages | DatabasePackages | ToolingPackages)[];
export type AvailablePackages = (typeof available_packages)[number];
