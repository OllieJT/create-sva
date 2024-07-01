import { DEFAULT_APP_NAME } from "$src/data/constants.js";
import { get_user_pkg_manager } from "$src/data/get-user-pkg-manager.js";
import type { InstallerOptions } from "$src/installers/installer.js";
import { logger } from "$src/utility/logger.js";

// This logs the next steps that the user should take in order to advance the project
export const render_next_steps = async ({
	project_name = DEFAULT_APP_NAME,
	database_solution,
	no_install,
}: Pick<InstallerOptions, "project_name" | "no_install" | "database_solution">) => {
	const pkg_manager = get_user_pkg_manager();

	logger.info("Next steps:");
	if (project_name !== ".") logger.info(`  cd ${project_name}`);
	if (no_install) {
		// To reflect yarn's default behavior of installing packages when no additional args provided
		if (pkg_manager === "yarn") {
			logger.info(`  ${pkg_manager}`);
		} else {
			logger.info(`  ${pkg_manager} install`);
		}
	}

	if (["postgres", "mysql"].includes(database_solution)) {
		logger.info("  Start up a database, if needed using './start-database.sh'");
	}

	if (["npm", "bun"].includes(pkg_manager)) {
		logger.info(`  ${pkg_manager} run db:push`);
	} else {
		logger.info(`  ${pkg_manager} db:push`);
	}

	if (["npm", "bun"].includes(pkg_manager)) {
		logger.info(`  ${pkg_manager} run dev`);
	} else {
		logger.info(`  ${pkg_manager} dev`);
	}

	// TODO: Add note about husky / check or format

	logger.info(`  git commit -m "initial commit"`);
};
