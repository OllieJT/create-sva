import { PKG_ROOT } from '$src/data/constants.js';
import { InstallerOptions } from '$src/installers/installer.js';
import { logger } from '$src/utility/logger.js';
import * as p from '@clack/prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';

// This bootstraps the base SvelteKit application
export const scaffold_project = async ({
	project_name,
	project_dir,
	pkg_manager,
	no_install,
}: InstallerOptions) => {
	const srcDir = path.join(PKG_ROOT, 'template/base');

	if (!no_install) {
		logger.info(`\nUsing: ${chalk.cyan.bold(pkg_manager)}\n`);
	} else {
		logger.info('');
	}

	const spinner = ora(`Scaffolding in: ${project_dir}...\n`).start();

	if (fs.existsSync(project_dir)) {
		if (fs.readdirSync(project_dir).length === 0) {
			if (project_name !== '.')
				spinner.info(`${chalk.cyan.bold(project_name)} exists but is empty, continuing...\n`);
		} else {
			spinner.stopAndPersist();
			const overwriteDir = await p.select({
				message: `${chalk.redBright.bold('Warning:')} ${chalk.cyan.bold(
					project_name,
				)} already exists and isn't empty. How would you like to proceed?`,
				options: [
					{
						label: 'Abort installation (recommended)',
						value: 'abort',
					},
					{
						label: 'Clear the directory and continue installation',
						value: 'clear',
					},
					{
						label: 'Continue installation and overwrite conflicting files',
						value: 'overwrite',
					},
				],
				initialValue: 'abort',
			});
			if (overwriteDir === 'abort') {
				spinner.fail('Aborting installation...');
				process.exit(1);
			}

			const overwriteAction =
				overwriteDir === 'clear' ? 'clear the directory' : 'overwrite conflicting files';

			const confirmOverwriteDir = await p.confirm({
				message: `Are you sure you want to ${overwriteAction}?`,
				initialValue: false,
			});

			if (!confirmOverwriteDir) {
				spinner.fail('Aborting installation...');
				process.exit(1);
			}

			if (overwriteDir === 'clear') {
				spinner.info(`Emptying ${chalk.cyan.bold(project_name)} and creating t3 app..\n`);
				fs.emptyDirSync(project_dir);
			}
		}
	}

	spinner.start();

	fs.copySync(srcDir, project_dir);
	fs.renameSync(path.join(project_dir, '_gitignore'), path.join(project_dir, '.gitignore'));

	const scaffoldedName = project_name === '.' ? 'App' : chalk.cyan.bold(project_name);

	spinner.succeed(`${scaffoldedName} ${chalk.green('scaffolded successfully!')}\n`);
};
