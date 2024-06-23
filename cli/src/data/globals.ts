import { PKG_ROOT } from '$src/data/constants.js';
import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from 'type-fest';

export function get_svapp_version() {
	const package_json_path = path.join(PKG_ROOT, 'package.json');
	const package_json_content = fs.readJSONSync(package_json_path) as PackageJson;
	return package_json_content.version ?? '1.0.0';
}

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
export function get_user_pkg_manager(): PackageManager {
	// This environment variable is set by npm and yarn but pnpm seems less consistent
	const user_agent = process.env.npm_config_user_agent;

	if (user_agent) {
		if (user_agent.startsWith('yarn')) {
			return 'yarn';
		} else if (user_agent.startsWith('pnpm')) {
			return 'pnpm';
		} else if (user_agent.startsWith('bun')) {
			return 'bun';
		} else {
			return 'npm';
		}
	} else {
		// If no user agent is set, assume npm
		return 'npm';
	}
}
