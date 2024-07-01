import { get_user_pkg_manager } from "$src/data/get-user-pkg-manager.js";
import { logger } from "$src/utility/logger.js";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

// This initializes Husky Hooks for the project
export const initialize_husky = async ({ project_dir }: { project_dir: string }) => {
	logger.info("Initializing Husky...");

	const pkg_manager = get_user_pkg_manager();
	const spinner = ora("Creating a new git repo...\n").start();

	try {
		if (pkg_manager === "pnpm") {
			await execa("pnpm", ["exec", "husky", "init"], { cwd: project_dir });
		} else if (pkg_manager === "bun") {
			await execa("bun", ["husky", "init"], { cwd: project_dir });
		} else {
			await execa("npx", ["husky", "init"], { cwd: project_dir });
		}

		// Set default pre-commit hook
		const husky_hook = path.join(project_dir, ".husky/pre-commit");
		const husky_hook_content = `npx lint-staged\n`;

		// Write hook content to file
		fs.writeFileSync(husky_hook, husky_hook_content);

		spinner.succeed(`${chalk.green("Successfully initialized")} ${chalk.green.bold("husky")}\n`);
	} catch {
		// Safeguard, should be unreachable
		spinner.fail(`${chalk.bold.red("Failed:")} could not initialize hucky.\n`);
	}
};
