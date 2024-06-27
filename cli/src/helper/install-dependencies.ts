import { PackageManager, get_user_pkg_manager } from '$src/data/get-user-pkg-manager.js';
import { logger } from '$src/utility/logger.js';
import chalk from 'chalk';
import { execa, type StdoutStderrOption } from 'execa';
import ora, { type Ora } from 'ora';

const exec_with_spinner = async (
	project_dir: string,
	pkg_manager: PackageManager,
	options: {
		args?: string[];
		stdout?: StdoutStderrOption;
		on_data_handle?: (spinner: Ora) => (data: Buffer) => void;
	},
) => {
	const { on_data_handle, args = ['install'], stdout = 'pipe' } = options;

	const spinner = ora(`Running ${pkg_manager} install...`).start();
	const subprocess = execa(pkg_manager, args, { cwd: project_dir, stdout });

	await new Promise<void>((res, rej) => {
		if (on_data_handle) {
			subprocess.stdout?.on('data', on_data_handle(spinner));
		}

		void subprocess.on('error', (e) => rej(e));
		void subprocess.on('close', () => res());
	});

	return spinner;
};

const run_install_command = async (
	pkg_manager: PackageManager,
	project_dir: string,
): Promise<Ora | null> => {
	switch (pkg_manager) {
		// When using npm, inherit the stderr stream so that the progress bar is shown
		case 'npm':
			await execa(pkg_manager, ['install'], {
				cwd: project_dir,
				stderr: 'inherit',
			});

			return null;
		// When using yarn or pnpm, use the stdout stream and ora spinner to show the progress
		case 'pnpm':
			return exec_with_spinner(project_dir, pkg_manager, {
				on_data_handle: (spinner) => (data) => {
					const text = data.toString();

					if (text.includes('Progress')) {
						spinner.text = text.includes('|') ? text.split(' | ')[1] ?? '' : text;
					}
				},
			});
		case 'yarn':
			return exec_with_spinner(project_dir, pkg_manager, {
				on_data_handle: (spinner) => (data) => {
					spinner.text = data.toString();
				},
			});
		// When using bun, the stdout stream is ignored and the spinner is shown
		case 'bun':
			return exec_with_spinner(project_dir, pkg_manager, { stdout: 'ignore' });
	}
};

export const install_dependencies = async ({ project_dir }: { project_dir: string }) => {
	logger.info('Installing dependencies...');
	const pkg_manager = get_user_pkg_manager();

	const install_spinner = await run_install_command(pkg_manager, project_dir);

	// If the spinner was used to show the progress, use succeed method on it
	// If not, use the succeed on a new spinner
	(install_spinner ?? ora()).succeed(chalk.green('Successfully installed dependencies!\n'));
};
