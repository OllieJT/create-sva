import { PKG_ROOT } from '$src/data/constants.js';
import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from 'type-fest';

export function get_svapp_version() {
	const package_json_path = path.join(PKG_ROOT, 'package.json');
	const package_json_content = fs.readJSONSync(package_json_path) as PackageJson;
	return package_json_content.version ?? '1.0.0';
}
