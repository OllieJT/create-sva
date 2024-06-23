import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION, DEFAULT_APP_NAME } from '$src/data/constants.js';
import {
	AvailablePackages,
	adapter_options,
	auth_options,
	css_options,
	database_options,
} from '$src/data/options.js';
import { get_user_pkg_manager } from '$src/utility/get-user-pkg-manager.js';
import { validate_app_name } from '$src/utility/validate-app-name.js';
import * as p from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

interface CliFlags {
	noGit: boolean; // initialize a git repo
	noInstall: boolean; // run the package manager's install command
	default: boolean; // bypass the CLI and use all default options
}

interface CliResults {
	app_name: string;
	packages: AvailablePackages[];
	flags: CliFlags;
	// database_solution: DatabaseSolution;
	// css_solution: CssSolution;
	// auth_solution: AuthSolution;
	// adapter_solution: AdapterSolution;
}

const default_options: CliResults = {
	app_name: DEFAULT_APP_NAME,
	packages: ['drizzle:sqlite', 'css:tailwind', 'auth:lucia', 'adapter:auto'],
	flags: {
		noGit: false,
		noInstall: false,
		default: false,
	},
	// database_solution: 'sqlite',
	// css_solution: 'tailwind',
	// auth_solution: 'lucia',
	// adapter_solution: 'auto',
};

export const run_questionaire = async (): Promise<CliResults> => {
	const configuration = default_options;
	const program = new Command();

	// CLI Attributes
	program
		.name(CLI_NAME)
		.description(CLI_DESCRIPTION)
		.version(CLI_VERSION, '-v, --version', 'Display the version number')
		.addHelpText(
			'afterAll',
			`\n The SvApp stack was inspired by the ${chalk
				.hex('#E8DCFF')
				.bold('t3 stack')} and was used as a framework for this CLI. \n`,
		);

	// CLI Arguments
	program
		.argument(
			'[dir]',
			'The name of the application, as well as the name of the directory to create',
		)
		.option(
			'--noGit',
			'Explicitly tell the CLI to not initialize a new git repo in the project',
			false,
		)
		.option(
			'--noInstall',
			"Explicitly tell the CLI to not run the package manager's install command",
			false,
		)
		.option(
			'-y, --default',
			'Bypass the CLI and use all default options to bootstrap a new t3-app',
			false,
		)
		.parse(process.argv);

	// Set custom app name
	const custom_name = program.args[0];
	if (custom_name) {
		configuration.app_name = custom_name;
	}

	// Set custom flag options
	configuration.flags = program.opts();

	if (configuration.flags.default) {
		return configuration;
	}

	const pkg_manager = get_user_pkg_manager();

	const project = await p.group(
		{
			name: () =>
				p.text({
					message: 'What will your project be called?',
					defaultValue: custom_name,
					validate: validate_app_name,
				}),
			language: () => {
				return p.select({
					message: 'Will you be using React or Svelte?',
					options: [
						{ value: 'react', label: 'React' },
						{ value: 'svelte', label: 'Svelte' },
					],
					initialValue: 'svelte',
				});
			},
			_: ({ results }) =>
				results.language === 'react'
					? p.note(chalk.redBright('Wrong answer, using Svelte instead'))
					: undefined,
			css: () => {
				return p.select({
					message: 'What styling solution would you like to use?',
					options: css_options,
					initialValue: 'tailwind',
				});
			},
			database: () => {
				return p.select({
					message: 'What database type would you like to use?',
					options: database_options,
					initialValue: 'sqlite',
				});
			},
			auth: ({ results }) =>
				results.database !== 'none'
					? p.select({
							message: 'What authentication provider would you like to use?',
							options: auth_options,
							initialValue: 'lucia',
						})
					: undefined,
			adapter: () => {
				return p.select({
					message: 'What adapter would you like to use?',
					options: adapter_options,
					initialValue: 'auto',
				});
			},
			...(!configuration.flags.noGit && {
				git: () => {
					return p.confirm({
						message: 'Should we initialize a Git repository and stage the changes?',
						initialValue: !default_options.flags.noGit,
					});
				},
			}),
			...(!configuration.flags.noInstall && {
				install: () => {
					return p.confirm({
						message:
							`Should we run '${pkg_manager}` +
							(pkg_manager === 'yarn' ? `'?` : ` install' for you?`),
						initialValue: !default_options.flags.noInstall,
					});
				},
			}),
		},
		{
			onCancel() {
				process.exit(1);
			},
		},
	);

	const packages: AvailablePackages[] = [];
	if (project.adapter === 'node') packages.push('adapter:node');
	if (project.adapter === 'vercel') packages.push('adapter:vercel');
	if (project.adapter === 'netlify') packages.push('adapter:netlify');
	if (project.adapter === 'cloudflare') packages.push('adapter:cloudflare');
	if (project.adapter === 'auto') packages.push('adapter:auto');
	if (project.auth == 'lucia') packages.push('auth:lucia');
	if (project.css === 'tailwind') packages.push('css:tailwind');
	if (project.database === 'mysql') packages.push('drizzle:mysql');
	if (project.database === 'sqlite') packages.push('drizzle:sqlite');
	if (project.database === 'postgres') packages.push('drizzle:postgres');

	return {
		app_name: project.name ?? configuration.app_name,
		packages,
		// database_solution: project.database as DatabaseSolution,
		// css_solution: project.css as CssSolution,
		// auth_solution: project.auth as AuthSolution,
		// adapter_solution: project.adapter as AdapterSolution,
		flags: {
			...configuration.flags,
			noGit: !project.git || configuration.flags.noGit,
			noInstall: !project.install || configuration.flags.noInstall,
		},
	};
};
