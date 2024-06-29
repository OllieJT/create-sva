import {
	AvailableDependencies,
	dependency_version_map,
} from "$src/installers/dependency-version-map.js";
import { update_pkg_json } from "$src/utility/update-pkg-json.js";
import sortPackageJson from "sort-package-json";

export const add_pkg_dependency = ({
	dependencies,
	is_dev_dependency = false,
	project_dir,
}: {
	dependencies: AvailableDependencies[];
	is_dev_dependency?: boolean;
	project_dir: string;
}) => {
	return update_pkg_json({
		project_dir,
		update: (pkg) => {
			dependencies.forEach((pkgName) => {
				const version = dependency_version_map[pkgName];

				if (is_dev_dependency && pkg.devDependencies) {
					pkg.devDependencies[pkgName] = version;
				} else if (pkg.dependencies) {
					pkg.dependencies[pkgName] = version;
				}
			});
			const sorted_pkg = sortPackageJson(pkg);

			return sorted_pkg;
		},
	});
};
