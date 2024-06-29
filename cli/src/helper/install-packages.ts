import { InstallerOptions, PkgInstallerMap } from "$src/installers/installer.js";
import { logger } from "$src/utility/logger.js";
import chalk from "chalk";
import ora from "ora";

type InstallPackagesOptions = InstallerOptions & {
	packages: PkgInstallerMap;
};
// This runs the installer for all the packages that the user has selected
export const install_packages = (options: InstallPackagesOptions) => {
	const { packages } = options;
	logger.info("Adding boilerplate...");

	for (const [name, pkg] of Object.entries(packages)) {
		if (pkg.is_used) {
			const spinner = ora(`Boilerplating ${name}...`).start();
			pkg.installer(options);
			spinner.succeed(chalk.green(`Successfully setup boilerplate for ${chalk.green.bold(name)}`));
		}
	}

	logger.info("");
};
