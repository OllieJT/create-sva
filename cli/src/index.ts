#!/usr/bin/env node
import { initialize_packages } from '$src/installers/installer.js';
import { run_questionaire } from '$src/questionaire.js';
import { logger } from '$src/utility/logger.js';
import { render_title } from '$src/utility/render-title.js';
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

	// TODO: Implement package installation
	// TODO: Scaffold project

	// TODO: Initialize configs

	// TODO: Install dependencies

	// TODO: Initialize git

	// TODO: Display success message

	console.log('\n\n', JSON.stringify(opts, null, 2));
	// Package installation
	const use_packages = initialize_packages(packages);

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
