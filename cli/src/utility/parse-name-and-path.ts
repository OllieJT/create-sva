import { remove_trailing_slash } from "$src/utility/remove-trailing-slash.js";
import pathModule from "path";

/**
 * Parses the app_name and its path from the user input.
 *
 * Returns a tuple of of `[app_name, path]`, where `app_name` is the name put in the "package.json"
 * file and `path` is the path to the directory where the app will be created.
 *
 * If `app_name` is ".", the name of the directory will be used instead. Handles the case where the
 * input includes a scoped package name in which case that is being parsed as the name, but not
 * included as the path.
 *
 * For example:
 *
 * - dir/@mono/app => ["@mono/app", "dir/app"]
 * - dir/app => ["app", "dir/app"]
 */
export const parse_name_and_path = (rawInput: string) => {
	const input = remove_trailing_slash(rawInput);

	const paths = input.split("/");

	let app_name = paths[paths.length - 1]!;

	// If the user ran `npx create-sva .` or similar, the app_name should be the current directory
	if (app_name === ".") {
		const parsedCwd = pathModule.resolve(process.cwd());
		app_name = pathModule.basename(parsedCwd);
	}

	// If the first part is a @, it's a scoped package
	const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
	if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
		app_name = paths.slice(indexOfDelimiter).join("/");
	}

	const path = paths.filter((p) => !p.startsWith("@")).join("/");

	return [app_name, path] as const;
};
