import { CLI_DESCRIPTION, CLI_NAME, DEFAULT_APP_NAME } from '$src/data/constants.js';
import { get_svapp_version, get_user_pkg_manager } from '$src/data/globals.js';
import {
	AvailablePackages,
	DatabaseSolution,
	adapter_options,
	auth_options,
	css_options,
	database_options,
	hook_options,
} from '$src/data/options.js';
import { validate_app_name } from '$src/utility/validate-app-name.js';
import * as p from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

interface CliFlags {
	no_install: boolean; // run the package manager's install command
	default: boolean; // bypass the CLI and use all default options
}

interface CliResults {
	app_name: string;
	packages: AvailablePackages[];
	flags: CliFlags;
	database_solution: DatabaseSolution;
	// css_solution: CssSolution;
	// auth_solution: AuthSolution;
	// adapter_solution: AdapterSolution;
}

const default_options: CliResults = {
	app_name: DEFAULT_APP_NAME,
	packages: ['sqlite', 'tailwind', 'lucia', 'adapter:auto'],
	flags: {
		no_install: false,
		default: false,
	},
	database_solution: 'sqlite',
	// css_solution: 'tailwind',
	// auth_solution: 'lucia',
	// adapter_solution: 'auto',
};

export const run_questionaire = async (): Promise<CliResults> => {
	const configuration = default_options;
	const CLI_VERSION = get_svapp_version();
	const PKG_MANAGER = get_user_pkg_manager();

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
			tools: () => {
				return p.select({
					message: 'Which additional tools would you like to use?',
					options: hook_options,
					initialValue: 'none',
					maxItems: hook_options.length,
				});
			},
			...(!configuration.flags.no_install && {
				install: () => {
					return p.confirm({
						message:
							`Should we run '${PKG_MANAGER}` +
							(PKG_MANAGER === 'yarn' ? `'?` : ` install' for you?`),
						initialValue: !default_options.flags.no_install,
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
	if (project.auth == 'lucia') packages.push('lucia');
	if (project.css === 'tailwind') packages.push('tailwind');
	// if (project.css === 'shadcn') packages.push('tailwind', 'shadcn');
	// if (project.css === 'bits_ui') packages.push('tailwind', 'bits_ui');
	if (project.database === 'mysql') packages.push('mysql');
	if (project.database === 'sqlite') packages.push('sqlite');
	if (project.database === 'postgres') packages.push('postgres');
	if (project.database === 'hooks:check') packages.push('hooks:check');
	if (project.database === 'hooks:fix') packages.push('hooks:fix');

	return {
		app_name: project.name ?? configuration.app_name,
		packages,
		database_solution: project.database as DatabaseSolution,
		// css_solution: project.css as CssSolution,
		// auth_solution: project.auth as AuthSolution,
		// adapter_solution: project.adapter as AdapterSolution,
		flags: {
			...configuration.flags,
			no_install: !project.install || configuration.flags.no_install,
		},
	};
};
