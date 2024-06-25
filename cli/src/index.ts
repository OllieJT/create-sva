#!/usr/bin/env node
import { get_svapp_version } from '$src/data/globals.js';
import { createProject } from '$src/helper/create-project.js';
import { render_next_steps } from '$src/helper/render-next-steps.js';
import { initialize_packages } from '$src/installers/installer.js';
import { run_questionaire } from '$src/questionaire.js';
import { logger } from '$src/utility/logger.js';
import { parse_name_and_path } from '$src/utility/parse-name-and-path.js';
import { render_title } from '$src/utility/render-title.js';
import fs from 'fs-extra';
import path from 'path';
import { type PackageJson } from 'type-fest';

type SvAppPackageJSON = PackageJson & {
	SvAppMetadata?: {
		initVersion: string;
	};
};

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
	const pkg_json = fs.readJSONSync(path.join(project_dir, 'package.json')) as SvAppPackageJSON;
	pkg_json.name = scoped_app_name;
	pkg_json.ct3aMetadata = { initVersion: get_svapp_version() };
	fs.writeJSONSync(path.join(project_dir, 'package.json'), pkg_json, { spaces: 2 });

	if (!no_install) {
		// TODO: Implement install_dependencies
	}

	// TODO: Implement initialize_git

	await render_next_steps({
		database_solution,
		no_install: no_install,
		project_name: app_dir,
	});

	process.exit(0);
};

main().catch((err) => {
	logger.error('Aborting installation...');
	if (err instanceof Error) {
		logger.error(err);
	} else {
		logger.error('An unknown error has occurred. Please open an issue on github with the below:\n');
		console.log(err);
		logger.info('\nhttps://github.com/OllieJT/create-svapp/issues');
	}
	process.exit(1);
});
