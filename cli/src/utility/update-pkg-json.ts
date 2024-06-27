import fs from 'fs-extra';
import path from 'path';
import sortPackageJson from 'sort-package-json';
import { type PackageJson } from 'type-fest';

type SvAppPackageJSON = PackageJson & {
	SvAppMetadata?: {
		initVersion: string;
	};
};

export function update_pkg_json({
	project_dir,
	update,
}: {
	project_dir: string;
	update: (pkg: SvAppPackageJSON) => SvAppPackageJSON;
}) {
	const data_before = fs.readJSONSync(path.join(project_dir, 'package.json')) as SvAppPackageJSON;
	const data_after = update(data_before);
	const data_sorted = sortPackageJson(data_after);

	fs.writeJSONSync(path.join(project_dir, 'package.json'), data_sorted, { spaces: 2 });

	return data_sorted;
}
