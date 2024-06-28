#!/usr/bin/env node
import { createProject } from '$src/helper/create-project.js';
import { initialize_git } from '$src/helper/initialize-git.js';
import { install_dependencies } from '$src/helper/install-dependencies.js';
import { render_next_steps } from '$src/helper/render-next-steps.js';
import { initialize_packages } from '$src/installers/installer.js';
import { run_questionaire } from '$src/questionaire.js';
import { logger } from '$src/utility/logger.js';
import { parse_name_and_path } from '$src/utility/parse-name-and-path.js';
import { render_title } from '$src/utility/render-title.js';
import { update_pkg_json } from '$src/utility/update-pkg-json.js';
import { get_cli_version } from './data/get-cli-version.js';

const main = async () => {
	render_title();

	const {
		app_name,
		flags: { no_install },
		packages,
		database_solution,
	} = await run_questionaire();

	// Package installation
	const use_packages = initialize_packages(packages);
	const [scoped_app_name, app_dir] = parse_name_and_path(app_name);

	// Scaffold project
	const project_dir = await createProject({
		database_solution,
		no_install: no_install,
		packages: use_packages,
		project_name: app_dir,
		scoped_app_name,
	});

	// Write attributes to package.json
	update_pkg_json({
		project_dir,
		update: (pkg) => {
			pkg.name = scoped_app_name;
			pkg.sva_metadata = { initVersion: get_cli_version() };
			return pkg;
		},
	});

	if (!no_install) {
		await install_dependencies({ project_dir });
	}

	await initialize_git({ project_dir });

	await render_next_steps({
		database_solution,
		no_install: no_install,
		project_name: app_dir,
	});

	process.exit(0);
};

main().catch((err) => {
	logger.error('\n\nAborting installation...');
	if (err instanceof Error) {
		logger.error(err);
	} else {
		logger.error('An unknown error has occurred. Please open an issue on github with the below:\n');
		console.log(err);
		logger.info('\nhttps://github.com/OllieJT/create-sva/issues');
	}
	process.exit(1);
});
