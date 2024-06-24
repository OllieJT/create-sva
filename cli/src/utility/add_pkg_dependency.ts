import {
	dependency_version_map,
	type AvailableDependencies,
} from '$src/installers/dependency_version_map.js';
import fs from 'fs-extra';
import path from 'path';
import sortPackageJson from 'sort-package-json';
import { type PackageJson } from 'type-fest';

export const add_pkg_dependency = ({
	dependencies,
	is_dev_dependency = false,
	project_dir,
}: {
	dependencies: AvailableDependencies[];
	is_dev_dependency?: boolean;
	project_dir: string;
}) => {
	const pkg_json = fs.readJSONSync(path.join(project_dir, 'package.json')) as PackageJson;

	dependencies.forEach((pkgName) => {
		const version = dependency_version_map[pkgName];

		if (is_dev_dependency && pkg_json.devDependencies) {
			pkg_json.devDependencies[pkgName] = version;
		} else if (pkg_json.dependencies) {
			pkg_json.dependencies[pkgName] = version;
		}
	});
	const sorted_pkg_json = sortPackageJson(pkg_json);

	fs.writeJSONSync(path.join(project_dir, 'package.json'), sorted_pkg_json, {
		spaces: 2,
	});
};
