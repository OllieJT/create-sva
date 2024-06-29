import { logger } from "$src/utility/logger.js";
import * as p from "@clack/prompts";
import chalk from "chalk";
import { execSync } from "child_process";
import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

const is_git_installed = (dir: string): boolean => {
	try {
		execSync("git --version", { cwd: dir });
		return true;
	} catch (_e) {
		return false;
	}
};

/** @returns Whether or not the provided directory has a `.git` subdirectory in it. */
const is_root_git_repo = (dir: string): boolean => {
	return fs.existsSync(path.join(dir, ".git"));
};

/** @returns Whether or not this directory or a parent directory has a `.git` directory. */
const is_inside_git_repo = async (dir: string): Promise<boolean> => {
	try {
		// If this command succeeds, we're inside a git repo
		await execa("git", ["rev-parse", "--is-inside-work-tree"], {
			cwd: dir,
			stdout: "ignore",
		});
		return true;
	} catch (_e) {
		// Else, it will throw a git-error and we return false
		return false;
	}
};

const get_git_version = () => {
	const stdout = execSync("git --version").toString().trim();
	const git_version_tag = stdout.split(" ")[2];
	const major = git_version_tag?.split(".")[0];
	const minor = git_version_tag?.split(".")[1];
	return { major: Number(major), minor: Number(minor) };
};

/** @returns The git config value of "init.defaultBranch". If it is not set, returns "main". */
const get_default_branch = () => {
	const stdout = execSync("git config --global init.defaultBranch || echo main").toString().trim();

	return stdout;
};

// This initializes the Git-repository for the project
export const initialize_git = async ({ project_dir }: { project_dir: string }) => {
	logger.info("Initializing Git...");

	if (!is_git_installed(project_dir)) {
		logger.warn("Git is not installed. Skipping Git initialization.");
		return;
	}

	const spinner = ora("Creating a new git repo...\n").start();

	const is_root = is_root_git_repo(project_dir);
	const is_inside = await is_inside_git_repo(project_dir);
	const dir_name = path.parse(project_dir).name; // skip full path for logging

	if (is_inside && is_root) {
		// Dir is a root git repo
		spinner.stop();
		const overwrite_git = await p.confirm({
			message: `${chalk.redBright.bold(
				"Warning:",
			)} Git is already initialized in "${dir_name}". Initializing a new git repository would delete the previous history. Would you like to continue anyways?`,
			initialValue: false,
		});

		if (!overwrite_git) {
			spinner.info("Skipping Git initialization.");
			return;
		}
		// Deleting the .git folder
		fs.removeSync(path.join(project_dir, ".git"));
	} else if (is_inside && !is_root) {
		// Dir is inside a git worktree
		spinner.stop();
		const initialize_child_git_repo = await p.confirm({
			message: `${chalk.redBright.bold(
				"Warning:",
			)} "${dir_name}" is already in a git worktree. Would you still like to initialize a new git repository in this directory?`,
			initialValue: false,
		});
		if (!initialize_child_git_repo) {
			spinner.info("Skipping Git initialization.");
			return;
		}
	}

	// We're good to go, initializing the git repo
	try {
		const branch_name = get_default_branch();

		// --initial-branch flag was added in git v2.28.0
		const { major, minor } = get_git_version();
		if (major < 2 || (major == 2 && minor < 28)) {
			await execa("git", ["init"], { cwd: project_dir });
			// symbolic-ref is used here due to refs/heads/master not existing
			// It is only created after the first commit
			// https://superuser.com/a/1419674
			await execa("git", ["symbolic-ref", "HEAD", `refs/heads/${branch_name}`], {
				cwd: project_dir,
			});
		} else {
			await execa("git", ["init", `--initial-branch=${branch_name}`], {
				cwd: project_dir,
			});
		}
		await execa("git", ["add", "."], { cwd: project_dir });
		spinner.succeed(
			`${chalk.green("Successfully initialized and staged")} ${chalk.green.bold("git")}\n`,
		);
	} catch (error) {
		// Safeguard, should be unreachable
		spinner.fail(
			`${chalk.bold.red("Failed:")} could not initialize git. Update git to the latest version!\n`,
		);
	}
};
